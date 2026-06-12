import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class LoginUserDto {
  @ApiProperty({ example: "john@example.com" })
  @IsString()
  @MinLength(1, { message: "Login or email is required" })
  login!: string;

  @ApiProperty({ example: "secret123" })
  @IsString()
  @MinLength(1, { message: "Password is required" })
  password!: string;
}
