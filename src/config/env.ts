/**
 * Gestion des variables d'environnement
 * --------------------------------------
 * - Charge les variables depuis le fichier .env
 * - Centralise l'accès aux valeurs sensibles
 * - Fournit des valeurs par défaut en cas d'absence
 */

import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "supersecret", // ⚠️ À remplacer en prod
  DATABASE_URL: process.env.DATABASE_URL || "",
  FRONTEND_URL: process.env.FRONTEND_URL || "",
  NODE_ENV: process.env.NODE_ENV || "development"
};
