import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "../generated/client";
import { SaveSettingsDto } from "./dto/save-settings.dto";
import { UserSettings } from "./types/settings.types";

const DEFAULT_SETTINGS: UserSettings = {
  profile: {
    name: "",
    jobTitle: "",
    experience: "",
    location: "",
    skills: [],
    bio: "",
    photo: "",
  },
  jobPreferences: {
    jobType: [],
    workLocation: "",
    salaryMin: "",
    salaryMax: "",
    industries: [],
    willingToRelocate: false,
  },
  notifications: {
    alerts: {
      jobMatches: false,
      applicationUpdates: false,
      interviewReminders: false,
      careerInsights: false,
    },
    notificationStyle: "both",
  },
  privacy: {
    showSalaryExpectations: false,
    showContactInfo: false,
    allowRecruiterMessages: false,
  },
  account: {
    email: "",
    language: "en",
  },
};

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettings(userId: string): Promise<UserSettings> {
    const row = await this.prisma.settings.findUnique({
      where: { userId },
    });
    if (!row?.data) return { ...DEFAULT_SETTINGS };
    return row.data as unknown as UserSettings;
  }

  async saveSettings(
    userId: string,
    dto: SaveSettingsDto,
  ): Promise<UserSettings> {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!userExists) {
      throw new NotFoundException("User not found");
    }

    const data = dto as unknown as Prisma.InputJsonValue;
    const row = await this.prisma.settings.upsert({
      where: { userId },
      create: { userId, data },
      update: { data },
    });
    return row.data as unknown as UserSettings;
  }
}
