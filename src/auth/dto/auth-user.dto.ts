import { IsEmail, IsNotEmpty } from 'class-validator';
export class signInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
