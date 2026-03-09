import 'dotenv/config';
import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL as string;

// Create pool with explicit SSL for production (RDS requires SSL)
const pool = new pg.Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : undefined,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
