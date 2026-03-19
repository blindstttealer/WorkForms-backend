import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from './jwt.service';
import { CookieService } from './cookie.service';
export interface AuthenticatedRequest extends Request {
    userId: string;
}
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly cookieService;
    constructor(jwtService: JwtService, cookieService: CookieService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
