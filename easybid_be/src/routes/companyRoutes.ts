import { Router } from 'express';
import { prisma } from '../prisma';
import { verifyToken } from '../utils/jwt';

const router = Router();

// Middleware to extract authenticated user from JWT
async function requireAuth(req: any, res: any, next: any) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'authorization required' });
  const token = auth.slice('Bearer '.length).trim();
  const payload = verifyToken<{ userId: number; email: string }>(token);
  if (!payload || !payload.userId) return res.status(401).json({ error: 'invalid token' });
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) return res.status(404).json({ error: 'user not found' });
  (req as any).authUser = user;
  next();
}

// GET /api/company/:id/users
router.get('/company/:id/users', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: 'company id required' });

    const users = await prisma.user.findMany({
      where: { companyId: id },
      select: { email: true, id: true, isAdmin: true, firstName: true, lastName: true },
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
      select: { email: true, id: true, isAdmin: true, firstName: true, lastName: true },
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
      select: { email: true, id: true, isAdmin: true, firstName: true, lastName: true },
    });

    res.json({ company, users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

// Toggle admin status for a user in the same company (admin-only)
router.put('/company/users/:userId/admin', requireAuth, async (req: any, res) => {
  try {
    const authUser = req.authUser;
    if (!authUser.isAdmin) {
      return res.status(403).json({ error: 'Only admins can change admin status' });
    }

    const targetUserId = Number(req.params.userId);
    if (!targetUserId) return res.status(400).json({ error: 'user id required' });

    const targetUser = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (!targetUser) return res.status(404).json({ error: 'user not found' });

    // Ensure both users are in the same company
    if (!authUser.companyId || authUser.companyId !== targetUser.companyId) {
      return res.status(403).json({ error: 'Can only manage users in your own company' });
    }

    // Prevent removing your own admin status
    if (authUser.id === targetUserId) {
      return res.status(400).json({ error: 'Cannot change your own admin status' });
    }

    const { isAdmin } = req.body;
    if (typeof isAdmin !== 'boolean') {
      return res.status(400).json({ error: 'isAdmin (boolean) required in body' });
    }

    const updated = await prisma.user.update({
      where: { id: targetUserId },
      data: { isAdmin },
      select: { id: true, email: true, isAdmin: true, firstName: true, lastName: true },
    });

    res.json({ user: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

export default router;
