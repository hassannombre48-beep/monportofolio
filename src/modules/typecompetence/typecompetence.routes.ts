import { Router } from "express";
import {
  createTypeCompetenceController,
  getTypesCompetenceController,getTypesCompetenceWithCompetencesController,updateTypeCompetenceController,
  deleteTypeCompetenceController,getTypeCompetenceByNameController
} from "./typecompetence.controller";
import {typeCompetenceSchema} from "./typecompetence.schema"
import {validateMiddleware} from "../../middlewares/validate.middleware"
import { authMiddleware } from "../../middlewares/auth.middleware";
const router = Router();

router.post("/typecompetence", validateMiddleware(typeCompetenceSchema),createTypeCompetenceController);
router.get("/typecompetence",authMiddleware, getTypesCompetenceController);
// ✅ Route pour récupérer les types de compétences avec leurs compétences
router.get("/with-competences", getTypesCompetenceWithCompetencesController);
// ✅ Modifier
router.put("/typecompetence:id", validateMiddleware(typeCompetenceSchema),authMiddleware,updateTypeCompetenceController);
router.get("/name/:nom", getTypeCompetenceByNameController);
// ✅ Supprimer
router.delete("/typecompetence:id",authMiddleware, deleteTypeCompetenceController)
export default router;
