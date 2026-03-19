"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("./jwt.service");
const cookie_service_1 = require("./cookie.service");
let AuthGuard = class AuthGuard {
    constructor(jwtService, cookieService) {
        this.jwtService = jwtService;
        this.cookieService = cookieService;
    }
    async canActivate(context) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const shortToken = request.cookies?.['short_token'];
        const longToken = request.cookies?.['long_token'];
        if (!shortToken && !longToken) {
            throw new common_1.UnauthorizedException('No tokens provided');
        }
        try {
            const decoded = this.jwtService.verify(shortToken);
            request.userId = decoded.id;
            return true;
        }
        catch {
            try {
                const decoded = this.jwtService.verify(longToken);
                request.userId = decoded.id;
                this.cookieService.setTokens(response, {
                    longToken,
                    shortToken: shortToken || longToken,
                });
                return true;
            }
            catch {
                throw new common_1.UnauthorizedException({
                    status: 401,
                    message: 'bad tokens',
                    redirect: false,
                });
            }
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService,
        cookie_service_1.CookieService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map