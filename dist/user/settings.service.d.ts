import { PrismaService } from "../prisma/prisma.service";
import { SaveSettingsDto } from "./dto/save-settings.dto";
import { UserSettings } from "./types/user.types";
export declare class SettingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSettings(userId: string): Promise<UserSettings | null>;
    saveSettings(userId: string, dto: SaveSettingsDto): Promise<UserSettings>;
}
