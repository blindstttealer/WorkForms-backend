import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as argon2 from "argon2";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { SaveSettingsDto } from "./dto/save-settings.dto";
import { User } from "../generated/client";
import {
  UserPublic,
  UserProfileResponse,
  UserSettings,
} from "./types/user.types";
import { toUserPublic } from "./mappers/user.mapper";
import { SettingsService } from "./settings.service";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly settingsService: SettingsService,
  ) {}

  async register(
    dto: RegisterUserDto,
    hashPassword: string,
  ): Promise<UserPublic> {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashPassword,
          login: dto.login,
        },
      });
      return toUserPublic(user);
    } catch (e: unknown) {
      const err = e as { code?: string };
      if (err.code === "P2002") {
        throw new BadRequestException("Unique fields error");
      }
      throw e;
    }
  }

  async findByEmailOrLogin(loginOrEmail: string): Promise<User | null> {
    const byEmail = await this.prisma.user.findUnique({
      where: { email: loginOrEmail },
    });
    if (byEmail) return byEmail;

    return this.prisma.user.findUnique({
      where: { login: loginOrEmail },
    });
  }

  async findById(id: string): Promise<UserPublic | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? toUserPublic(user) : null;
  }

  async findAllExcept(currentUserId: string): Promise<UserPublic[]> {
    const users = await this.prisma.user.findMany({
      where: { id: { not: currentUserId } },
      select: { id: true, login: true, email: true },
    });
    return users.map(toUserPublic);
  }

  async getProfile(userId: string): Promise<UserProfileResponse | null> {
    const user = await this.findById(userId);
    if (!user) return null;

    const settings = await this.settingsService.getSettings(userId);
    return {
      user,
      settings: settings ?? getDefaultSettings(),
    };
  }

  async saveSettings(
    userId: string,
    dto: SaveSettingsDto,
  ): Promise<UserProfileResponse> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const settings = await this.settingsService.saveSettings(userId, dto);
    return { user, settings };
  }

  async login(dto: LoginUserDto): Promise<UserPublic> {
    const user = await this.findByEmailOrLogin(dto.login);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isValid = await argon2.verify(user.password, dto.password);
    if (!isValid) {
      throw new UnauthorizedException("Invalid password");
    }

    return toUserPublic(user);
  }

  hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }
}

function getDefaultSettings(): UserSettings {
  return {
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
}
