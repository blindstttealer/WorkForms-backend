import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiCookieAuth } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { SWAGGER_COOKIE_AUTH_NAME } from "./swagger.constants";

/**
 * Binds {@link AuthGuard} and OpenAPI security for the same cookie session.
 * Use on controller class (all routes) or on individual handlers — same as @UseGuards scope.
 */
export function ApiCookieProtected() {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiCookieAuth(SWAGGER_COOKIE_AUTH_NAME),
  );
}
