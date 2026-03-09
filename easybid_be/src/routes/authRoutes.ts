import express from 'express';
import { createUser, findUserByEmail, verifyPassword } from '../services/authService';
import { signToken } from '../utils/jwt';
import { verifyToken } from '../utils/jwt';
import { prisma } from '../prisma';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, firstName, lastName, company } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const existing = await findUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'User already exists' });

    const user = await createUser(email, password, firstName, lastName, company);
    const token = signToken({ userId: user.id, email: user.email });
    res.json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, companyId: (user as any).companyId ?? null }, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'invalid credentials' });

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });

    const token = signToken({ userId: user.id, email: user.email });
    res.json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, companyId: (user as any).companyId ?? null }, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

// GET /api/me -> returns current user (from Bearer token) and company name
router.get('/me', async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'authorization required' });
    const token = auth.slice('Bearer '.length).trim();
    const payload = verifyToken<{ userId: number }>(token);
    if (!payload || !payload.userId) return res.status(401).json({ error: 'invalid token' });

    const user = await prisma.user.findUnique({ where: { id: payload.userId }, include: { company: true } });
    if (!user) return res.status(404).json({ error: 'user not found' });

    const displayName = user.firstName || user.lastName ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() : user.email;
    res.json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, displayName, companyId: user.companyId ?? null }, company: user.company ? { id: user.company.id, name: user.company.name } : null });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

export default router;
