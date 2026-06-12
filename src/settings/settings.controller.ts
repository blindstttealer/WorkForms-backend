import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { AuthenticatedRequest } from "../auth/auth.guard";
import { ApiCookieProtected, SWAGGER_TAG_SETTINGS } from "../swagger";
import { ApiSaveSettingsMultipartDocs, SETTINGS_MAX_PHOTO_BYTES } from "./settings-save.openapi";
import { SettingsService } from "./settings.service";
import { ProfilePhotoService } from "./profile-photo.service";
import { SaveSettingsDto } from "./dto/save-settings.dto";
import { ParseSettingsBodyPipe } from "./pipes/parse-settings-body.pipe";

@ApiTags(SWAGGER_TAG_SETTINGS)
@ApiCookieProtected()
@Controller("api/user/settings")
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly profilePhotoService: ProfilePhotoService,
  ) {}

  @Get()
  @ApiOperation({ summary: "Get saved settings JSON" })
  @ApiOkResponse({ type: SaveSettingsDto })
  async getSettings(@Req() req: AuthenticatedRequest) {
    return this.settingsService.getSettings(req.userId);
  }

  @Put()
  @ApiSaveSettingsMultipartDocs()
  @ApiOkResponse({ type: SaveSettingsDto })
  @UseInterceptors(
    FileInterceptor("photo", {
      storage: memoryStorage(),
      limits: { fileSize: SETTINGS_MAX_PHOTO_BYTES },
    }),
  )
  async saveSettings(
    @Req() req: AuthenticatedRequest,
    @Body(ParseSettingsBodyPipe) dto: object,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: SETTINGS_MAX_PHOTO_BYTES }),
          new FileTypeValidator({
            fileType: /^image\/(jpeg|png|webp|gif)$/i,
          }),
        ],
        exceptionFactory: () =>
          new BadRequestException(
            "Photo must be an image (JPEG, PNG, WebP, or GIF), max 5 MB",
          ),
      }),
    )
    photo: Express.Multer.File | undefined,
  ) {
    const settings = dto as SaveSettingsDto;

    if (photo) {
      const { pathname } = this.profilePhotoService.persist(photo);
      settings.profile.photo = this.profilePhotoService.buildPublicUrl(
        req,
        pathname,
      );
    }

    return this.settingsService.saveSettings(req.userId, settings);
  }
}
