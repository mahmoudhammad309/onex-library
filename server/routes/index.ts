import { Router } from 'express';
import dummyRoute from './dummyRoute';
import authRouter from './authRouter'

const router = Router();
router.use(authRouter);
router.use(dummyRoute);

export default router;