import { Router } from "express";

import { AuthController } from "../controllers";
import errorWrapper from "../helpers/errorHandler/errorWrapper";

const router = Router();

router.post("/sign-up", errorWrapper(AuthController.signup));
router.post("/login", errorWrapper(AuthController.login));

export default router;
