import { prisma } from './prisma';

export type AuthUser = {
  userId: number;
  email: string;
  companyId: number | null;
  companyName: string | null;
  isAdmin: boolean;
  displayName: string;
  companyEmails: string[];  // all emails of users in the same company (for admin filtering)
};

export type Context = {
  // Use a permissive type here because generated Prisma types may differ
  // in the current workspace setup. Narrow this later if you regenerate
  // the client so TypeScript has the correct model typings.
  prisma: any;
  user: AuthUser | null;
};

export const context: Context = {
  prisma: prisma as any,
  user: null,
};
