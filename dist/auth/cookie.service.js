"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieService = void 0;
const common_1 = require("@nestjs/common");
let CookieService = class CookieService {
    constructor() {
        this.LONG_TOKEN_MAX_AGE = 31 * 24 * 60 * 60 * 1000;
        this.SHORT_TOKEN_MAX_AGE = 15 * 60 * 1000;
    }
    setTokens(res, tokens) {
        res.cookie('long_token', tokens.longToken, {
            maxAge: this.LONG_TOKEN_MAX_AGE,
            httpOnly: true,
        });
        res.cookie('short_token', tokens.shortToken, {
            maxAge: this.SHORT_TOKEN_MAX_AGE,
            httpOnly: true,
        });
    }
    clearTokens(res) {
        res.clearCookie('long_token');
        res.clearCookie('short_token');
    }
};
exports.CookieService = CookieService;
exports.CookieService = CookieService = __decorate([
    (0, common_1.Injectable)()
], CookieService);
//# sourceMappingURL=cookie.service.js.map