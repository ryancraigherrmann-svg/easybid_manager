import { PrismaClient } from '../generated/prisma/client';
import { prisma as defaultPrisma } from '../prisma';

function resolveJobModel(prisma: PrismaClient | any) {
  if (!prisma) return undefined;
  if (prisma.job) return prisma.job;
  if (prisma.Job) return prisma.Job;
  const key = Object.keys(prisma).find((k) => k.toLowerCase() === 'job');
  return key ? (prisma as any)[key] : undefined;
}

function resolveRFPModel(prisma: PrismaClient | any) {
  if (!prisma) return undefined;
  if (prisma.rfp) return prisma.rfp;
  if (prisma.RFP) return prisma.RFP;
  const key = Object.keys(prisma).find((k) => k.toLowerCase() === 'rfp');
  return key ? (prisma as any)[key] : undefined;
}

export async function getAllJobs(prisma: PrismaClient | any) {
  const jobModel = resolveJobModel(prisma);
  if (jobModel && typeof jobModel.findMany === 'function') {
    return jobModel.findMany({ orderBy: { startDate: 'desc' } });
  }

  if (prisma && prisma.$queryRawUnsafe) {
    // fallback raw query; table name/quoting must match your DB
    return prisma.$queryRawUnsafe('SELECT * FROM "Job" ORDER BY "startDate" DESC');
  }

  throw new Error('Prisma client not available or job model missing');
}

export async function createJob(prisma: PrismaClient | any, input: any) {
  const jobModel = resolveJobModel(prisma);
  if (jobModel && typeof jobModel.create === 'function') {
    // If an rfpId is provided, ensure the referenced RFP exists to avoid a DB FK error
    if (input && input.rfpId != null) {
      const rfpModel = resolveRFPModel(prisma);
      if (rfpModel && typeof rfpModel.findUnique === 'function') {
        const found = await rfpModel.findUnique({ where: { id: input.rfpId } });
        if (!found) throw new Error(`Referenced RFP not found with id=${input.rfpId}`);
      }
    }

    return jobModel.create({ data: input });
  }

  // Try the default imported Prisma client as a fallback
  const fallbackJobModel = resolveJobModel(defaultPrisma);
  if (fallbackJobModel && typeof fallbackJobModel.create === 'function') {
    return fallbackJobModel.create({ data: input });
  }

  const prismaInfo = prisma ? Object.keys(prisma).slice(0, 10) : 'undefined';
  throw new Error(`Prisma client not available or job model missing; prisma keys: ${JSON.stringify(prismaInfo)}`);
}
