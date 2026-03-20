import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SaveSettingsDto } from "./dto/save-settings.dto";
import { UserSettings } from "./types/user.types";
import { Prisma } from "../generated/client";

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettings(userId: string): Promise<UserSettings | null> {
    const settings = await this.prisma.settings.findUnique({
      where: { userId },
    });
    if (!settings?.data) return null;
    return settings.data as unknown as UserSettings;
  }

  async saveSettings(
    userId: string,
    dto: SaveSettingsDto,
  ): Promise<UserSettings> {
    const data = dto as unknown as Prisma.InputJsonValue;

    const settings = await this.prisma.settings.upsert({
      where: { userId },
      create: { userId, data },
      update: { data },
    });

    return settings.data as unknown as UserSettings;
  }
}
