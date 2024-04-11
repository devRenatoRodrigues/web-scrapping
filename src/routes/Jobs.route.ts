import { Router } from 'express';
import { JobsController } from '../controllers/Jobs.controller';

const router = Router();
const jobsController = new JobsController();

router.get('/', (req, res) => jobsController.getJobs(req, res));

router.post('/', (req, res) => jobsController.createJobs(req, res));

export default router;