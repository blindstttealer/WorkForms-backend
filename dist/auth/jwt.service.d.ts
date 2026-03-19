import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'jsonwebtoken';
export interface JwtTokenPayload {
    id: string;
}
export declare class JwtService {
    private readonly configService;
    constructor(configService: ConfigService);
    private getSecret;
    signShort(payload: JwtTokenPayload): string;
    signLong(payload: JwtTokenPayload): string;
    verify(token: string): JwtPayload & JwtTokenPayload;
    getTokens(payload: JwtTokenPayload): {
        shortToken: string;
        longToken: string;
    };
}
