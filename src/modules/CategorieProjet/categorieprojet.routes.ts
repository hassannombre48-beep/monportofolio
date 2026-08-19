import { Router } from "express";
import {
  createCategorieProjetController,
  getCategoriesProjetController,
  getProjetsByCategorieController,updateCategorieProjetController,
  deleteCategorieProjetController
} from "./categorieprojet.controller";
import {categorieProjetSchema} from "./categorieprojet.schema"
import {validateMiddleware} from "../../middlewares/validate.middleware"
import { authMiddleware } from "../../middlewares/auth.middleware";
const router = Router();

router.post("createcategories/",validateMiddleware(categorieProjetSchema),authMiddleware, createCategorieProjetController);
router.get("createcategories/", getCategoriesProjetController);
router.get("createcategories/:id/projets", getProjetsByCategorieController);
router.put("createcategories/:id",validateMiddleware(categorieProjetSchema) ,authMiddleware,updateCategorieProjetController);    // ✅ Modifier
router.delete("createcategories/:id", authMiddleware,deleteCategorieProjetController); // ✅ Supprimer

export default router;
