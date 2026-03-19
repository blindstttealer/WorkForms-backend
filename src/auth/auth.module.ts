import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { CookieService } from './cookie.service';
import { AuthGuard } from './auth.guard';
import { WsAuthGuard } from './ws-auth.guard';

@Module({
  providers: [JwtService, CookieService, AuthGuard, WsAuthGuard],
  exports: [JwtService, CookieService, AuthGuard, WsAuthGuard],
})
export class AuthModule {}
