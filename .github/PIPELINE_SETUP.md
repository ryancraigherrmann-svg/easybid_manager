# CI/CD Pipeline Setup

## What This Does

This GitHub Actions CI/CD pipeline automatically:
1. Builds Docker images when you push to `main` or `develop`
2. Pushes images to AWS ECR
3. Updates ECS task definitions with new image
4. Deploys to ECS Fargate
5. Runs database migrations (on main branch only)

---

## Setup Instructions

### Step 1: Enable GitHub OIDC (One-time setup)

```bash
# Run the setup script from your local machine
chmod +x aws-deploy/setup-github-actions.sh
./aws-deploy/setup-github-actions.sh
```

This creates the IAM role and policies for GitHub Actions to deploy to your AWS account.

### Step 2: Configure GitHub Repository

1. Go to your GitHub repo settings
2. Go to **Secrets and variables** → **Actions**
3. No secrets needed! (Uses OIDC federation)

### Step 3: Update Workflow File

Edit `.github/workflows/deploy.yml` and update:

**Line 17-23:** Update domain names
```yaml
--build-arg VITE_GRAPHQL_URL=https://api.yourdomain.com/graphql \
--build-arg VITE_API_URL=https://api.yourdomain.com/api \
```

Change `yourdomain.com` to your actual domain.

### Step 4: Push to GitHub

```bash
git add .github/workflows/deploy.yml
git commit -m "Add CI/CD pipeline"
git push origin main
```

The pipeline will automatically start!

---

## How It Works

### Trigger
Every push to `main` or `develop` branch triggers the pipeline.

### Flow
```
1. Checkout code
   ↓
2. Authenticate to AWS (via GitHub OIDC)
   ↓
3. Build backend Docker image → Push to ECR
   ↓
4. Build frontend Docker image → Push to ECR
   ↓
5. Update ECS task definitions
   ↓
6. Deploy backend service
   ↓
7. Deploy frontend service
   ↓
8. Run migrations (main branch only)
```

### Backend Deployment
- Reads `DATABASE_URL` from **AWS Secrets Manager**
- You must create this secret first:
  ```bash
  aws secretsmanager create-secret \
    --name easybid/database-url \
    --secret-string "postgresql://user:password@easybid.xxxxx.us-east-2.rds.amazonaws.com:5432/easybid" \
    --region us-east-2
  ```

### Frontend Deployment
- Uses environment variables from `.github/workflows/deploy.yml`
- Baked into the Docker image at build time
- Points to your backend load balancer

---

## Database Connection

The backend automatically gets the database URL from AWS Secrets Manager:

```bash
# Create the secret (do this once)
aws secretsmanager create-secret \
  --name easybid/database-url \
  --secret-string "postgresql://easybid:PASSWORD@easybid.xxxxx.us-east-2.rds.amazonaws.com:5432/easybid" \
  --region us-east-2
```

Your RDS instance: `easybid` (in us-east-2)

---

## Environment Variables

### Backend (from ECS Task Definition)
- `DATABASE_URL` - From Secrets Manager ✅
- `PORT=4000`
- `NODE_ENV=production`
- `CORS_ORIGINS` - Set in task definition

### Frontend (set at build time)
- `VITE_GRAPHQL_URL` - https://api.yourdomain.com/graphql
- `VITE_API_URL` - https://api.yourdomain.com/api

---

## Monitoring Deployments

### In GitHub
1. Go to **Actions** tab
2. Click the workflow run
3. See real-time logs

### In AWS
```bash
# Check deployment status
aws ecs describe-services \
  --cluster easybid \
  --services easybid-backend easybid-frontend \
  --region us-east-2

# View logs
aws logs tail /ecs/easybid-backend --follow --region us-east-2
aws logs tail /ecs/easybid-frontend --follow --region us-east-2
```

---

## Troubleshooting

### Pipeline fails to authenticate
- Check GitHub OIDC role was created: `aws iam get-role --role-name GitHub-Actions-Role`
- Verify role trust policy has correct repo

### Images not pushing to ECR
- Check IAM permissions: `aws iam get-role-policy --role-name GitHub-Actions-Role --policy-name GitHub-Actions-Policy`

### Deployment stuck
- Check ECS service: `aws ecs describe-services --cluster easybid --services easybid-backend`
- Check CloudWatch logs: `aws logs tail /ecs/easybid-backend --follow`

### Migrations not running
- Only runs on `main` branch
- Task must be running in ECS first
- Check logs: `aws ecs execute-command --help`

---

## Manual Deployment (if needed)

If you need to deploy without pushing to GitHub:

```bash
./aws-deploy/deploy.sh
```

---

## Branches

- **main** → Production deployment + run migrations
- **develop** → Staging deployment (no migrations)
- **feature/*** → No deployment

---

## Rollback

If deployment goes wrong:

```bash
# Check previous task definition
aws ecs describe-services \
  --cluster easybid \
  --services easybid-backend \
  --region us-east-2 \
  --query 'services[0].taskDefinition'

# Rollback to previous version
aws ecs update-service \
  --cluster easybid \
  --service easybid-backend \
  --task-definition easybid-backend:2 \
  --force-new-deployment \
  --region us-east-2
```

---

## Next Steps

1. ✅ Run `./aws-deploy/setup-github-actions.sh`
2. ✅ Update domain names in `.github/workflows/deploy.yml`
3. ✅ Create database secret in Secrets Manager
4. ✅ Push to GitHub
5. ✅ Monitor the deployment in GitHub Actions tab

---

**Pipeline is now fully automated! Push to deploy.** 🚀
