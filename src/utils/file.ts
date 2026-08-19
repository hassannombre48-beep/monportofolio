import fs from "fs";
import path from "path";
import crypto from "crypto";
import Redis from "ioredis";

const UPLOAD_DIR = path.join(__dirname, "../../uploads");

// 🔹 Initialisation Redis

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

redis.on("connect", () => {
  console.log("✅ Redis connecté");
});

redis.on("error", (err) => {
  console.error("❌ Erreur Redis", err);
});


// Vérifie si le dossier local existe
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

/**
 * Génère un nom unique pour le fichier
 */
export const generateFileName = (originalName: string): string => {
  const ext = path.extname(originalName);
  const unique = crypto.randomBytes(16).toString("hex");
  return `${unique}${ext}`;
};

/**
 * Enregistre un fichier en local
 * Retourne l’URL locale et met en cache Redis
 */
export const saveFile = async (
  buffer: Buffer,
  originalName: string
): Promise<{ localUrl: string }> => {
  const fileName = generateFileName(originalName);
  const localPath = path.join(UPLOAD_DIR, fileName);

  // 🔹 Sauvegarde locale
  fs.writeFileSync(localPath, buffer);
  const localUrl = `/uploads/${fileName}`;

  // 🔹 Cache Redis (URL locale)
  await redis.set(`file:${fileName}`, localUrl, "EX", 3600);

  return { localUrl };
};

/**
 * Récupère un fichier (cache Redis → local)
 */
export const getFile = async (
  fileName: string
): Promise<{ buffer?: Buffer; url?: string } | null> => {
  const localPath = path.join(UPLOAD_DIR, fileName);

  // 1️⃣ Vérifie en cache Redis
  const cachedUrl = await redis.get(`file:${fileName}`);
  if (cachedUrl) {
    return { url: cachedUrl };
  }

  // 2️⃣ Vérifie en local
  if (fs.existsSync(localPath)) {
    return { buffer: fs.readFileSync(localPath), url: `/uploads/${fileName}` };
  }

  return null;
};

/**
 * Supprime un fichier en local et du cache Redis
 */
export const deleteFile = async (fileName: string): Promise<void> => {
  const localPath = path.join(UPLOAD_DIR, fileName);

  // 🔹 Supprime en local
  if (fs.existsSync(localPath)) {
    fs.unlinkSync(localPath);
  }

  // 🔹 Supprime du cache Redis
  await redis.del(`file:${fileName}`);
};
