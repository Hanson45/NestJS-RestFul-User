import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UserPatchDto extends PartialType(CreateUserDto) {}
