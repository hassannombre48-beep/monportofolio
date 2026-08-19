import fs from "fs";
import path from "path";
import crypto from "crypto";
import { logger } from "../config/logger";
import { redis } from "../config/redis";

const UPLOAD_DIR = path.join(__dirname, "../../uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const generateFileName = (originalName: string): string => {
  const ext = path.extname(originalName);

  const unique = crypto
    .randomBytes(16)
    .toString("hex");

  return `${unique}${ext}`;
};

export const saveFile = async (
  buffer: Buffer,
  originalName: string
): Promise<{ localUrl: string }> => {
  const fileName = generateFileName(originalName);

  const localPath = path.join(
    UPLOAD_DIR,
    fileName
  );

  fs.writeFileSync(localPath, buffer);

  const localUrl = `/uploads/${fileName}`;

  try {
    await redis.set(
      `file:${fileName}`,
      localUrl,
      "EX",
      3600
    );
  } catch (error) {
    logger.error(
      `❌ Erreur Redis lors de la sauvegarde : ${error}`
    );
  }

  return {
    localUrl,
  };
};

export const getFile = async (
  fileName: string
): Promise<{
  buffer?: Buffer;
  url?: string;
} | null> => {

  const localPath = path.join(
    UPLOAD_DIR,
    fileName
  );

  try {
    const cachedUrl = await redis.get(
      `file:${fileName}`
    );

    if (cachedUrl) {
      return {
        url: cachedUrl,
      };
    }
  } catch (error) {
    logger.error(
      `❌ Erreur Redis lors de la lecture : ${error}`
    );
  }

  if (fs.existsSync(localPath)) {
    return {
      buffer: fs.readFileSync(localPath),
      url: `/uploads/${fileName}`,
    };
  }

  return null;
};

export const deleteFile = async (
  fileName: string
): Promise<void> => {

  const localPath = path.join(
    UPLOAD_DIR,
    fileName
  );

  if (fs.existsSync(localPath)) {
    fs.unlinkSync(localPath);
  }

  try {
    await redis.del(`file:${fileName}`);
  } catch (error) {
    logger.error(
      `❌ Erreur Redis lors de la suppression : ${error}`
    );
  }
};