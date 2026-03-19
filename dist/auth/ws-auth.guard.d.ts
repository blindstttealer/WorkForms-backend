import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from './jwt.service';
export interface AuthenticatedSocket {
    id: string;
    data: {
        userId: string;
    };
    handshake: {
        headers: {
            cookie?: string;
        };
    };
    join: (room: string) => void;
    emit: (event: string, data: unknown) => void;
}
export declare class WsAuthGuard implements CanActivate {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    canActivate(context: ExecutionContext): boolean;
}
