import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  uid?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
