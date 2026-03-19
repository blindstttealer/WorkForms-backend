import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3, { message: 'Password must be at least 3 characters' })
  password: string;

  @IsString()
  @MinLength(3, { message: 'Login must be at least 3 characters' })
  login: string;
}
