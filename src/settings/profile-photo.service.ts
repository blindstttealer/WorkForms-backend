import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { randomUUID } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Request } from "express";

const MIME_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

@Injectable()
export class ProfilePhotoService {
  private readonly relativeDir = join("uploads", "profile-photos");

  constructor(private readonly configService: ConfigService) {}

  persist(file: Express.Multer.File): { pathname: string } {
    const ext = MIME_EXT[file.mimetype];
    if (!ext) {
      throw new BadRequestException(`Unsupported image type: ${file.mimetype}`);
    }
    const filename = `${randomUUID()}${ext}`;
    const absDir = join(process.cwd(), this.relativeDir);
    mkdirSync(absDir, { recursive: true });
    writeFileSync(join(absDir, filename), file.buffer);
    return { pathname: `/uploads/profile-photos/${filename}` };
  }

  buildPublicUrl(req: Request, pathname: string): string {
    const configured = this.configService
      .get<string>("PUBLIC_APP_URL", "")
      .replace(/\/$/, "");
    if (configured) {
      return `${configured}${pathname}`;
    }
    const host = req.get("host");
    const proto = req.get("x-forwarded-proto") ?? req.protocol;
    return `${proto}://${host}${pathname}`;
  }
}
