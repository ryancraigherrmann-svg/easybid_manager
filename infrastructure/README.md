# EasyBid AWS Infrastructure

## Deployment Workflow

# 1. First-time setup (only once)
./infrastructure/scripts/setup-secrets.sh
./infrastructure/scripts/deploy-infra.sh

# 2. Deploy code changes
./infrastructure/scripts/deploy-app.sh

# 3. If schema changed
./infrastructure/scripts/prisma-push.sh

# 4. Debug
./infrastructure/scripts/ecs-exec.sh           # backend shell
./infrastructure/scripts/ecs-exec.sh frontend   # frontend shell

## Architecture Overview

```
Browser
  │
  ▼
ALB (Application Load Balancer) ─── Port 80 / 443
  │
  ├──  /*           →  Frontend Service (nginx:80)     ← serves React SPA
  ├──  /api/*       →  Backend Service  (node:4000)    ← Express REST routes
  └──  /graphql     →  Backend Service  (node:4000)    ← Apollo GraphQL
                           │
                           ▼
                    RDS PostgreSQL (Port 5432)
                    easybid.c5km8ysa4ba4.us-east-2.rds.amazonaws.com
```

## Connection Points (Where Things Talk to Each Other)

### 1. Browser → ALB
- **What**: All user traffic enters through the ALB
- **Config**: ALB DNS name (or your custom domain via Route 53)
- **Port**: 80 (HTTP) or 443 (HTTPS with ACM certificate)

### 2. ALB → Frontend (default route)
- **What**: Serves the React SPA for all non-API paths
- **Routing rule**: Any path that doesn't match `/api/*` or `/graphql`
- **Target**: Frontend ECS service on port 80 (nginx)
- **Config file**: `infrastructure/cloudformation/alb.yml` → DefaultTargetGroup

### 3. ALB → Backend (API routes)
- **What**: Forwards API and GraphQL requests to Express server
- **Routing rules**: `/api/*` and `/graphql*`
- **Target**: Backend ECS service on port 4000
- **Config file**: `infrastructure/cloudformation/alb.yml` → BackendTargetGroup

### 4. Backend → RDS PostgreSQL
- **What**: Prisma ORM connects to PostgreSQL
- **Connection string**: Stored in AWS Secrets Manager as `easybid/database-url`
- **Format**: `postgresql://USER:PASS@HOST:5432/easybid`
- **Code location**: `easybid_be/src/prisma.ts` reads `DATABASE_URL` env var
- **Config file**: `infrastructure/task-definitions/backend.json` → secrets section

### 5. Frontend → Backend (in-browser)
- **What**: React app makes fetch/Apollo calls to `/api/*` and `/graphql`
- **How it works**: Browser sends requests to the SAME origin (the ALB), ALB routes them
- **Code locations**:
  - GraphQL: `easybid_ui/src/graphql/client.ts` → uses `window.location.origin + /graphql`
  - REST: Components use `fetch('/api/...')` with relative paths
- **No env vars needed at runtime** — relative paths work because ALB handles routing

## Directory Structure

```
infrastructure/
├── README.md                          ← You are here
├── CONNECTION_MAP.md                  ← Detailed connection reference
├── cloudformation/
│   ├── 01-network.yml                 ← VPC, subnets, security groups
│   ├── 02-cluster.yml                 ← ECS cluster, IAM roles, ECR repos
│   ├── 03-alb.yml                     ← ALB, target groups, listener rules
│   ├── 04-services.yml                ← ECS services + task definitions
│   └── parameters/
│       └── production.json            ← Stack parameters for prod
├── task-definitions/
│   ├── backend.json                   ← Backend ECS task definition
│   └── frontend.json                  ← Frontend ECS task definition
├── scripts/
│   ├── deploy-infra.sh                ← Deploy CloudFormation stacks
│   ├── deploy-app.sh                  ← Build + push images + update services
│   ├── setup-secrets.sh               ← Create/update Secrets Manager entries
│   └── teardown.sh                    ← Remove all stacks
└── github-actions/
    ├── backend-deploy.yml             ← CI/CD for easybid_be repo
    └── frontend-deploy.yml            ← CI/CD for easybid_ui repo
```

## Quick Start

### Prerequisites
- AWS CLI v2 configured (`aws configure`)
- Docker installed
- AWS account with permissions for ECS, ECR, ALB, RDS, Secrets Manager

### Step 1: Set up secrets
```bash
cd infrastructure/scripts
./setup-secrets.sh
```

### Step 2: Deploy infrastructure
```bash
./deploy-infra.sh
```

### Step 3: Build and deploy application
```bash
./deploy-app.sh
```

### Step 4: Get your URL
```bash
aws cloudformation describe-stacks \
  --stack-name easybid-alb \
  --query 'Stacks[0].Outputs[?OutputKey==`ALBDnsName`].OutputValue' \
  --output text
```

## Environment Variables Reference

### Backend Container (set in task definition)
| Variable | Source | Description |
|----------|--------|-------------|
| `DATABASE_URL` | Secrets Manager | PostgreSQL connection string |
| `JWT_SECRET` | Secrets Manager | JWT signing key |
| `PORT` | Hardcoded: `4000` | Express server port |
| `NODE_ENV` | Hardcoded: `production` | Node environment |
| `CORS_ORIGINS` | Task definition | Allowed CORS origins (ALB DNS or domain) |

### Frontend Container (baked at build time)
| Variable | Source | Description |
|----------|--------|-------------|
| `VITE_GRAPHQL_URL` | Not needed | Client uses relative path `/graphql` |
| `VITE_API_URL` | Not needed | Client uses relative path `/api` |

> **Key insight**: Because the ALB routes both frontend and API traffic, the
> React app can use relative paths (`/api/signin`, `/graphql`). No domain
> configuration is needed in the frontend build.
