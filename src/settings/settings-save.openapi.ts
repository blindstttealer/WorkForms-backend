import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger";

/** Same limit as `FileInterceptor` / `ParseFilePipe` on save settings. */
export const SETTINGS_MAX_PHOTO_BYTES = 5 * 1024 * 1024;

const PHOTO_MAX_MB = SETTINGS_MAX_PHOTO_BYTES / (1024 * 1024);

/**
 * OpenAPI fragment for PUT multipart body (`settings` JSON string + optional `photo` file).
 * Import in tests or codegen without loading the controller.
 */
export const SAVE_SETTINGS_MULTIPART_SCHEMA = {
  type: "object",
  required: ["settings"],
  properties: {
    settings: {
      type: "string",
      description: "Stringified JSON matching SaveSettingsDto",
    },
    photo: {
      type: "string",
      format: "binary",
      description: `Optional profile image (JPEG, PNG, WebP, GIF), max ${PHOTO_MAX_MB} MB`,
    },
  },
};

/** Swagger / OpenAPI metadata for PUT save user settings (multipart). */
export function ApiSaveSettingsMultipartDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Save user settings",
      description:
        "Send multipart/form-data: field `settings` — JSON string (SaveSettingsDto); optional file field `photo`.",
    }),
    ApiConsumes("multipart/form-data"),
    ApiBody({
      schema: SAVE_SETTINGS_MULTIPART_SCHEMA,
    }),
  );
}
