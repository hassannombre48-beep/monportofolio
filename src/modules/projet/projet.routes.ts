import { Router } from "express";
import {
  createProjetController,
  getProjetsController,updateProjetController,
  deleteProjetController,getProjetsByTitreController
} from "./projet.controller";
import {projetSchema} from "./projet.schema"
import {validateMiddleware} from "../../middlewares/validate.middleware"
import { authMiddleware } from "../../middlewares/auth.middleware";
const router = Router();

router.post("projet/",validateMiddleware(projetSchema),authMiddleware, createProjetController);
router.get("projet/", authMiddleware,getProjetsController);
router.put("projet/:id", validateMiddleware(projetSchema),authMiddleware,updateProjetController);    // ✅ Modifier
router.delete("projet/:id", authMiddleware,deleteProjetController); // ✅ Supprimer
// ✅ Route pour récupérer un projet par son nom
router.get("/projet/:titre", getProjetsByTitreController);
export default router;
