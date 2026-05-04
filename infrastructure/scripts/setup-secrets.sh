#!/bin/bash
# =============================================================================
# setup-secrets.sh — Create AWS Secrets Manager entries for EasyBid
#
# Run this ONCE before deploying infrastructure.
# It creates the secrets that ECS task definitions reference.
# =============================================================================
set -e

AWS_REGION="us-east-2"

echo "============================================"
echo "  EasyBid — Secrets Manager Setup"
echo "============================================"
echo ""

# ── Secret 1: DATABASE_URL ──
# This is the PostgreSQL connection string used by the backend (Prisma).
# Code reference: easybid_be/src/prisma.ts reads process.env.DATABASE_URL
echo "Setting up DATABASE_URL secret..."
echo "  IMPORTANT: Do NOT add ?sslmode=require to the URL."
echo "  SSL is handled by the pg driver in prisma.ts (ssl: { rejectUnauthorized: false })."
echo ""
read -p "Enter PostgreSQL connection string (postgresql://user:pass@host:5432/dbname): " DB_URL

if [ -z "$DB_URL" ]; then
  echo "ERROR: DATABASE_URL cannot be empty"
  exit 1
fi

aws secretsmanager create-secret \
  --name easybid/database-url \
  --description "PostgreSQL connection string for EasyBid backend (Prisma)" \
  --secret-string "$DB_URL" \
  --region $AWS_REGION 2>/dev/null || \
aws secretsmanager update-secret \
  --secret-id easybid/database-url \
  --secret-string "$DB_URL" \
  --region $AWS_REGION

echo "  ✓ easybid/database-url saved"

# ── Secret 2: JWT_SECRET ──
# Used by the backend to sign/verify JWT tokens for authentication.
# Code reference: easybid_be/src/utils/jwt.ts
echo ""
echo "Setting up JWT_SECRET..."
read -p "Enter JWT secret (or press Enter to auto-generate): " JWT_SECRET

if [ -z "$JWT_SECRET" ]; then
  JWT_SECRET=$(openssl rand -base64 32)
  echo "  Auto-generated JWT secret"
fi

aws secretsmanager create-secret \
  --name easybid/jwt-secret \
  --description "JWT signing secret for EasyBid authentication" \
  --secret-string "$JWT_SECRET" \
  --region $AWS_REGION 2>/dev/null || \
aws secretsmanager update-secret \
  --secret-id easybid/jwt-secret \
  --secret-string "$JWT_SECRET" \
  --region $AWS_REGION

echo "  ✓ easybid/jwt-secret saved"

# ── Secret 3: SMTP_USER ──
# Used by the backend email service (nodemailer) as SES SMTP username.
# This is usually an AWS access-key-like value generated for SES SMTP.
echo ""
echo "Setting up SMTP_USER (SES SMTP username)..."
read -p "Enter SMTP username: " SMTP_USER

if [ -z "$SMTP_USER" ]; then
  echo "ERROR: SMTP_USER cannot be empty"
  exit 1
fi

aws secretsmanager create-secret \
  --name easybid/smtp-user \
  --description "SMTP username for EasyBid email (SES SMTP credentials)" \
  --secret-string "$SMTP_USER" \
  --region $AWS_REGION 2>/dev/null || \
aws secretsmanager update-secret \
  --secret-id easybid/smtp-user \
  --secret-string "$SMTP_USER" \
  --region $AWS_REGION

echo "  ✓ easybid/smtp-user saved"

# ── Secret 4: SMTP_PASS ──
# Used by the backend email service (nodemailer) to authenticate with SES SMTP.
# Code reference: easybid_be/src/services/emailService.ts
echo ""
echo "Setting up SMTP_PASS (SES SMTP password for noreply@ezbidapp.com)..."
read -sp "Enter SMTP password: " SMTP_PASS
echo ""

if [ -z "$SMTP_PASS" ]; then
  echo "ERROR: SMTP_PASS cannot be empty"
  exit 1
fi

aws secretsmanager create-secret \
  --name easybid/smtp-pass \
  --description "SMTP password for EasyBid email (noreply@ezbidapp.com via SES)" \
  --secret-string "$SMTP_PASS" \
  --region $AWS_REGION 2>/dev/null || \
aws secretsmanager update-secret \
  --secret-id easybid/smtp-pass \
  --secret-string "$SMTP_PASS" \
  --region $AWS_REGION

echo "  ✓ easybid/smtp-pass saved"

echo ""
echo "============================================"
echo "  Secrets created successfully!"
echo "  These are referenced in:"
echo "    infrastructure/cloudformation/04-services.yml"
echo "    (BackendTaskDefinition → Secrets section)"
echo "============================================"
