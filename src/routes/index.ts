import { Router } from 'express';
import JobsRouter from './Jobs.route'

const router = Router();

router.use('/jobs', JobsRouter);

export default router;