import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { Application } from "express";

// 🔹 Fonction pour appliquer les règles de sécurité
export function applySecurity(app: Application) {
  // Render est derrière un reverse proxy
  app.set("trust proxy", 1);

  // Helmet → headers de sécurité
 app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

  // CORS
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        // Ajoute ici ton frontend quand il sera déployé
        // "https://ton-frontend.onrender.com"
    
        "http://127.0.0.1:5173",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true,
    })
  );

  // Rate limiting global
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: "Trop de requêtes, réessayez plus tard.",
    },
  });

  app.use(limiter);
}