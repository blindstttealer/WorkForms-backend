"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon2 = require("argon2");
const user_mapper_1 = require("./mappers/user.mapper");
const settings_service_1 = require("./settings.service");
let UserService = class UserService {
    constructor(prisma, settingsService) {
        this.prisma = prisma;
        this.settingsService = settingsService;
    }
    async register(dto, hashPassword) {
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hashPassword,
                    login: dto.login,
                },
            });
            return (0, user_mapper_1.toUserPublic)(user);
        }
        catch (e) {
            const err = e;
            if (err.code === "P2002") {
                throw new common_1.BadRequestException("Unique fields error");
            }
            throw e;
        }
    }
    async findByEmailOrLogin(loginOrEmail) {
        const byEmail = await this.prisma.user.findUnique({
            where: { email: loginOrEmail },
        });
        if (byEmail)
            return byEmail;
        return this.prisma.user.findUnique({
            where: { login: loginOrEmail },
        });
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        return user ? (0, user_mapper_1.toUserPublic)(user) : null;
    }
    async findAllExcept(currentUserId) {
        const users = await this.prisma.user.findMany({
            where: { id: { not: currentUserId } },
            select: { id: true, login: true, email: true },
        });
        return users.map(user_mapper_1.toUserPublic);
    }
    async getProfile(userId) {
        const user = await this.findById(userId);
        if (!user)
            return null;
        const settings = await this.settingsService.getSettings(userId);
        return {
            user,
            settings: settings ?? getDefaultSettings(),
        };
    }
    async saveSettings(userId, dto) {
        const user = await this.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const settings = await this.settingsService.saveSettings(userId, dto);
        return { user, settings };
    }
    async login(dto) {
        const user = await this.findByEmailOrLogin(dto.login);
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const isValid = await argon2.verify(user.password, dto.password);
        if (!isValid) {
            throw new common_1.UnauthorizedException("Invalid password");
        }
        return (0, user_mapper_1.toUserPublic)(user);
    }
    hashPassword(password) {
        return argon2.hash(password);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        settings_service_1.SettingsService])
], UserService);
function getDefaultSettings() {
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
//# sourceMappingURL=user.service.js.map