import { IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MinLength(1, { message: 'Login or email is required' })
  login: string;

  @IsString()
  @MinLength(1, { message: 'Password is required' })
  password: string;
}
