import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { Application } from "express";

// 🔹 Fonction pour appliquer les règles de sécurité
export function applySecurity(app: Application) {
  // Helmet → ajoute des headers de sécurité (XSS, clickjacking, etc.)
  app.use(helmet());

  // CORS → autorise les requêtes depuis certains domaines
  app.use(cors({
    origin: ["http://localhost:3000"], // Front autorisé
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));

  // Rate limiting → limite le nombre de requêtes par IP
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requêtes max par IP
    message: "Trop de requêtes, réessayez plus tard."
  });
  app.use(limiter);
}

// Exemple d’utilisation dans app.ts :
// import { applySecurity } from "./config/security";
// applySecurity(app);
