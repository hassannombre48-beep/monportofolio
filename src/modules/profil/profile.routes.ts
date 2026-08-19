import { Router } from "express";
import * as profileController from "./profile.controller";
import {createProfileSchema} from "./profile.schema"
import {validateMiddleware} from "../../middlewares/validate.middleware"
import { authMiddleware } from "../../middlewares/auth.middleware";
const router = Router();

router.post("/profiles",validateMiddleware(createProfileSchema),authMiddleware, profileController.createProfileController);
router.get("/profiles/:userId",authMiddleware, profileController.getProfileController);
router.put("/profiles/:userId",validateMiddleware(createProfileSchema),authMiddleware, profileController.updateProfileController);
router.delete("/profiles/:userId",authMiddleware,profileController.deleteProfileController);

export default router;
