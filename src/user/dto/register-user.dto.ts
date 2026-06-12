import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
  @ApiProperty({ example: "john@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "secret123" })
  @IsString()
  @MinLength(3, { message: "Password must be at least 3 characters" })
  password!: string;

  @ApiProperty({ example: "john_doe" })
  @IsString()
  @MinLength(3, { message: "Login must be at least 3 characters" })
  login!: string;
}
