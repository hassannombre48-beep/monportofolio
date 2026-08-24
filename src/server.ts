import app from "./app";
import { ENV } from "./config/env";
import { logger } from "./config/logger";
import { prisma } from "./config/database";
import { redis } from "./config/redis";

const PORT = Number(process.env.PORT) || 3000;

let server: ReturnType<typeof app.listen> | undefined;

const shutdown = async (signal: string) => {
  logger.info(`Signal ${signal} reçu, arrêt du serveur...`);

  const closeServer = server
    ? new Promise<void>((resolve) => server?.close(() => resolve()))
    : Promise.resolve();

  await closeServer;
  await Promise.allSettled([prisma.$disconnect(), redis.quit()]);
  process.exit(0);
};

process.once("SIGTERM", () => void shutdown("SIGTERM"));
process.once("SIGINT", () => void shutdown("SIGINT"));

prisma.$connect()
  .then(() => {
    logger.info("Connexion PostgreSQL réussie");
    server = app.listen(PORT, "0.0.0.0", () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error: unknown) => {
    logger.error("Erreur PostgreSQL", error);
    process.exitCode = 1;
  });