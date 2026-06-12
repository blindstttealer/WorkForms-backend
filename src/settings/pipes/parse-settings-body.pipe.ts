import {
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { SaveSettingsDto } from "../dto/save-settings.dto";

/**
 * Parses multipart body field `settings` into SaveSettingsDto.
 * Expects `settings` to be a JSON string (from FormData.append("settings", JSON.stringify(...))).
 */
@Injectable()
export class ParseSettingsBodyPipe implements PipeTransform {
  async transform(body: unknown): Promise<SaveSettingsDto> {
    if (body === null || typeof body !== "object" || Array.isArray(body)) {
      throw new BadRequestException("Invalid form body");
    }

    const raw = (body as Record<string, unknown>).settings;
    if (typeof raw !== "string") {
      throw new BadRequestException(
        'Field "settings" is required and must be a JSON string',
      );
    }

    let source: unknown;
    try {
      source = JSON.parse(raw);
    } catch {
      throw new BadRequestException('Field "settings" must be valid JSON');
    }

    if (source === null || typeof source !== "object" || Array.isArray(source)) {
      throw new BadRequestException('Field "settings" must be a JSON object');
    }

    const dto = plainToInstance(SaveSettingsDto, source, {
      enableImplicitConversion: true,
    });

    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return dto;
  }
}
