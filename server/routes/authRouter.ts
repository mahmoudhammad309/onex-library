import { Router } from "express";

import { signup, login } from "../controllers";
import errorWrapper from "../helpers/errorHandler/errorWrapper";

const router = Router();

router.post("/sign-up", errorWrapper(signup));
router.post("/login", errorWrapper(login));

export default router;
