import { prisma } from '../prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function createUser(email: string, password: string, firstName?: string, lastName?: string, company?: string) {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  let companyId: number | undefined = undefined;
  if (company) {
    const existing = await prisma.company.findFirst({ where: { name: company } });
    if (existing) companyId = existing.id;
    else {
      const created = await prisma.company.create({ data: { name: company } });
      companyId = created.id;
    }
  }

  // Generate email verification token (expires in 24 hours)
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      ...(companyId ? { company: { connect: { id: companyId } } } : {}),
      passwordHash,
      emailVerified: false,
      verificationToken,
      verificationExpiry,
    },
  });
  return user;
}

export async function verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
  const user = await prisma.user.findUnique({ where: { verificationToken: token } });

  if (!user) {
    return { success: false, message: 'Invalid verification token.' };
  }

  if (user.verificationExpiry && user.verificationExpiry < new Date()) {
    return { success: false, message: 'Verification link has expired. Please sign up again.' };
  }

  if (user.emailVerified) {
    return { success: true, message: 'Email already verified.' };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verificationToken: null,
      verificationExpiry: null,
    },
  });

  return { success: true, message: 'Email verified successfully!' };
}

export async function resendVerification(email: string): Promise<{ verificationToken: string | null; firstName: string | null }> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.emailVerified) return { verificationToken: null, firstName: null };

  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: { verificationToken, verificationExpiry },
  });

  return { verificationToken, firstName: user.firstName };
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}
