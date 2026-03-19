import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '../auth/jwt.service';
export interface SendMessagePayload {
    toUserId: string;
    text: string;
}
export interface ChatMessage {
    id: string;
    from: string;
    to: string;
    text: string;
    createdAt: string;
}
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly jwtService;
    io: Server;
    constructor(jwtService: JwtService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleSendMessage(client: Socket, payload: SendMessagePayload): ChatMessage;
}
