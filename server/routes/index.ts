import { Router } from "express";
import authRouter from "./authRouter";
import bookRouter from "./bookRouter";

const router = Router();

router.use(authRouter);
router.use(bookRouter);

export default router;
