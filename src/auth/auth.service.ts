/* eslint-disable prettier/prettier */
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from 'src/users/shema/users.shema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthConjuntoDto, LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
// import { CreateSaleDto } from 'src/sales/dto/create-sale.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findAll(nameUnit?: string) {
    const filter = nameUnit
      ? { nameUnit: { $regex: new RegExp(nameUnit, 'i') } }
      : {};
    const list = await this.userModel.find(filter);
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
    console.log('Iniciando login con:', userObjectLogin);

    const { email, password } = userObjectLogin;
    console.log('Email recibido:', email);

    const findUser = await this.userModel.findOne({ email });
    if (!findUser) {
      console.log('Usuario no encontrado');
      throw new NotFoundException('Usuario no encontrado');
    }

    console.log('Usuario encontrado:', findUser);

    const isPasswordValid = await this.comparePasswords(
      password,
      findUser.password,
    );

    if (!isPasswordValid) {
      console.log('Contraseña incorrecta para el usuario:', email);
      throw new HttpException('Contraseña incorrecta', 403);
    }

    console.log('Contraseña válida, generando token...');

    const accessToken = await this.generateJwtToken(findUser);
    console.log('Token generado:', accessToken);

    const user = findUser.toObject();
    delete user.password;

    console.log('Login exitoso:', user);

    return { accessToken, user };
  }

  async loginConjunto(userObjectLogin: LoginAuthConjuntoDto) {
    console.log('Iniciando loginConjunto con:', userObjectLogin);

    const { email, password, nameUnit } = userObjectLogin;
    console.log(`Datos extraídos - Email: ${email}, Unidad: ${nameUnit}`);

    try {
      const findUser = await this.userModel.findOne({ email, nameUnit });
      console.log('Usuario encontrado:', findUser);

      if (!findUser) {
        console.error('Usuario o unidad no encontrados');
        throw new NotFoundException('Usuario o unidad no encontrados');
      }

      const isPasswordValid = await this.comparePasswords(
        password,
        findUser.password,
      );
      console.log('¿Contraseña válida?:', isPasswordValid);

      if (!isPasswordValid) {
        console.error('Contraseña incorrecta');
        throw new HttpException('Contraseña incorrecta', 403);
      }

      const accessToken = await this.generateJwtToken(findUser);
      console.log('Token de acceso generado:', accessToken);

      const user = findUser.toObject();
      delete user.password;
      console.log('Usuario final (sin contraseña):', user);

      return { accessToken, user };
    } catch (error) {
      console.error('Error en loginConjunto:', error);
      throw error;
    }
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

  // private async generateJwtToken(user: UserDocument): Promise<string> {
  //   const payload = { id: user._id, name: user.name };
  //   return this.jwtService.sign(payload);
  // }
  private async generateJwtToken(user: UserDocument): Promise<string> {
    const payload = { id: user._id, name: user.name, rol: user.rol };
    return this.jwtService.sign(payload);
  }

  async addSaleToUser(userId: string) {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // await this.salesService.uploadFiles(createSaleDto);

    await user.save();

    return user;
  }

  async addCommerceToUser(userId: string) {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await user.save();

    return user;
  }
}
