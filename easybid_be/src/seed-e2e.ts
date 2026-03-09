/**
 * E2E Seed Script — populates the database with realistic test data
 * so every chart, table, and Gantt view has plenty to display.
 *
 * Usage (from inside the backend container or locally):
 *   npx ts-node src/seed-e2e.ts
 *
 * Or via docker compose:
 *   docker compose exec backend npx ts-node src/seed-e2e.ts
 *
 * The script is idempotent-ish: it checks for the seed user and skips
 * if data already exists. Pass --force to wipe and re-seed.
 */

import { prisma } from './prisma';
import * as bcrypt from 'bcryptjs';

// ─── CONFIG ──────────────────────────────────────────────
const FORCE = process.argv.includes('--force');

const SEED_PASSWORD = 'password123';
const SEED_USER_EMAIL = 'demo@ezbidmanager.com';

// Companies (contractors / vendors)
const COMPANIES = [
  { name: 'Ace Roofing',       type: 'Contractor',   typeOfWork: 'Roofing' },
  { name: 'SteelFrame Co.',    type: 'Contractor',   typeOfWork: 'Structural Steel' },
  { name: 'ProPlumb LLC',      type: 'Subcontractor', typeOfWork: 'Plumbing' },
  { name: 'BrightSpark Elec.', type: 'Subcontractor', typeOfWork: 'Electrical' },
  { name: 'GreenScape Design', type: 'Vendor',       typeOfWork: 'Landscaping' },
  { name: 'ClearView Glass',   type: 'Vendor',       typeOfWork: 'Glazing' },
  { name: 'ConcretePros',      type: 'Contractor',   typeOfWork: 'Foundations' },
  { name: 'TileWorks Inc.',    type: 'Subcontractor', typeOfWork: 'Tile & Flooring' },
];

// Users — one per company + the demo user
const USERS = [
  { email: SEED_USER_EMAIL,             firstName: 'Demo',    lastName: 'Admin',    companyIdx: 0 },
  { email: 'john@aceroofing.com',       firstName: 'John',    lastName: 'Carter',   companyIdx: 0 },
  { email: 'maria@steelframe.com',      firstName: 'Maria',   lastName: 'Lopez',    companyIdx: 1 },
  { email: 'bob@proplumb.com',          firstName: 'Bob',     lastName: 'Williams', companyIdx: 2 },
  { email: 'sara@brightspark.com',      firstName: 'Sara',    lastName: 'Chen',     companyIdx: 3 },
  { email: 'alex@greenscape.com',       firstName: 'Alex',    lastName: 'Nguyen',   companyIdx: 4 },
  { email: 'dana@clearview.com',        firstName: 'Dana',    lastName: 'Roberts',  companyIdx: 5 },
  { email: 'mike@concretepros.com',     firstName: 'Mike',    lastName: 'Turner',   companyIdx: 6 },
  { email: 'lisa@tileworks.com',        firstName: 'Lisa',    lastName: 'Evans',    companyIdx: 7 },
];

// Job types
const JOB_TYPES = [
  'Roofing', 'Plumbing', 'Electrical', 'HVAC', 'Landscaping',
  'Foundations', 'Glazing', 'Tile & Flooring', 'Painting', 'Drywall',
];

// ─── HELPERS ─────────────────────────────────────────────
function daysAgo(days: number) {
  return new Date(Date.now() - days * 86_400_000);
}

function daysFromNow(days: number) {
  return new Date(Date.now() + days * 86_400_000);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randBetween(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min));
}

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

