import { ApiProperty } from "@nestjs/swagger";
import { SaveSettingsDto } from "../../settings/dto/save-settings.dto";

export class UserPublicResponseDto {
  @ApiProperty({ example: "clx123abc456" })
  id!: string;

  @ApiProperty({ example: "john@example.com" })
  email!: string;

  @ApiProperty({ example: "john_doe" })
  login!: string;
}

export class RegisterUserResponseDto {
  @ApiProperty({ type: () => UserPublicResponseDto })
  user!: UserPublicResponseDto;
}

export class UserProfileResponseDto {
  @ApiProperty({ type: () => UserPublicResponseDto })
  user!: UserPublicResponseDto;

  @ApiProperty({ type: () => SaveSettingsDto })
  settings!: SaveSettingsDto;
}
