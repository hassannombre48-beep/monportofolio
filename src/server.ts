import app from "./app";
import { ENV } from "./config/env";
import { logger } from "./config/logger";
import { prisma } from "./config/database";

const PORT = Number(process.env.PORT) || 3000;

prisma.$connect()
  .then(() => {
    logger.info("Connexion PostgreSQL réussie");
    app.listen(PORT, "0.0.0.0", () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error: unknown) => {
    logger.error("Erreur PostgreSQL", error);
    process.exitCode = 1;
  });