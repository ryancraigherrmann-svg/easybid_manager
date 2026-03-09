import { prisma } from './prisma';

export type Context = {
  // Use a permissive type here because generated Prisma types may differ
  // in the current workspace setup. Narrow this later if you regenerate
  // the client so TypeScript has the correct model typings.
  prisma: any;
};

export const context: Context = {
  prisma: prisma as any,
};
