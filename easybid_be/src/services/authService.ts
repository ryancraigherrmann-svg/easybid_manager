import { prisma } from '../prisma';
import bcrypt from 'bcryptjs';

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

  const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      companyId: companyId ?? null,
      passwordHash,
    },
  });
  return user;
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}
