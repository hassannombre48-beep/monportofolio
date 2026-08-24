import { Router } from "express";
import {
  createCategorieProjetController,
  getCategoriesProjetController,
  getProjetsByCategorieController,updateCategorieProjetController,
  deleteCategorieProjetController
} from "./categorieprojet.controller";
import { categorieProjetSchema } from "./categorieprojet.schema";
import { validateMiddleware } from "../../middlewares/validate.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
const router = Router();

router.post("/categories", validateMiddleware(categorieProjetSchema), authMiddleware, createCategorieProjetController);
router.get("/categories", getCategoriesProjetController);
router.get("/categories/:id/projets", getProjetsByCategorieController);
router.put("/categories/:id", validateMiddleware(categorieProjetSchema), authMiddleware, updateCategorieProjetController);
router.delete("/categories/:id", authMiddleware, deleteCategorieProjetController);

export default router;
