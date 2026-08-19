import { Router } from "express";
import {
  createTagController,
  getTagsController,
  updateTagController,
  deleteTagController
} from "./tag.controller";

import {tagSchema} from "./tag.schema"
import {validateMiddleware} from "../../middlewares/validate.middleware"
import { authMiddleware } from "../../middlewares/auth.middleware";
const router = Router();

router.post("/tag", validateMiddleware(tagSchema),authMiddleware,createTagController);
router.get("/tag", getTagsController);
router.put("/tage:id",validateMiddleware(tagSchema),authMiddleware, updateTagController);    // ✅ Modifier
router.delete("/tag:id",authMiddleware, deleteTagController); // ✅ Supprimer

export default router;
