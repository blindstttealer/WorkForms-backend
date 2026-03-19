import { Response } from "express";
import { UserService } from "./user.service";
import { JwtService } from "../auth/jwt.service";
import { CookieService } from "../auth/cookie.service";
import { AuthenticatedRequest } from "../auth/auth.guard";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { SaveSettingsDto } from "./dto/save-settings.dto";
export declare class UserController {
    private readonly userService;
    private readonly jwtService;
    private readonly cookieService;
    constructor(userService: UserService, jwtService: JwtService, cookieService: CookieService);
    register(dto: RegisterUserDto, res: Response): Promise<{
        user: import("./types/user.types").UserPublic;
    }>;
    login(dto: LoginUserDto, res: Response): Promise<import("./types/user.types").UserPublic>;
    getMe(req: AuthenticatedRequest): Promise<import("./types/user.types").UserPublic>;
    getProfile(req: AuthenticatedRequest): Promise<import("./types/user.types").UserProfileResponse>;
    saveSettings(req: AuthenticatedRequest, dto: SaveSettingsDto): Promise<import("./types/user.types").UserProfileResponse>;
    getUsers(req: AuthenticatedRequest): Promise<import("./types/user.types").UserPublic[]>;
    logout(res: Response): Promise<{
        message: string;
    }>;
}
