import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsUrl,
  IsArray,
  IsBoolean,
  IsIn,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from "class-validator";

export class ProfileDto {
  @ApiProperty({ example: "John Doe" })
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiProperty({ example: "Frontend Developer" })
  @IsString()
  @MaxLength(100)
  jobTitle!: string;

  @ApiProperty({ example: "3 years" })
  @IsString()
  @MaxLength(50)
  experience!: string;

  @ApiProperty({ example: "Warsaw, Poland" })
  @IsString()
  @MaxLength(200)
  location!: string;

  @ApiProperty({
    type: [String],
    example: ["React", "TypeScript", "CSS"],
  })
  @IsArray()
  @IsString({ each: true })
  skills!: string[];

  @ApiProperty({ example: "Building user interfaces and design systems." })
  @IsString()
  @MaxLength(1000)
  bio!: string;

  @ApiProperty({
    example: "https://example.com/uploads/profile-photo.jpg",
  })
  @ValidateIf((_, v) => v !== "" && v != null)
  @IsUrl({}, { message: "Photo must be a valid URL" })
  @IsString()
  photo!: string;
}

export class JobPreferencesDto {
  @ApiProperty({
    type: [String],
    example: ["full-time", "contract"],
  })
  @IsArray()
  @IsString({ each: true })
  jobType!: string[];

  @ApiProperty({ example: "remote" })
  @IsString()
  workLocation!: string;

  @ApiProperty({ example: "2000" })
  @IsString()
  salaryMin!: string;

  @ApiProperty({ example: "4000" })
  @IsString()
  salaryMax!: string;

  @ApiProperty({
    type: [String],
    example: ["ecommerce", "fintech"],
  })
  @IsArray()
  @IsString({ each: true })
  industries!: string[];

  @ApiProperty({ example: true })
  @IsBoolean()
  willingToRelocate!: boolean;
}

export class NotificationAlertsDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  jobMatches!: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  applicationUpdates!: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  interviewReminders!: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  careerInsights!: boolean;
}

export class NotificationsDto {
  @ApiProperty({ type: () => NotificationAlertsDto })
  @ValidateNested()
  @Type(() => NotificationAlertsDto)
  alerts!: NotificationAlertsDto;

  @ApiProperty({
    enum: ["email", "push", "both"],
    example: "both",
  })
  @IsString()
  @IsIn(["email", "push", "both"])
  notificationStyle!: string;
}

export class PrivacyDto {
  @ApiProperty({ example: false })
  @IsBoolean()
  showSalaryExpectations!: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  showContactInfo!: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  allowRecruiterMessages!: boolean;
}

export class AccountDto {
  @ApiProperty({ example: "john@example.com" })
  @IsString()
  @MaxLength(255)
  email!: string;

  @ApiProperty({ example: "en" })
  @IsString()
  @MaxLength(10)
  language!: string;
}

export class SaveSettingsDto {
  @ApiProperty({ type: () => ProfileDto })
  @ValidateNested()
  @Type(() => ProfileDto)
  profile!: ProfileDto;

  @ApiProperty({ type: () => JobPreferencesDto })
  @ValidateNested()
  @Type(() => JobPreferencesDto)
  jobPreferences!: JobPreferencesDto;

  @ApiProperty({ type: () => NotificationsDto })
  @ValidateNested()
  @Type(() => NotificationsDto)
  notifications!: NotificationsDto;

  @ApiProperty({ type: () => PrivacyDto })
  @ValidateNested()
  @Type(() => PrivacyDto)
  privacy!: PrivacyDto;

  @ApiProperty({ type: () => AccountDto })
  @ValidateNested()
  @Type(() => AccountDto)
  account!: AccountDto;
}
