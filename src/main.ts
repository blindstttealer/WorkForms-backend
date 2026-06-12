import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";
import { join } from "node:path";
import { AppModule } from "./app.module";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { isSwaggerEnabled, setupSwagger } from "./swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), "uploads"), {
    prefix: "/uploads/",
  });

  console.log("process.cwd()--", process.cwd());
  console.log("dirname--", __dirname);
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

    setupSwagger(app);

  const port = Number(process.env.PORT) || 3000;
  console.log("port", port);
  await app.listen(port);

  console.log(`Server + Socket.IO started on port ${port}`);
}

bootstrap().catch(console.error);
