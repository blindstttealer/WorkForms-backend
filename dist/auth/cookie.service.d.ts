import { Response } from 'express';
export interface TokenPair {
    longToken: string;
    shortToken: string;
}
export declare class CookieService {
    private readonly LONG_TOKEN_MAX_AGE;
    private readonly SHORT_TOKEN_MAX_AGE;
    setTokens(res: Response, tokens: TokenPair): void;
    clearTokens(res: Response): void;
}
