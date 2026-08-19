import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { logger } from "./logger";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL n'est pas définie");
}

const adapter = new PrismaPg({
  connectionString,
});

export const prisma = new PrismaClient({
  adapter,
});

prisma
  .$connect()
  .then(() => {
    logger.info("✅ Connexion PostgreSQL réussie");
  })
  .catch((err: unknown) => {
    logger.error("❌ Erreur PostgreSQL", err);
  });