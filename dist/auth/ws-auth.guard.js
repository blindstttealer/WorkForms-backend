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
exports.WsAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const jwt_service_1 = require("./jwt.service");
let WsAuthGuard = class WsAuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const client = context.switchToWs().getClient();
        const cookieHeader = client.handshake.headers.cookie;
        if (!cookieHeader) {
            throw new websockets_1.WsException('No cookies');
        }
        const cookies = Object.fromEntries(cookieHeader.split('; ').map((c) => c.split('=')));
        const token = cookies['short_token'] || cookies['long_token'];
        if (!token) {
            throw new websockets_1.WsException('No auth token');
        }
        try {
            const payload = this.jwtService.verify(token);
            client.data = client.data || {};
            client.data.userId = payload.id;
            return true;
        }
        catch {
            throw new websockets_1.WsException('Unauthorized');
        }
    }
};
exports.WsAuthGuard = WsAuthGuard;
exports.WsAuthGuard = WsAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService])
], WsAuthGuard);
//# sourceMappingURL=ws-auth.guard.js.map