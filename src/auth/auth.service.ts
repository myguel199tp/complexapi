/* eslint-disable prettier/prettier */
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from 'src/users/shema/users.shema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthConjuntoDto, LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateSaleDto } from 'src/sales/dto/create-sale.dto';
import { SalesService } from 'src/sales/sales.service';
import { CreateFileDto } from 'src/file/dto/create-file.dto';
import { FileService } from 'src/file/file.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private salesService: SalesService,
    private fileService: FileService,
  ) {}

  async findAll() {
    const list = await this.userModel.find({});
    return list;
  }

  async findOne(_id: string) {
    const findone = await this.userModel.findById(_id);
    return findone;
  }

  async register(registerAuthDto: RegisterAuthDto): Promise<User> {
    const { password } = registerAuthDto;

    const hashedPassword = await hash(password, 10);

    const newUser = new this.userModel({
      ...registerAuthDto,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async login(userObjectLogin: LoginAuthDto) {
    const { email, password } = userObjectLogin;

    const findUser = await this.userModel.findOne({ email });
    if (!findUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isPasswordValid = await this.comparePasswords(
      password,
      findUser.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Contraseña incorrecta', 403);
    }

    const accessToken = await this.generateJwtToken(findUser);

    const user = findUser.toObject();
    delete user.password;

    return { accessToken, user };
  }

  async loginConjunto(userObjectLogin: LoginAuthConjuntoDto) {
    const { email, password, nameUnit } = userObjectLogin;

    const findUser = await this.userModel.findOne({ email, nameUnit });
    if (!findUser) {
      throw new NotFoundException('Usuario o unidad no encontrados');
    }

    const isPasswordValid = await this.comparePasswords(
      password,
      findUser.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Contraseña incorrecta', 403);
    }

    const accessToken = await this.generateJwtToken(findUser);

    const user = findUser.toObject();
    delete user.password;

    return { accessToken, user };
  }

  async findUserByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateUser(user: UserDocument): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(user._id, user, { new: true })
      .exec();
  }

  private async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(plainPassword, hashedPassword);
  }

  private async generateJwtToken(user: UserDocument): Promise<string> {
    const payload = { id: user._id, name: user.name };
    return this.jwtService.sign(payload);
  }

  async addSaleToUser(userId: string, createSaleDto: CreateSaleDto) {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.salesService.uploadFiles(createSaleDto);

    await user.save();

    return user;
  }

  async addCommerceToUser(userId: string, createFileDto: CreateFileDto) {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.fileService.uploadFiles(createFileDto);

    await user.save();

    return user;
  }
}
