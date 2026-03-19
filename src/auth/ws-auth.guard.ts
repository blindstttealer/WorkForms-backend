import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { JwtService } from './jwt.service';

export interface AuthenticatedSocket {
  id: string;
  data: { userId: string };
  handshake: { headers: { cookie?: string } };
  join: (room: string) => void;
  emit: (event: string, data: unknown) => void;
}

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient<AuthenticatedSocket>();
    const cookieHeader = client.handshake.headers.cookie;

    if (!cookieHeader) {
      throw new WsException('No cookies');
    }

    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map((c) => c.split('=')),
    );

    const token = cookies['short_token'] || cookies['long_token'];

    if (!token) {
      throw new WsException('No auth token');
    }

    try {
      const payload = this.jwtService.verify(token);
      client.data = client.data || {};
      client.data.userId = payload.id;
      return true;
    } catch {
      throw new WsException('Unauthorized');
    }
  }
}
