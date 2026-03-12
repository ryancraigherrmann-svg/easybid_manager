import express from 'express';
import { createUser, findUserByEmail, verifyPassword, verifyEmail, resendVerification } from '../services/authService';
import { signToken } from '../utils/jwt';
import { verifyToken } from '../utils/jwt';
import { prisma } from '../prisma';
import { sendVerificationEmail } from '../services/emailService';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, firstName, lastName, company } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const existing = await findUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'User already exists' });

    const user = await createUser(email, password, firstName, lastName, company);
    const token = signToken({ userId: user.id, email: user.email });

    // Send verification email
    const appUrl = process.env.APP_URL || 'http://localhost:5173';
    const verificationUrl = `${appUrl}/verify-email?token=${(user as any).verificationToken}`;
    try {
      await sendVerificationEmail(email, firstName ?? null, verificationUrl);
    } catch (emailErr) {
      console.error('Failed to send verification email:', emailErr);
      // Don't block signup if email fails
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        companyId: (user as any).companyId ?? null,
        isAdmin: (user as any).isAdmin ?? false,
        emailVerified: (user as any).emailVerified ?? false,
      },
      token,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

// GET /api/verify-email?token=...  — verifies the email address
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== 'string') {
      return res.status(400).json({ error: 'Missing verification token' });
    }
    const result = await verifyEmail(token);
    if (result.success) {
      return res.json({ success: true, message: result.message });
    }
    return res.status(400).json({ success: false, error: result.message });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

// POST /api/resend-verification  — resends the verification email
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'email required' });

    const { verificationToken, firstName } = await resendVerification(email);
    if (!verificationToken) {
      // Don't reveal whether user exists — just say OK
      return res.json({ success: true, message: 'If this email is registered, a verification email has been sent.' });
    }

    const appUrl = process.env.APP_URL || 'http://localhost:5173';
    const verificationUrl = `${appUrl}/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(email, firstName, verificationUrl);

    res.json({ success: true, message: 'Verification email sent.' });
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
    res.json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, companyId: (user as any).companyId ?? null, isAdmin: (user as any).isAdmin ?? false, emailVerified: (user as any).emailVerified ?? false }, token });
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
    res.json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, displayName, companyId: user.companyId ?? null, isAdmin: (user as any).isAdmin ?? false, emailVerified: (user as any).emailVerified ?? false }, company: user.company ? { id: user.company.id, name: user.company.name } : null });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

export default router;
