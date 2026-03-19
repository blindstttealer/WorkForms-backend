import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { IoAdapter } from "@nestjs/platform-socket.io";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: (_origin, callback) => callback(null, true),
    credentials: true,
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  const port = Number(process.env.PORT) || 3000;
  console.log("port", port);
  await app.listen(port);

  console.log(`Server + Socket.IO started on port ${port}`);
}

bootstrap().catch(console.error);
