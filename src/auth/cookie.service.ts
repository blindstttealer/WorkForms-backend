import { Injectable } from '@nestjs/common';
import { Response } from 'express';

export interface TokenPair {
  longToken: string;
  shortToken: string;
}

@Injectable()
export class CookieService {
  private readonly LONG_TOKEN_MAX_AGE = 31 * 24 * 60 * 60 * 1000; // 31 days
  private readonly SHORT_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 minutes

  setTokens(res: Response, tokens: TokenPair): void {
    res.cookie('long_token', tokens.longToken, {
      maxAge: this.LONG_TOKEN_MAX_AGE,
      httpOnly: true,
    });
    res.cookie('short_token', tokens.shortToken, {
      maxAge: this.SHORT_TOKEN_MAX_AGE,
      httpOnly: true,
    });
  }

  clearTokens(res: Response): void {
    res.clearCookie('long_token');
    res.clearCookie('short_token');
  }
}
