import { Router } from "express";
import * as profileController from "./profile.controller";
import { createProfileSchema, updateProfileSchema } from "./profile.schema";
import { validateMiddleware } from "../../middlewares/validate.middleware";
import { authMiddleware, authorizeUserResource } from "../../middlewares/auth.middleware";
const router = Router();

router.post("/profiles", validateMiddleware(createProfileSchema), authMiddleware, authorizeUserResource, profileController.createProfileController);
router.get("/profiles/:userId", authMiddleware, authorizeUserResource, profileController.getProfileController);
router.put("/profiles/:userId", validateMiddleware(updateProfileSchema), authMiddleware, authorizeUserResource, profileController.updateProfileController);
router.delete("/profiles/:userId", authMiddleware, authorizeUserResource, profileController.deleteProfileController);

export default router;
