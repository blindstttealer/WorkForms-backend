/**
 * When Swagger UI is mounted:
 * - Production: off unless SWAGGER_ENABLED=true (avoid exposing API shape publicly).
 * - Non-production: on unless SWAGGER_ENABLED=false (local/staging opt-out).
 */
export function isSwaggerEnabled(): boolean {
  if (process.env.SWAGGER_ENABLED === "true") {
    return true;
  }
  if (process.env.SWAGGER_ENABLED === "false") {
    return false;
  }
  return process.env.NODE_ENV !== "production";
}
