import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from './jwt.service';
import { CookieService } from './cookie.service';
import { Response } from 'express';

export interface AuthenticatedRequest extends Request {
  userId: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly cookieService: CookieService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const shortToken = request.cookies?.['short_token'];
    const longToken = request.cookies?.['long_token'];

    if (!shortToken && !longToken) {
      throw new UnauthorizedException('No tokens provided');
    }

    try {
      const decoded = this.jwtService.verify(shortToken);
      (request as AuthenticatedRequest).userId = decoded.id;
      return true;
    } catch {
      try {
        const decoded = this.jwtService.verify(longToken);
        (request as AuthenticatedRequest).userId = decoded.id;
        // Refresh cookies: set long token and short token (or long if short missing)
        this.cookieService.setTokens(response, {
          longToken,
          shortToken: shortToken || longToken,
        });
        return true;
      } catch {
        throw new UnauthorizedException({
          status: 401,
          message: 'bad tokens',
          redirect: false,
        });
      }
    }
  }
}
