import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { logger } from "./logger";

const connectionUrl = process.env.DATABASE_URL;

if (!connectionUrl) {
  throw new Error("DATABASE_URL n'est pas définie");
}

const adapter = new PrismaMariaDb(connectionUrl);

export const prisma = new PrismaClient({ adapter });

prisma.$connect()
  .then(() => logger.info("✅ Connexion DB réussie"))
  .catch((err: unknown) => logger.error("❌ Erreur DB", err));