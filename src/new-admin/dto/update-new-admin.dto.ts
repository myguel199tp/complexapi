import { PartialType } from '@nestjs/swagger';
import { CreateNewAdminDto } from './create-new-admin.dto';

export class UpdateNewAdminDto extends PartialType(CreateNewAdminDto) {}
