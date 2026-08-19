import { Router } from "express";
import { registerController, loginController, refreshController } from "./auth.controller";
import {registerSchema,loginSchema,refreshSchema} from "./auth.schema"
import {validateMiddleware} from "../../middlewares/validate.middleware"
import { authMiddleware } from "../../middlewares/auth.middleware";
const router = Router();
router.post("/register", validateMiddleware(registerSchema), registerController);
router.post("/login", validateMiddleware(loginSchema), loginController);
router.post("/refresh", validateMiddleware(refreshSchema), refreshController);

export default router;
