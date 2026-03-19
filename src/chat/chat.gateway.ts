import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { JwtService } from '../auth/jwt.service';
import { WsAuthGuard } from '../auth/ws-auth.guard';

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

@WebSocketGateway({
  cors: { origin: true, credentials: true },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  io: Server;

  constructor(private readonly jwtService: JwtService) {}

  handleConnection(client: Socket) {
    try {
      const cookieHeader = client.handshake.headers.cookie;
      if (!cookieHeader) {
        client.disconnect();
        return;
      }

      const cookies = Object.fromEntries(
        cookieHeader.split('; ').map((c) => c.split('=')),
      );
      const token = cookies['short_token'] || cookies['long_token'];

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token);
      client.data.userId = payload.id;
      client.join(payload.id);
      console.log('User online:', payload.id);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log('User offline:', client.data?.userId);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('send-message')
  handleSendMessage(client: Socket, payload: SendMessagePayload): ChatMessage {
    const userId = client.data.userId;
    const message: ChatMessage = {
      id: randomUUID(),
      from: userId,
      to: payload.toUserId,
      text: payload.text,
      createdAt: new Date().toISOString(),
    };

    this.io.to(payload.toUserId).emit('new-message', message);
    client.emit('new-message', message);

    return message;
  }
}