// ─── MAIN ────────────────────────────────────────────────
async function main() {
  console.log('🌱  E2E Seed Script starting…');

  // Check for existing seed data
  const existingUser = await prisma.user.findUnique({ where: { email: SEED_USER_EMAIL } });
  if (existingUser && !FORCE) {
    console.log('⚠️  Seed data already exists. Pass --force to wipe & re-seed.');
    process.exit(0);
  }

  if (FORCE) {
    console.log('🗑️  --force: wiping existing data…');
    await prisma.bidLineItem.deleteMany();
    await prisma.bidPosting.deleteMany();
    await prisma.bid.deleteMany();
    await prisma.job.deleteMany();
    await prisma.rFP.deleteMany();
    await prisma.emailGroup.deleteMany();
    await prisma.user.deleteMany();
    await prisma.company.deleteMany();
    console.log('   Done wiping.');
  }

  // ── 1. Companies ───────────────────────────────────────
  console.log('📦  Creating companies…');
  const companyRecords = [];
  for (const c of COMPANIES) {
    const rec = await prisma.company.create({ data: c });
    companyRecords.push(rec);
  }

  // ── 2. Users ───────────────────────────────────────────
  console.log('👤  Creating users…');
  const hash = await bcrypt.hash(SEED_PASSWORD, 10);
  const userRecords = [];
  for (const u of USERS) {
    const rec = await prisma.user.create({
      data: {
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        passwordHash: hash,
        companyId: companyRecords[u.companyIdx].id,
        isAdmin: u.email === SEED_USER_EMAIL,
      },
    });
    userRecords.push(rec);
  }
  console.log(`   Demo login: ${SEED_USER_EMAIL} / ${SEED_PASSWORD}`);

  // ── 3. Email Groups ───────────────────────────────────
  console.log('📧  Creating email groups…');
  const roofingGroup = await prisma.emailGroup.create({
    data: {
      name: 'Roofing Vendors',
      company: String(companyRecords[0].id),
      emails: ['john@aceroofing.com', 'vendor1@roof.com', 'vendor2@roof.com'],
    },
  });
  const generalGroup = await prisma.emailGroup.create({
    data: {
      name: 'All Contractors',
      company: String(companyRecords[0].id),
      emails: USERS.map(u => u.email),
    },
  });

  // ── 4. RFPs — spread across the last 12 weeks ─────────
  console.log('📄  Creating RFPs…');
  interface RFPDef {
    title: string;
    description: string;
    jobType: string;
    status: number;
    daysAgoCreated: number;
    bidsDueDaysAgo: number;
    company: string;
    user: string;
  }

  const rfpDefs: RFPDef[] = [
    // Week 11-12 ago (oldest)
    { title: 'Warehouse Roof Replacement',        description: 'Full tear-off and reroof of 40,000 sq ft warehouse.',       jobType: 'Roofing',        status: 4, daysAgoCreated: 80, bidsDueDaysAgo: 65, company: 'Ace Roofing',       user: 'Demo Admin' },
    { title: 'Office Plumbing Retrofit',           description: 'Retrofit plumbing for 3-story office building.',            jobType: 'Plumbing',       status: 4, daysAgoCreated: 78, bidsDueDaysAgo: 63, company: 'Ace Roofing',       user: 'Demo Admin' },

    // Week 9-10 ago
    { title: 'Parking Garage Lighting Upgrade',    description: 'LED conversion for 500-space parking structure.',           jobType: 'Electrical',     status: 4, daysAgoCreated: 68, bidsDueDaysAgo: 55, company: 'Ace Roofing',       user: 'John Carter' },
    { title: 'Lobby Glass Wall Installation',      description: 'Install 20ft glass curtain wall in main lobby.',            jobType: 'Glazing',        status: 4, daysAgoCreated: 65, bidsDueDaysAgo: 52, company: 'Ace Roofing',       user: 'Demo Admin' },
    { title: 'Foundation Repair — Building C',     description: 'Structural foundation repair and waterproofing.',           jobType: 'Foundations',    status: 4, daysAgoCreated: 62, bidsDueDaysAgo: 50, company: 'Ace Roofing',       user: 'Demo Admin' },

    // Week 7-8 ago
    { title: 'Exterior Landscaping Phase 1',       description: 'Irrigation, sod, and tree planting for campus perimeter.',  jobType: 'Landscaping',    status: 3, daysAgoCreated: 55, bidsDueDaysAgo: 40, company: 'Ace Roofing',       user: 'Demo Admin' },
    { title: 'Restroom Tile Renovation',           description: 'Remove and replace tile in 12 restrooms.',                 jobType: 'Tile & Flooring',status: 3, daysAgoCreated: 52, bidsDueDaysAgo: 38, company: 'Ace Roofing',       user: 'John Carter' },
    { title: 'HVAC System — Bldg A',              description: 'Full HVAC replacement for 30,000 sq ft office.',           jobType: 'HVAC',           status: 3, daysAgoCreated: 50, bidsDueDaysAgo: 36, company: 'Ace Roofing',       user: 'Demo Admin' },

    // Week 5-6 ago
    { title: 'Interior Painting — Floors 2-5',    description: 'Prep and paint 40 offices and common areas.',              jobType: 'Painting',       status: 2, daysAgoCreated: 40, bidsDueDaysAgo: 20, company: 'Ace Roofing',       user: 'Demo Admin' },
    { title: 'Drywall Install — New Wing',         description: 'Frame and finish drywall in 15,000 sq ft expansion.',      jobType: 'Drywall',        status: 2, daysAgoCreated: 38, bidsDueDaysAgo: 18, company: 'Ace Roofing',       user: 'Demo Admin' },
    { title: 'Roof Inspection & Maintenance',      description: 'Annual inspection and preventive maintenance.',            jobType: 'Roofing',        status: 2, daysAgoCreated: 35, bidsDueDaysAgo: 15, company: 'Ace Roofing',       user: 'John Carter' },

    // Week 3-4 ago
    { title: 'Emergency Generator Installation',   description: 'Install 500kW backup generator with ATS.',                 jobType: 'Electrical',     status: 2, daysAgoCreated: 25, bidsDueDaysAgo: 10, company: 'Ace Roofing',       user: 'Demo Admin' },
    { title: 'Concrete Sidewalk Replacement',      description: 'Remove and pour 2,000 linear feet of sidewalk.',           jobType: 'Foundations',    status: 2, daysAgoCreated: 22, bidsDueDaysAgo: 8,  company: 'Ace Roofing',       user: 'Demo Admin' },

    // Week 1-2 ago (most recent)
    { title: 'Kitchen Plumbing — Café Build-Out', description: 'Rough-in and finish plumbing for new café.',              jobType: 'Plumbing',       status: 1, daysAgoCreated: 10, bidsDueDaysAgo: -5, company: 'Ace Roofing',       user: 'Demo Admin' },
    { title: 'Solar Panel Wiring',                 description: 'Electrical wiring for 200-panel rooftop solar array.',     jobType: 'Electrical',     status: 1, daysAgoCreated: 7,  bidsDueDaysAgo: -8, company: 'Ace Roofing',       user: 'Demo Admin' },
    { title: 'Landscape Maintenance Contract',     description: 'Ongoing weekly landscape maintenance starting Q2.',        jobType: 'Landscaping',    status: 1, daysAgoCreated: 3,  bidsDueDaysAgo: -14,company: 'Ace Roofing',       user: 'Demo Admin' },
  ];

  const rfpRecords = [];
  for (const def of rfpDefs) {
    const createdAt = daysAgo(def.daysAgoCreated);
    const rec = await prisma.rFP.create({
      data: {
        title: def.title,
        description: def.description,
        jobType: def.jobType,
        status: def.status,
        originalCompany: def.company,
        User: def.user,
        startDate: createdAt,
        bidsDueDate: daysAgo(def.bidsDueDaysAgo),
        emailGroupId: Math.random() > 0.5 ? roofingGroup.id : generalGroup.id,
        emailList: ['vendor@example.com'],
        createdAt,
        updatedAt: createdAt,
      },
    });
    rfpRecords.push({ ...rec, _def: def });
  }

  // ── 5. Bids — 2-5 bids per RFP (except drafts) ────────
  console.log('💰  Creating bids…');
  const bidRecords: any[] = [];
  const biddingCompanies = COMPANIES.slice(1); // everyone except Ace Roofing (the owner)

  for (const rfp of rfpRecords) {
    if (rfp._def.status === 1) continue; // drafts have no bids yet

    const numBids = randBetween(2, 5);
    const shuffled = [...biddingCompanies].sort(() => Math.random() - 0.5).slice(0, numBids);

    for (let i = 0; i < shuffled.length; i++) {
      const co = shuffled[i];
      const amount = randBetween(8000, 185000);
      const isApproved = rfp._def.status === 4 && i === 0; // first bid wins on closed RFPs
      const bidCreatedAt = new Date(rfp.createdAt.getTime() + randBetween(1, 10) * 86_400_000);

      const bid = await prisma.bid.create({
        data: {
          amount,
          approved: isApproved,
          company: co.name,
          user: `${pick(['Tom','Jane','Rick','Amy','Carlos','Nina'])}@${co.name.toLowerCase().replace(/[^a-z]/g, '')}.com`,
          info: `Bid from ${co.name} for "${rfp.title}"`,
          rfpId: rfp.id,
          expectedDate: daysFromNow(randBetween(5, 90)),
          createdAt: bidCreatedAt,
          updatedAt: bidCreatedAt,
        },
      });

      // Add 2-4 line items per bid
      const lineItemCount = randBetween(2, 4);
      const lineLabels = ['Labor', 'Materials', 'Equipment Rental', 'Permits & Fees', 'Overhead', 'Delivery'];
      const chosenLabels = [...lineLabels].sort(() => Math.random() - 0.5).slice(0, lineItemCount);
      let remaining = amount;
      for (let li = 0; li < chosenLabels.length; li++) {
        const isLast = li === chosenLabels.length - 1;
        const lineAmt = isLast ? remaining : Math.round(remaining * (Math.random() * 0.5 + 0.1));
        remaining -= lineAmt;
        await prisma.bidLineItem.create({
          data: {
            bidId: bid.id,
            description: chosenLabels[li],
            amount: lineAmt,
          },
        });
      }

      // Add a posting for ~40% of bids
      if (Math.random() < 0.4) {
        await prisma.bidPosting.create({
          data: {
            bidId: bid.id,
            description: `Posting for ${co.name} bid`,
            type: pick(['Material List', 'Scope Clarification', 'Alternate']),
            company: co.name,
          },
        });
      }

      bidRecords.push({ ...bid, _companyName: co.name, _rfp: rfp });
    }
  }

  // ── 6. Jobs — one per status-4 RFP (from the winning bid) ──
  console.log('🔨  Creating jobs…');
  const closedRFPs = rfpRecords.filter(r => r._def.status === 4);
  const jobRecords = [];
  for (const rfp of closedRFPs) {
    const winningBid = bidRecords.find(b => b.rfpId === rfp.id && b.approved);
    const startOffset = randBetween(5, 30);
    const jobCreatedAt = new Date(rfp.createdAt.getTime() + startOffset * 86_400_000);
    const rec = await prisma.job.create({
      data: {
        title: rfp.title,
        description: rfp._def.description,
        rfpId: rfp.id,
        jobType: rfp._def.jobType,
        startDate: isoDate(jobCreatedAt),
        daysExpected: randBetween(14, 120),
        company: winningBid?._companyName ?? 'Ace Roofing',
        createdAt: jobCreatedAt,
        updatedAt: jobCreatedAt,
      },
    });
    jobRecords.push(rec);
  }

  // Also add a few standalone jobs (not linked to an RFP)
  const standaloneJobs = [
    { title: 'Annual Fire Alarm Testing',    jobType: 'Electrical',  days: 3,  ago: 20, company: 'BrightSpark Elec.' },
    { title: 'Parking Lot Restriping',       jobType: 'Painting',    days: 5,  ago: 15, company: 'GreenScape Design' },
    { title: 'Elevator Maintenance Q1',      jobType: 'HVAC',        days: 7,  ago: 45, company: 'SteelFrame Co.' },
    { title: 'Water Heater Replacement',     jobType: 'Plumbing',    days: 2,  ago: 8,  company: 'ProPlumb LLC' },
    { title: 'Exterior Window Cleaning',     jobType: 'Glazing',     days: 4,  ago: 30, company: 'ClearView Glass' },
  ];
  for (const sj of standaloneJobs) {
    const createdAt = daysAgo(sj.ago);
    await prisma.job.create({
      data: {
        title: sj.title,
        description: `Standalone job — ${sj.title}`,
        jobType: sj.jobType,
        startDate: isoDate(createdAt),
        daysExpected: sj.days,
        company: sj.company,
        createdAt,
        updatedAt: createdAt,
      },
    });
  }

  // ── Summary ────────────────────────────────────────────
  const counts = {
    companies: companyRecords.length,
    users: userRecords.length,
    rfps: rfpRecords.length,
    bids: bidRecords.length,
    jobs: jobRecords.length + standaloneJobs.length,
  };
  console.log('\n✅  Seed complete!');
  console.log(`   Companies:  ${counts.companies}`);
  console.log(`   Users:      ${counts.users}`);
  console.log(`   RFPs:       ${counts.rfps}`);
  console.log(`   Bids:       ${counts.bids}`);
  console.log(`   Jobs:       ${counts.jobs}`);
  console.log(`\n   Login with: ${SEED_USER_EMAIL} / ${SEED_PASSWORD}`);
}

main()
  .catch((e) => {
    console.error('❌  Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
