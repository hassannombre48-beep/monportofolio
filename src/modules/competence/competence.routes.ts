import { Router } from "express";
import {
  createCompetenceController,
  getCompetencesController, updateCompetenceController,
  deleteCompetenceController
} from "./competence.controller";
import { competenceSchema } from "./competence.schema";
import { validateMiddleware } from "../../middlewares/validate.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
const router = Router();

router.post("/competences", validateMiddleware(competenceSchema), authMiddleware, createCompetenceController);
router.get("/competences", getCompetencesController);
router.put("/competences/:id", validateMiddleware(competenceSchema), authMiddleware, updateCompetenceController);    // ✅ Modifier
router.delete("/competences/:id", authMiddleware, deleteCompetenceController); // ✅ Supprimer

export default router;
