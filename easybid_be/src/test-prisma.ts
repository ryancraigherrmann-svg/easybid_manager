import { prisma } from './prisma';

(async function(){
  try{
    console.log('prisma:', typeof prisma);
    await prisma.$connect();
    console.log('connected');
    await prisma.$disconnect();
    console.log('disconnected');
  }catch(e){
    console.error('error:', e);
    process.exit(1);
  }
})();
