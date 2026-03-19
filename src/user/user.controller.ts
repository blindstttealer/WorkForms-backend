import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  UseGuards,
  Res,
  Req,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from "@nestjs/common";
import { Response } from "express";
import { UserService } from "./user.service";
import { JwtService } from "../auth/jwt.service";
import { CookieService } from "../auth/cookie.service";
import { AuthGuard, AuthenticatedRequest } from "../auth/auth.guard";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { SaveSettingsDto } from "./dto/save-settings.dto";

@Controller("api/user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cookieService: CookieService,
  ) {}

  @Post("register")
  async register(
    @Body() dto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const hashPassword = await this.userService.hashPassword(dto.password);
    const user = await this.userService.register(dto, hashPassword);

    const tokens = this.jwtService.getTokens({ id: user.id });
    this.cookieService.setTokens(res, {
      longToken: tokens.longToken,
      shortToken: tokens.shortToken,
    });

    return { user };
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.login(dto);

    const tokens = this.jwtService.getTokens({ id: user.id });
    this.cookieService.setTokens(res, {
      longToken: tokens.longToken,
      shortToken: tokens.shortToken,
    });

    return user;
  }

  @Get("me")
  @UseGuards(AuthGuard)
  async getMe(@Req() req: AuthenticatedRequest) {
    const user = await this.userService.findById(req.userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  @Get("profile")
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: AuthenticatedRequest) {
    const profile = await this.userService.getProfile(req.userId);
    if (!profile) {
      throw new NotFoundException("User not found");
    }
    return profile;
  }

  @Put("settings")
  @UseGuards(AuthGuard)
  async saveSettings(
    @Req() req: AuthenticatedRequest,
    @Body() dto: SaveSettingsDto,
  ) {
    return this.userService.saveSettings(req.userId, dto);
  }

  @Get("users")
  @UseGuards(AuthGuard)
  async getUsers(@Req() req: AuthenticatedRequest) {
    return this.userService.findAllExcept(req.userId);
  }

  @Delete("logout")
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    this.cookieService.clearTokens(res);
    return { message: "Logged out successfully" };
  }
}
