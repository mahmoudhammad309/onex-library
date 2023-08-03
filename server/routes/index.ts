import { Router } from 'express';
import dummyRoute from './dummyRoute';
import authRouter from './authRouter'
import bookRouter from './bookRouter'
const router = Router();
router.use(authRouter);
router.use(bookRouter);
router.use(dummyRoute);

export default router;