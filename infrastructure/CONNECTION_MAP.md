# EasyBid Connection Map

This document is the single source of truth for every connection in the system.
When something breaks, start here.

---

## Connection 1: User → ALB

```
Browser  ──HTTPS──▶  ALB (easybid-alb)
```

- **Protocol**: HTTP (port 80) or HTTPS (port 443)
- **Where to check**: AWS Console → EC2 → Load Balancers → `easybid-alb`
- **DNS**: The ALB DNS name is your app URL (or point a custom domain at it)
- **Troubleshooting**: If the site is unreachable, check the ALB's security group allows inbound 80/443

---

## Connection 2: ALB → Frontend Service

```
ALB  ──/*──▶  Frontend Target Group  ──▶  ECS Frontend (nginx:80)
```

- **Routing**: Default rule — any path not matching `/api/*` or `/graphql*`
- **Target group**: `easybid-frontend-tg` on port 80
- **Health check**: `GET /` → expects HTTP 200
- **Where to check**: AWS Console → EC2 → Target Groups → `easybid-frontend-tg`
- **Troubleshooting**: If pages don't load, check target group health. Unhealthy = container isn't starting

---

## Connection 3: ALB → Backend Service

```
ALB  ──/api/*, /graphql*──▶  Backend Target Group  ──▶  ECS Backend (node:4000)
```

- **Routing**: Path-based rules forward `/api/*` and `/graphql*` to backend
- **Target group**: `easybid-backend-tg` on port 4000
- **Health check**: `GET /api/health` → expects HTTP 200 (add this endpoint!)
- **Where to check**: AWS Console → EC2 → Target Groups → `easybid-backend-tg`
- **Troubleshooting**: If API calls fail with 502/503, check backend target group health

---

## Connection 4: Backend → PostgreSQL (RDS)

```
ECS Backend  ──DATABASE_URL──▶  RDS PostgreSQL (port 5432)
```

- **Connection string**: Stored in AWS Secrets Manager → `easybid/database-url`
- **Format**: `postgresql://USER:PASSWORD@easybid.c5km8ysa4ba4.us-east-2.rds.amazonaws.com:5432/easybid`
- **Code path**: `easybid_be/src/prisma.ts` → reads `process.env.DATABASE_URL`
- **Security group**: Backend's SG must allow outbound to RDS SG on port 5432
- **Where to check**:
  - Secrets Manager → `easybid/database-url`
  - RDS Console → `easybid` instance → Connectivity
  - ECS Backend logs in CloudWatch → `/ecs/easybid-backend`
- **Troubleshooting**:
  1. Check the secret value is correct: `aws secretsmanager get-secret-value --secret-id easybid/database-url`
  2. Check RDS security group allows inbound from ECS security group
  3. Check ECS backend logs for Prisma connection errors

---

## Connection 5: Frontend (in browser) → Backend (via ALB)

```
React App (browser)  ──fetch('/api/...')──▶  ALB  ──▶  Backend
React App (browser)  ──Apollo('/graphql')──▶  ALB  ──▶  Backend
```

- **GraphQL**: `easybid_ui/src/graphql/client.ts` → `window.location.origin + '/graphql'`
- **REST calls**: Components use relative paths like `fetch('/api/signin', ...)`
- **Files making API calls**:
  - `AuthProvider.tsx` → `/api/signin`, `/api/signup`
  - `CreateBidDialog.tsx` → `/api/me`, `/api/company/{id}`
  - `CompanyPage.tsx` → `/api/company/{id}`, `/api/company/by-name/{name}`
  - `CreateRFPDialog.tsx` → `/api/company/{id}`, `/api/company/by-name/{name}`
  - `RFPTable.tsx` → `/api/company/{id}`
- **No configuration needed**: Relative paths work because browser sends requests to the same origin (the ALB)
- **Troubleshooting**: If API calls fail, open browser DevTools → Network tab. Check the request URL matches the ALB

---

## Connection 6: Backend → Secrets Manager

```
ECS Backend (task startup)  ──reads──▶  Secrets Manager
```

- **Secrets referenced**:
  - `easybid/database-url` → injected as `DATABASE_URL` env var
  - `easybid/jwt-secret` → injected as `JWT_SECRET` env var
- **How it works**: ECS Fargate reads secrets at container startup and injects them as environment variables
- **IAM**: The `ecsTaskExecutionRole` must have `secretsmanager:GetSecretValue` permission
- **Where to check**: AWS Console → Secrets Manager → search "easybid"

---

## Security Group Rules Summary

| From | To | Port | Why |
|------|----|------|-----|
| `0.0.0.0/0` (internet) | ALB SG | 80, 443 | User traffic |
| ALB SG | Frontend SG | 80 | ALB → nginx |
| ALB SG | Backend SG | 4000 | ALB → Express |
| Backend SG | RDS SG | 5432 | Prisma → PostgreSQL |

---

## Quick Diagnostic Commands

```bash
# Check if services are running
aws ecs list-services --cluster easybid --region us-east-2

# Check task status (are containers healthy?)
aws ecs describe-services --cluster easybid --services easybid-backend easybid-frontend --region us-east-2

# View backend logs
aws logs tail /ecs/easybid-backend --region us-east-2 --follow

# View frontend logs
aws logs tail /ecs/easybid-frontend --region us-east-2 --follow

# Test backend health directly (if you have the task IP)
curl http://<TASK_IP>:4000/api/health

# Check ALB target health
aws elbv2 describe-target-health --target-group-arn <BACKEND_TG_ARN> --region us-east-2
```
