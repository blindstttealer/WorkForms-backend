import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { SettingsModule } from "./settings/settings.module";
import { ChatModule } from "./chat/chat.module";

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    AuthModule,
    UserModule,
    SettingsModule,
    ChatModule,
  ],
})
export class AppModule {}
