import { Router } from "express";
import {
  createExperienceController,
  getExperiencesController, updateExperienceController,
  deleteExperienceController
} from "./experience.controller";
import {experienceSchema} from "./experience.schema"
import {validateMiddleware} from "../../middlewares/validate.middleware"
import { authMiddleware } from "../../middlewares/auth.middleware";
const router = Router();

router.post("/experiences", validateMiddleware(experienceSchema), authMiddleware, createExperienceController);
router.get("/experiences", getExperiencesController);
router.put("/experiences/:id", validateMiddleware(experienceSchema), authMiddleware, updateExperienceController);
router.delete("/experiences/:id", authMiddleware, deleteExperienceController);

export default router;
