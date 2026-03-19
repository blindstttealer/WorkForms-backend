import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SaveSettingsDto } from "./dto/save-settings.dto";
import { UserSettings } from "./types/user.types";
import { toUserSettings } from "./mappers/user.mapper";

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettings(userId: string): Promise<UserSettings | null> {
    const settings = await this.prisma.settings.findUnique({
      where: { userId },
    });
    return settings ? toUserSettings(settings) : null;
  }

  async saveSettings(
    userId: string,
    dto: SaveSettingsDto,
  ): Promise<UserSettings> {
    const data = {
      displayName: dto.displayName || null,
      avatarUrl: dto.avatarUrl || null,
      phone: dto.phone || null,
      bio: dto.bio || null,
    };

    const settings = await this.prisma.settings.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    });

    return toUserSettings(settings);
  }
}
