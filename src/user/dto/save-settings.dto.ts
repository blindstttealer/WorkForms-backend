import { Transform } from "class-transformer";
import { IsString, IsUrl, MaxLength, ValidateIf } from "class-validator";

export class SaveSettingsDto {
  @Transform(({ value }) => (value == null ? "" : value))
  @IsString()
  @MaxLength(100)
  displayName: string;

  @Transform(({ value }) => (value == null ? "" : value))
  @ValidateIf((_, v) => v !== "")
  @IsUrl({}, { message: "Avatar URL must be a valid URL" })
  @IsString()
  avatarUrl: string;

  @Transform(({ value }) => (value == null ? "" : value))
  @IsString()
  @MaxLength(30)
  phone: string;

  @Transform(({ value }) => (value == null ? "" : value))
  @IsString()
  @MaxLength(500)
  bio: string;
}
