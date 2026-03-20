import { PrismaService } from "../prisma/prisma.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { SaveSettingsDto } from "./dto/save-settings.dto";
import { User } from "../generated/client";
import { UserPublic, UserProfileResponse } from "./types/user.types";
import { SettingsService } from "./settings.service";
export declare class UserService {
    private readonly prisma;
    private readonly settingsService;
    constructor(prisma: PrismaService, settingsService: SettingsService);
    register(dto: RegisterUserDto, hashPassword: string): Promise<UserPublic>;
    findByEmailOrLogin(loginOrEmail: string): Promise<User | null>;
    findById(id: string): Promise<UserPublic | null>;
    findAllExcept(currentUserId: string): Promise<UserPublic[]>;
    getProfile(userId: string): Promise<UserProfileResponse | null>;
    saveSettings(userId: string, dto: SaveSettingsDto): Promise<UserProfileResponse>;
    login(dto: LoginUserDto): Promise<UserPublic>;
    hashPassword(password: string): Promise<string>;
}
