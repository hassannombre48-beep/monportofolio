import fs from "fs";
import path from "path";
import crypto from "crypto";
import { logger } from "../config/logger";
import { redis } from "../config/redis";

const UPLOAD_DIR = path.join(__dirname, "../../uploads");

// ✅ Vérifie que le dossier existe
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// ✅ Génère un nom unique
export const generateFileName = (originalName: string): string => {
  const ext = path.extname(originalName);
  const unique = crypto.randomBytes(16).toString("hex");
  return `${unique}${ext}`;
};

// ✅ Sauvegarde un fichier
export const saveFile = async (
  buffer: Buffer,
  originalName: string
): Promise<{ localUrl: string }> => {
  try {
    const fileName = generateFileName(originalName);
    const localPath = path.join(UPLOAD_DIR, fileName);

    // Écrit le fichier
    await fs.promises.writeFile(localPath, buffer);

    const localUrl = `/uploads/${fileName}`;

    // Cache Redis
    try {
      await redis.set(`file:${fileName}`, localUrl, "EX", 3600);
    } catch (error) {
      logger.error(`❌ Erreur Redis lors de la sauvegarde : ${error}`);
    }

    return { localUrl };
  } catch (error: any) {
    throw new Error("Erreur lors de la sauvegarde du fichier : " + error.message);
  }
};

// ✅ Récupère un fichier
export const getFile = async (
  fileName: string
): Promise<{ buffer?: Buffer; url?: string } | null> => {
  try {
    const localPath = path.join(UPLOAD_DIR, fileName);

    // Vérifie en cache Redis
    try {
      const cachedUrl = await redis.get(`file:${fileName}`);
      if (cachedUrl) {
        return { url: cachedUrl };
      }
    } catch (error) {
      logger.error(`❌ Erreur Redis lors de la lecture : ${error}`);
    }

    // Vérifie en local
    if (fs.existsSync(localPath)) {
      const stat = await fs.promises.stat(localPath);
      if (stat.isDirectory()) {
        throw new Error("EISDIR: le chemin correspond à un dossier, pas un fichier");
      }

      return {
        buffer: await fs.promises.readFile(localPath),
        url: `/uploads/${fileName}`,
      };
    }

    return null;
  } catch (error: any) {
    throw new Error("Erreur lors de la récupération du fichier : " + error.message);
  }
};

// ✅ Supprime un fichier
export const deleteFile = async (fileName: string): Promise<void> => {
  try {
    const localPath = path.join(UPLOAD_DIR, fileName);

    if (fs.existsSync(localPath)) {
      const stat = await fs.promises.stat(localPath);
      if (stat.isDirectory()) {
        throw new Error("EISDIR: tentative de suppression d’un dossier au lieu d’un fichier");
      }
      await fs.promises.unlink(localPath);
    }

    try {
      await redis.del(`file:${fileName}`);
    } catch (error) {
      logger.error(`❌ Erreur Redis lors de la suppression : ${error}`);
    }
  } catch (error: any) {
    throw new Error("Erreur lors de la suppression du fichier : " + error.message);
  }
};
