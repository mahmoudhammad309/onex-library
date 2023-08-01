import { Router } from 'express';
import dummyRoute from './dummyRoute';


const router = Router();
router.use(dummyRoute);

export default router;