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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const jwt_service_1 = require("../auth/jwt.service");
const ws_auth_guard_1 = require("../auth/ws-auth.guard");
let ChatGateway = class ChatGateway {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    handleConnection(client) {
        try {
            const cookieHeader = client.handshake.headers.cookie;
            if (!cookieHeader) {
                client.disconnect();
                return;
            }
            const cookies = Object.fromEntries(cookieHeader.split('; ').map((c) => c.split('=')));
            const token = cookies['short_token'] || cookies['long_token'];
            if (!token) {
                client.disconnect();
                return;
            }
            const payload = this.jwtService.verify(token);
            client.data.userId = payload.id;
            client.join(payload.id);
            console.log('User online:', payload.id);
        }
        catch {
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        console.log('User offline:', client.data?.userId);
    }
    handleSendMessage(client, payload) {
        const userId = client.data.userId;
        const message = {
            id: (0, crypto_1.randomUUID)(),
            from: userId,
            to: payload.toUserId,
            text: payload.text,
            createdAt: new Date().toISOString(),
        };
        this.io.to(payload.toUserId).emit('new-message', message);
        client.emit('new-message', message);
        return message;
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "io", void 0);
__decorate([
    (0, common_1.UseGuards)(ws_auth_guard_1.WsAuthGuard),
    (0, websockets_1.SubscribeMessage)('send-message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Object)
], ChatGateway.prototype, "handleSendMessage", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: true, credentials: true },
    }),
    __metadata("design:paramtypes", [jwt_service_1.JwtService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map