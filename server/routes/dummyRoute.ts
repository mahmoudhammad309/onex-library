import { Router } from "express";

import { dummyController } from "../controllers";
import errorWrapper from "../helpers/errorHandler/errorWrapper";

const router = Router();

router.get("/dummy", errorWrapper(dummyController.index));

export default router;
