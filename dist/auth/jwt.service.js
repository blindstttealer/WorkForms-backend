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
exports.JwtService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt = require("jsonwebtoken");
let JwtService = class JwtService {
    constructor(configService) {
        this.configService = configService;
    }
    getSecret() {
        const secret = this.configService.get('JWT_SECRET');
        if (!secret || secret.trim() === '') {
            throw new Error('Missing env var: JWT_SECRET');
        }
        return secret;
    }
    signShort(payload) {
        return jwt.sign(payload, this.getSecret(), { expiresIn: '15m' });
    }
    signLong(payload) {
        return jwt.sign(payload, this.getSecret(), { expiresIn: '31d' });
    }
    verify(token) {
        return jwt.verify(token, this.getSecret());
    }
    getTokens(payload) {
        return {
            shortToken: this.signShort(payload),
            longToken: this.signLong(payload),
        };
    }
};
exports.JwtService = JwtService;
exports.JwtService = JwtService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtService);
//# sourceMappingURL=jwt.service.js.map