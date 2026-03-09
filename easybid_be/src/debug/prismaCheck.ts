import { prisma } from '../prisma';

function safeKeys(obj: any) {
  try { return Object.keys(obj || {}).slice(0, 50); } catch { return [] }
}

async function tryCall(modelOwner: any, name: string) {
  try {
    if (modelOwner && modelOwner[name] && typeof modelOwner[name].findMany === 'function') {
      const rows = await modelOwner[name].findMany({ take: 1 });
      console.log(`${name}.findMany succeeded, sample rows count:`, Array.isArray(rows) ? rows.length : typeof rows);
      return true;
    }
  } catch (e) {
    console.error(`Error calling ${name}.findMany:`, e && (e as any).message ? (e as any).message : e);
  }
  return false;
}

async function check() {
  console.log('Prisma keys preview:', safeKeys(prisma));
  console.log('prisma.job exists?', !!(prisma as any).job);

  // Inspect possible wrapped client
  const orig = (prisma as any)._originalClient;
  console.log('_originalClient keys preview:', safeKeys(orig));

  // Inspect prototype descriptors for 'job'
  try {
    const proto = Object.getPrototypeOf(prisma);
    console.log('prototype keys preview:', safeKeys(proto));
    const desc = proto ? Object.getOwnPropertyDescriptor(proto, 'job') : undefined;
    console.log('prototype has getter for job?', !!(desc && typeof desc.get === 'function'));
  } catch (e) {
    console.warn('Error inspecting prototype:', e && (e as any).message ? (e as any).message : e);
  }

  try {
    await prisma.$connect();
    console.log('Connected to DB');

    // Try direct
    const direct = await tryCall(prisma, 'job');
    if (!direct && orig) {
      console.log('Trying _originalClient...');
      await tryCall(orig, 'job');
    }

  } catch (e) {
    console.error('Error while checking prisma.job:', e && (e as any).message ? (e as any).message : e);
  } finally {
    try { await prisma.$disconnect(); } catch {}
  }
}

check().catch((e) => {
  console.error('prismaCheck failed:', e);
  process.exit(1);
});
