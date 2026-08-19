import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { logger } from "./logger";

const connectionUrl = process.env.DATABASE_URL || "mysql://root:5174@localhost:3306/mon_portfolio";
const adapter = new PrismaMariaDb(connectionUrl);

export const prisma = new PrismaClient({ adapter });

prisma.$connect()
  .then(() => logger.info("✅ Connexion DB réussie"))
  .catch((err: unknown) => logger.error("❌ Erreur DB", err));
