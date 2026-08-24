
import { Router } from "express";
import {
  createUtilisateurController,
  getUtilisateurByIdController,
  getUtilisateursController, updateUtilisateurController,
  deleteUtilisateurController
} from "./utilisateur.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { utilisateurSchema } from "./utilisateur.schema";
import { validateMiddleware } from "../../middlewares/validate.middleware";
const router = Router();

router.post("/users",validateMiddleware(utilisateurSchema),authMiddleware, createUtilisateurController);
router.get("/users/:id", authMiddleware,getUtilisateurByIdController);
router.get("/users/", getUtilisateursController);
router.put("/users/:id", validateMiddleware(utilisateurSchema),authMiddleware,updateUtilisateurController);   // ✅ Modifier
router.delete("/users/:id",authMiddleware, deleteUtilisateurController); // ✅ Supprimer

export default router;
