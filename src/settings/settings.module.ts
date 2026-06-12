import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { SettingsController } from "./settings.controller";
import { SettingsService } from "./settings.service";
import { ProfilePhotoService } from "./profile-photo.service";
import { ParseSettingsBodyPipe } from "./pipes/parse-settings-body.pipe";

@Module({
  imports: [AuthModule],
  controllers: [SettingsController],
  providers: [SettingsService, ProfilePhotoService, ParseSettingsBodyPipe],
  exports: [SettingsService],
})
export class SettingsModule {}
