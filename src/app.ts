import express from "express";
import { applySecurity } from "./config/security";
import { logger } from "./config/logger";
import { errorMiddleware } from "./middlewares/error.middleware";
import { rateLimiter } from "./middlewares/rate-limit.middleware";
import path from "path";
import authRoutes from "./modules/auth/auth.routes";
import { authMiddleware } from "./middlewares/auth.middleware";
import projetRoutes from "./modules/projet/projet.routes";
import profileRoutes from "./modules/profil/profile.routes";
import competenceRoutes from "./modules/competence/competence.routes";
import experienceRoutes from "./modules/experience/experience.routes";
const app = express();

// 🔹 Middleware global
app.use(express.json());



app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    message: "API opérationnelle"
  });
});
// 🔹 Sécurité globale
applySecurity(app);

// 🔹 Limitation des requêtes

// 🔹 Rendre le dossier uploads accessible
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/v1/auth", authRoutes);



// Routes profil (protégées)
app.use("/api/v1/profile", authMiddleware, profileRoutes);

// Routes compétences (protégées)
app.use("/api/v1/competences", authMiddleware, competenceRoutes);

// Routes expériences (protégées)
app.use("/api/v1/experiences", authMiddleware, experienceRoutes);

// Routes protégées (nécessitent un token valide)
app.use("/api/v1/projet", authMiddleware, projetRoutes);
// 🔹 Gestion des erreurs
app.use(errorMiddleware);

// 🔹 Log au démarrage
logger.info("🚀 Application initialisée avec sécurité et logger");

export default app;
