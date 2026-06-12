import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { Response } from "express";
import { UserService } from "./user.service";
import { JwtService } from "../auth/jwt.service";
import { CookieService } from "../auth/cookie.service";
import { AuthenticatedRequest } from "../auth/auth.guard";
import { ApiCookieProtected, SWAGGER_TAG_USER } from "../swagger";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import {
  RegisterUserResponseDto,
  UserProfileResponseDto,
  UserPublicResponseDto,
} from "./dto/user-response.dto";

@ApiTags(SWAGGER_TAG_USER)
@Controller("api/user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cookieService: CookieService,
  ) {}

  @Post("register")
  @ApiOperation({ summary: "Register; sets auth cookies on success" })
  @ApiCreatedResponse({ type: RegisterUserResponseDto })
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
  @ApiOperation({ summary: "Login; sets auth cookies on success" })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserPublicResponseDto })
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
  @ApiCookieProtected()
  @ApiOperation({ summary: "Current user (minimal fields)" })
  @ApiOkResponse({ type: UserPublicResponseDto })
  async getMe(@Req() req: AuthenticatedRequest) {
    const user = await this.userService.findById(req.userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  @Get("profile")
  @ApiCookieProtected()
  @ApiOperation({ summary: "Profile + settings payload" })
  @ApiOkResponse({ type: UserProfileResponseDto })
  async getProfile(@Req() req: AuthenticatedRequest) {
    const profile = await this.userService.getProfile(req.userId);
    if (!profile) {
      throw new NotFoundException("User not found");
    }
    return profile;
  }

  @Get("users")
  @ApiCookieProtected()
  @ApiOperation({ summary: "List other users (for chat, etc.)" })
  async getUsers(@Req() req: AuthenticatedRequest) {
    return this.userService.findAllExcept(req.userId);
  }

  @Delete("logout")
  @ApiCookieProtected()
  @ApiOperation({ summary: "Clear auth cookies" })
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    this.cookieService.clearTokens(res);
    return { message: "Logged out successfully" };
  }
}
