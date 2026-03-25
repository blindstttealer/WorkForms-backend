import { Injectable } from "@nestjs/common";
import { Response, CookieOptions } from "express";

export interface TokenPair {
  longToken: string;
  shortToken: string;
}

@Injectable()
export class CookieService {
  private readonly LONG_TOKEN_MAX_AGE = 31 * 24 * 60 * 60 * 1000; // 31 days
  private readonly SHORT_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 minutes
  // private readonly isProduction = process.env.NODE_ENV === 'production';

  private getCookieOptions(maxAge: number): CookieOptions {
    return {
      maxAge,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
  }

  setTokens(res: Response, tokens: TokenPair): void {
    res.cookie(
      "long_token",
      tokens.longToken,
      this.getCookieOptions(this.LONG_TOKEN_MAX_AGE),
    );
    res.cookie(
      "short_token",
      tokens.shortToken,
      this.getCookieOptions(this.SHORT_TOKEN_MAX_AGE),
    );
  }

  clearTokens(res: Response): void {
    res.clearCookie("long_token", this.getCookieOptions(0));
    res.clearCookie("short_token", this.getCookieOptions(0));
  }
}
