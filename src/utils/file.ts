import fs from "fs";
import path from "path";
import crypto from "crypto";
import Redis from "ioredis";
import { logger } from "../config/logger";

// ============================================================
// 📁 Configuration du dossier des fichiers
// ============================================================

const UPLOAD_DIR = path.join(__dirname, "../../uploads");

// ============================================================
// 🔴 Initialisation Redis
// ============================================================

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("❌ REDIS_URL n'est pas définie");
}

const redis = new Redis(redisUrl);

redis.on("connect", () => {
  logger.info("✅ Redis connecté");
});

redis.on("ready", () => {
  logger.info("✅ Redis prêt");
});

redis.on("error", (err) => {
  logger.error(`❌ Erreur Redis : ${err.message}`);
});

redis.on("close", () => {
  logger.warn("⚠️ Connexion Redis fermée");
});

// ============================================================
// 📁 Création du dossier uploads
// ============================================================

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// ============================================================
// 🔐 Génération d'un nom de fichier unique
// ============================================================

export const generateFileName = (originalName: string): string => {
  const ext = path.extname(originalName);

  const unique = crypto
    .randomBytes(16)
    .toString("hex");

  return `${unique}${ext}`;
};

// ============================================================
// 📤 Enregistrer un fichier
// ============================================================

export const saveFile = async (
  buffer: Buffer,
  originalName: string
): Promise<{ localUrl: string }> => {
  const fileName = generateFileName(originalName);

  const localPath = path.join(
    UPLOAD_DIR,
    fileName
  );

  // Sauvegarde locale
  fs.writeFileSync(localPath, buffer);

  const localUrl = `/uploads/${fileName}`;

  // Mise en cache Redis
  try {
    await redis.set(
      `file:${fileName}`,
      localUrl,
      "EX",
      3600
    );
  } catch (error) {
    logger.error(
      `❌ Erreur lors de l'enregistrement Redis : ${error}`
    );
  }

  return {
    localUrl,
  };
};

// ============================================================
// 📥 Récupérer un fichier
// ============================================================

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

  // ----------------------------------------------------------
  // 1️⃣ Vérifier Redis
  // ----------------------------------------------------------

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
      `❌ Erreur lecture Redis : ${error}`
    );
  }

  // ----------------------------------------------------------
  // 2️⃣ Vérifier le stockage local
  // ----------------------------------------------------------

  if (fs.existsSync(localPath)) {
    return {
      buffer: fs.readFileSync(localPath),
      url: `/uploads/${fileName}`,
    };
  }

  // ----------------------------------------------------------
  // 3️⃣ Fichier introuvable
  // ----------------------------------------------------------

  return null;
};

// ============================================================
// 🗑️ Supprimer un fichier
// ============================================================

export const deleteFile = async (
  fileName: string
): Promise<void> => {

  const localPath = path.join(
    UPLOAD_DIR,
    fileName
  );

  // ----------------------------------------------------------
  // Supprimer le fichier local
  // ----------------------------------------------------------

  if (fs.existsSync(localPath)) {
    fs.unlinkSync(localPath);
  }

  // ----------------------------------------------------------
  // Supprimer le cache Redis
  // ----------------------------------------------------------

  try {
    await redis.del(
      `file:${fileName}`
    );
  } catch (error) {
    logger.error(
      `❌ Erreur suppression Redis : ${error}`
    );
  }
};

// ============================================================
// 🔌 Export Redis si nécessaire ailleurs
// ============================================================

export { redis };