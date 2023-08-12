import { Router } from "express";

import { signup, login, signOut, userData } from "../controllers";
import errorWrapper from "../helpers/errorHandler/errorWrapper";

const router = Router();

router.post("/sign-up", errorWrapper(signup));
router.post("/login", errorWrapper(login));
router.post("/sign-out", errorWrapper(signOut));
router.post("/user", errorWrapper(userData));

export default router;
