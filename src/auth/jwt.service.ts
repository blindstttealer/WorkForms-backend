import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export interface JwtTokenPayload {
  id: string;
}

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  private getSecret(): string {
    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret || secret.trim() === '') {
      throw new Error('Missing env var: JWT_SECRET');
    }
    return secret;
  }

  signShort(payload: JwtTokenPayload): string {
    return jwt.sign(payload, this.getSecret(), { expiresIn: '15m' });
  }

  signLong(payload: JwtTokenPayload): string {
    return jwt.sign(payload, this.getSecret(), { expiresIn: '31d' });
  }

  verify(token: string): JwtPayload & JwtTokenPayload {
    return jwt.verify(token, this.getSecret()) as JwtPayload & JwtTokenPayload;
  }

  getTokens(payload: JwtTokenPayload): { shortToken: string; longToken: string } {
    return {
      shortToken: this.signShort(payload),
      longToken: this.signLong(payload),
    };
  }
}
