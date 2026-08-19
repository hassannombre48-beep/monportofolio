/**
 * Logger centralisé (Winston)
 * ---------------------------
 * - Utilisé pour tracer les événements applicatifs
 * - Sauvegarde les erreurs dans un fichier dédié
 * - Sauvegarde tous les logs combinés dans un autre fichier
 * - Colorisation en console pour faciliter la lecture en dev
 */

import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "info", // Niveau minimum de log (info, warn, error)
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Ajoute la date/heure
    format.errors({ stack: true }), // Affiche la stack en cas d'erreur
    format.colorize(), // Colorise les logs dans la console
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Affiche les logs dans la console
    new transports.File({ filename: "logs/error.log", level: "error" }), // Sauvegarde uniquement les erreurs
    new transports.File({ filename: "logs/combined.log" }) // Sauvegarde tous les logs
  ]
});

// Exemple d’utilisation :
// logger.info("✅ Serveur démarré");
// logger.warn("⚠️ Attention : mémoire élevée");
// logger.error("❌ Erreur critique");
