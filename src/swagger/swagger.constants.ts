/**
 * OpenAPI / Swagger: one place for paths and security scheme ids.
 * Controllers must use the same cookie scheme name as in setup-swagger.ts (addCookieAuth).
 */
export const SWAGGER_PATH = "api/docs";

export const SWAGGER_TITLE = "Workforms API";

/** Group name in Swagger UI sidebar — use one tag per controller (resource). */
export const SWAGGER_TAG_USER = "User";

export const SWAGGER_TAG_SETTINGS = "Settings";

/**
 * Security scheme id (first argument to DocumentBuilder.addCookieAuth).
 * @see ApiCookieAuth(this value) and addCookieAuth(this value, …)
 */
export const SWAGGER_COOKIE_AUTH_NAME = "cookies";

export const SWAGGER_COOKIE_DESCRIPTION =
  "HttpOnly cookies from POST /api/user/login or /api/user/register. The API accepts short_token or long_token.";
