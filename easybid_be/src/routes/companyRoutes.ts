import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

// GET /api/company/:id/users
router.get('/company/:id/users', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: 'company id required' });

    const users = await prisma.user.findMany({
      where: { companyId: id },
      select: { email: true, id: true },
    });

    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

// GET /api/company/:id  -> returns company details + users
router.get('/company/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: 'company id required' });

    const company = await prisma.company.findUnique({
      where: { id },
      select: { id: true, name: true, type: true, typeOfWork: true, createdAt: true, updatedAt: true },
    });

    const users = await prisma.user.findMany({
      where: { companyId: id },
      select: { email: true, id: true },
    });

    res.json({ company, users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

// Legacy: GET /api/company/by-name/:name -> returns company details + users by company name
router.get('/company/by-name/:name', async (req, res) => {
  try {
    const name = req.params.name;
    if (!name) return res.status(400).json({ error: 'company name required' });

    const company = await prisma.company.findFirst({
      where: { name },
      select: { id: true, name: true, type: true, typeOfWork: true, createdAt: true, updatedAt: true },
    });

    const users = await prisma.user.findMany({
      where: { companyId: company?.id ?? undefined },
      select: { email: true, id: true },
    });

    res.json({ company, users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

export default router;
