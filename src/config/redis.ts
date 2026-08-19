import Redis from "ioredis";
import { logger } from "./logger";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("❌ REDIS_URL n'est pas définie");
}

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,

  retryStrategy(times) {
    return Math.min(times * 1000, 5000);
  },
});

redis.on("connect", () => {
  logger.info("🔴 Redis connecté");
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