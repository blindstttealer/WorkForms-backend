import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {
  SWAGGER_COOKIE_AUTH_NAME,
  SWAGGER_COOKIE_DESCRIPTION,
  SWAGGER_PATH,
  SWAGGER_TITLE,
} from "./swagger.constants";

/**
 * Registers OpenAPI document + Swagger UI at /{SWAGGER_PATH}.
 * Call after the app graph is built (same as today: after create(), before listen).
 */
export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(
      [
        "REST API for Workforms.",
        "WebSocket events (chat) are not described here — use a Socket.IO client.",
        "",
        "Auth: session cookies (not Bearer header). After login/register, the browser stores cookies; use the same origin or forward cookies in tools like Postman.",
      ].join("\n"),
    )
    .setVersion("1.0")
    .addCookieAuth(SWAGGER_COOKIE_AUTH_NAME, {
      type: "apiKey",
      in: "cookie",
      name: "short_token",
      description: SWAGGER_COOKIE_DESCRIPTION,
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PATH, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      withCredentials: true,
    },
    customSiteTitle: SWAGGER_TITLE,
  });
}
