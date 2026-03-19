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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_service_1 = require("../auth/jwt.service");
const cookie_service_1 = require("../auth/cookie.service");
const auth_guard_1 = require("../auth/auth.guard");
const register_user_dto_1 = require("./dto/register-user.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const save_settings_dto_1 = require("./dto/save-settings.dto");
let UserController = class UserController {
    constructor(userService, jwtService, cookieService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.cookieService = cookieService;
    }
    async register(dto, res) {
        const hashPassword = await this.userService.hashPassword(dto.password);
        const user = await this.userService.register(dto, hashPassword);
        const tokens = this.jwtService.getTokens({ id: user.id });
        this.cookieService.setTokens(res, {
            longToken: tokens.longToken,
            shortToken: tokens.shortToken,
        });
        return { user };
    }
    async login(dto, res) {
        const user = await this.userService.login(dto);
        const tokens = this.jwtService.getTokens({ id: user.id });
        this.cookieService.setTokens(res, {
            longToken: tokens.longToken,
            shortToken: tokens.shortToken,
        });
        return user;
    }
    async getMe(req) {
        const user = await this.userService.findById(req.userId);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        return user;
    }
    async getProfile(req) {
        const profile = await this.userService.getProfile(req.userId);
        if (!profile) {
            throw new common_1.NotFoundException("User not found");
        }
        return profile;
    }
    async saveSettings(req, dto) {
        return this.userService.saveSettings(req.userId, dto);
    }
    async getUsers(req) {
        return this.userService.findAllExcept(req.userId);
    }
    async logout(res) {
        this.cookieService.clearTokens(res);
        return { message: "Logged out successfully" };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("me"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)("profile"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)("settings"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, save_settings_dto_1.SaveSettingsDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "saveSettings", null);
__decorate([
    (0, common_1.Get)("users"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Delete)("logout"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("api/user"),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_service_1.JwtService,
        cookie_service_1.CookieService])
], UserController);
//# sourceMappingURL=user.controller.js.map