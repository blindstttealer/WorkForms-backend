import { Type } from "class-transformer";
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
  @IsString()
  @MaxLength(200)
  name: string;

  @IsString()
  @MaxLength(100)
  jobTitle: string;

  @IsString()
  @MaxLength(50)
  experience: string;

  @IsString()
  @MaxLength(200)
  location: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsString()
  @MaxLength(1000)
  bio: string;

  @ValidateIf((_, v) => v !== "" && v != null)
  @IsUrl({}, { message: "Photo must be a valid URL" })
  @IsString()
  photo: string;
}

export class JobPreferencesDto {
  @IsArray()
  @IsString({ each: true })
  jobType: string[];

  @IsString()
  workLocation: string;

  @IsString()
  salaryMin: string;

  @IsString()
  salaryMax: string;

  @IsArray()
  @IsString({ each: true })
  industries: string[];

  @IsBoolean()
  willingToRelocate: boolean;
}

export class NotificationAlertsDto {
  @IsBoolean()
  jobMatches: boolean;

  @IsBoolean()
  applicationUpdates: boolean;

  @IsBoolean()
  interviewReminders: boolean;

  @IsBoolean()
  careerInsights: boolean;
}

export class NotificationsDto {
  @ValidateNested()
  @Type(() => NotificationAlertsDto)
  alerts: NotificationAlertsDto;

  @IsString()
  @IsIn(["email", "push", "both"])
  notificationStyle: string;
}

export class PrivacyDto {
  @IsBoolean()
  showSalaryExpectations: boolean;

  @IsBoolean()
  showContactInfo: boolean;

  @IsBoolean()
  allowRecruiterMessages: boolean;
}

export class AccountDto {
  @IsString()
  @MaxLength(255)
  email: string;

  @IsString()
  @MaxLength(10)
  language: string;
}

export class SaveSettingsDto {
  @ValidateNested()
  @Type(() => ProfileDto)
  profile: ProfileDto;

  @ValidateNested()
  @Type(() => JobPreferencesDto)
  jobPreferences: JobPreferencesDto;

  @ValidateNested()
  @Type(() => NotificationsDto)
  notifications: NotificationsDto;

  @ValidateNested()
  @Type(() => PrivacyDto)
  privacy: PrivacyDto;

  @ValidateNested()
  @Type(() => AccountDto)
  account: AccountDto;
}
