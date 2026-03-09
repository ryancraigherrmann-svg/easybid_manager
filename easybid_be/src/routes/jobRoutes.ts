import { Router, Request, Response } from 'express';
import { getAllJobs, createJob } from '../services/jobService';
import { prisma } from '../prisma';

const router = Router();

router.get('/jobs', async (_req: Request, res: Response) => {
  try {
    const jobs = await getAllJobs(prisma);
    res.json(jobs);
  } catch (err) {
    console.error('GET /api/jobs error', err);
    res.status(500).json({ error: String(err) });
  }
});

router.post('/jobs', async (req: Request, res: Response) => {
  try {
    const input = req.body;
    const created = await createJob(prisma, input);
    res.status(201).json(created);
  } catch (err) {
    console.error('POST /api/jobs error', err);
    res.status(400).json({ error: String(err) });
  }
});

export default router;
