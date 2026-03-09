# AWS Deployment Guide for EasyBid

## Overview
This guide walks you through deploying EasyBid (backend, frontend, and database) to AWS using ECS Fargate.

## Architecture
```
Internet
    ↓
AWS Application Load Balancer (ALB)
    ↓
┌───────────────────────────────────────────┐
│ ECS Fargate Cluster (easybid)             │
├───────────────────────────────────────────┤
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │ Frontend Service                     │  │
│  │ (easybid-frontend)                   │  │
│  │ - Nginx serving React app            │  │
│  │ - Port 80 → 443 (via ALB)            │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │ Backend Service                      │  │
│  │ (easybid-backend)                    │  │
│  │ - Node.js/Express/Apollo GraphQL    │  │
│  │ - Port 4000 (internal)               │  │
│  └─────────────────────────────────────┘  │
│             ↓                             │
│  ┌─────────────────────────────────────┐  │
│  │ RDS PostgreSQL Database              │  │
│  │ - Multi-AZ for high availability      │  │
│  │ - Automatic backups                  │  │
│  └─────────────────────────────────────┘  │
└───────────────────────────────────────────┘
```

## Prerequisites
1. AWS Account with appropriate permissions
2. AWS CLI configured (`aws configure`)
3. Docker installed and running
4. Your domain name and SSL certificate (optional but recommended)

## Step 1: Set up AWS Resources

### 1.1 Create RDS PostgreSQL Database
```bash
# Create a PostgreSQL instance
aws rds create-db-instance \
  --db-instance-identifier easybid-postgres \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username easybid \
  --master-user-password YOUR_SECURE_PASSWORD \
  --allocated-storage 20 \
  --region us-east-2 \
  --backup-retention-period 7 \
  --multi-az

# Wait for the instance to be available (5-10 minutes)
aws rds wait db-instance-available \
  --db-instance-identifier easybid-postgres \
  --region us-east-2
```

### 1.2 Store Database URL in AWS Secrets Manager
```bash
aws secretsmanager create-secret \
  --name easybid/database-url \
  --secret-string "postgresql://easybid:YOUR_SECURE_PASSWORD@easybid-postgres.c9akcxxx.us-east-2.rds.amazonaws.com:5432/easybid" \
  --region us-east-2
```

Get your RDS endpoint:
```bash
aws rds describe-db-instances \
  --db-instance-identifier easybid-postgres \
  --query 'DBInstances[0].Endpoint.Address' \
  --region us-east-2
```

### 1.3 Store JWT Secret
```bash
aws secretsmanager create-secret \
  --name easybid/jwt-secret \
  --secret-string "YOUR_JWT_SECRET_KEY_HERE" \
  --region us-east-2
```

### 1.4 Create/Update IAM Roles

**Create ecsTaskExecutionRole (if it doesn't exist):**
```bash
aws iam create-role \
  --role-name ecsTaskExecutionRole \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "ecs-tasks.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }'

# Attach the policy
aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

# Add secrets access policy
aws iam put-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-name SecretsManagerAccess \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue"
      ],
      "Resource": [
        "arn:aws:secretsmanager:us-east-2:*:secret:easybid/*"
      ]
    }]
  }'
```

**Create ecsTaskRole:**
```bash
aws iam create-role \
  --role-name ecsTaskRole \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "ecs-tasks.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }'
```

### 1.5 Create ECS Cluster
```bash
aws ecs create-cluster \
  --cluster-name easybid \
  --region us-east-2
```

### 1.6 Create VPC and Security Groups
```bash
# Get your default VPC
VPC_ID=$(aws ec2 describe-vpcs --query 'Vpcs[0].VpcId' --output text)

# Create security group for ECS tasks
SG_ID=$(aws ec2 create-security-group \
  --group-name easybid-ecs-sg \
  --description "Security group for EasyBid ECS tasks" \
  --vpc-id ${VPC_ID} \
  --query 'GroupId' \
  --output text)

# Allow inbound traffic on port 80
aws ec2 authorize-security-group-ingress \
  --group-id ${SG_ID} \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0

# Allow inbound traffic on port 4000
aws ec2 authorize-security-group-ingress \
  --group-id ${SG_ID} \
  --protocol tcp \
  --port 4000 \
  --cidr 0.0.0.0/0
```

### 1.7 Create Application Load Balancer (ALB)
```bash
# Get subnets
SUBNETS=$(aws ec2 describe-subnets \
  --filters "Name=vpc-id,Values=${VPC_ID}" \
  --query 'Subnets[*].SubnetId' \
  --output text)

# Create ALB
ALB_ARN=$(aws elbv2 create-load-balancer \
  --name easybid-alb \
  --subnets ${SUBNETS} \
  --security-groups ${SG_ID} \
  --scheme internet-facing \
  --region us-east-2 \
  --query 'LoadBalancers[0].LoadBalancerArn' \
  --output text)

echo "ALB ARN: ${ALB_ARN}"

# Create target groups
BACKEND_TG_ARN=$(aws elbv2 create-target-group \
  --name easybid-backend-tg \
  --protocol HTTP \
  --port 4000 \
  --vpc-id ${VPC_ID} \
  --target-type ip \
  --query 'TargetGroups[0].TargetGroupArn' \
  --output text)

FRONTEND_TG_ARN=$(aws elbv2 create-target-group \
  --name easybid-frontend-tg \
  --protocol HTTP \
  --port 80 \
  --vpc-id ${VPC_ID} \
  --target-type ip \
  --query 'TargetGroups[0].TargetGroupArn' \
  --output text)

echo "Backend TG ARN: ${BACKEND_TG_ARN}"
echo "Frontend TG ARN: ${FRONTEND_TG_ARN}"
```

## Step 2: Update Configuration Files

### 2.1 Update Task Definition Files
Edit `aws-deploy/ecs-task-def-backend.json` and `aws-deploy/ecs-task-def-frontend.json`:
- Replace `YOUR_AWS_ACCOUNT_ID` with your actual AWS Account ID
- Update domain names in CORS_ORIGINS and VITE_GRAPHQL_URL

### 2.2 Update Deploy Script
Edit `aws-deploy/deploy.sh`:
```bash
# Update your domain
VITE_GRAPHQL_URL=https://api.yourdomain.com/graphql
VITE_API_URL=https://api.yourdomain.com/api
```

## Step 3: Deploy Images to ECR and Services

### 3.1 Make Deploy Script Executable
```bash
chmod +x aws-deploy/deploy.sh
```

### 3.2 Run Deployment
```bash
./aws-deploy/deploy.sh
```

This script will:
1. Create ECR repositories
2. Build Docker images
3. Push images to ECR
4. Register ECS task definitions
5. Update ECS services

## Step 4: Create ECS Services

### 4.1 Create Backend Service
```bash
aws ecs create-service \
  --cluster easybid \
  --service-name easybid-backend \
  --task-definition easybid-backend:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[${SUBNETS}],securityGroups=${SG_ID},assignPublicIp=ENABLED}" \
  --load-balancers "targetGroupArn=${BACKEND_TG_ARN},containerName=easybid-backend,containerPort=4000" \
  --region us-east-2
```

### 4.2 Create Frontend Service
```bash
aws ecs create-service \
  --cluster easybid \
  --service-name easybid-frontend \
  --task-definition easybid-frontend:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[${SUBNETS}],securityGroups=${SG_ID},assignPublicIp=ENABLED}" \
  --load-balancers "targetGroupArn=${FRONTEND_TG_ARN},containerName=easybid-frontend,containerPort=80" \
  --region us-east-2
```

## Step 5: Configure ALB Listeners

```bash
# Create listener for frontend (port 80 → 443 with SSL)
aws elbv2 create-listener \
  --load-balancer-arn ${ALB_ARN} \
  --protocol HTTP \
  --port 80 \
  --default-actions Type=forward,TargetGroupArn=${FRONTEND_TG_ARN} \
  --region us-east-2

# Create listener for API traffic
aws elbv2 create-listener \
  --load-balancer-arn ${ALB_ARN} \
  --protocol HTTP \
  --port 8080 \
  --default-actions Type=forward,TargetGroupArn=${BACKEND_TG_ARN} \
  --region us-east-2
```

## Step 6: Database Migration

Get a task running in your backend:
```bash
# Get the latest backend task
TASK_ARN=$(aws ecs list-tasks \
  --cluster easybid \
  --service-name easybid-backend \
  --query 'taskArns[0]' \
  --output text \
  --region us-east-2)

# Execute migration
aws ecs execute-command \
  --cluster easybid \
  --task ${TASK_ARN} \
  --container easybid-backend \
  --interactive \
  --command "npx prisma migrate deploy" \
  --region us-east-2
```

## Step 7: Verify Deployment

```bash
# Check service status
aws ecs describe-services \
  --cluster easybid \
  --services easybid-backend easybid-frontend \
  --region us-east-2

# Check running tasks
aws ecs list-tasks \
  --cluster easybid \
  --region us-east-2

# View logs
aws logs tail /ecs/easybid-backend --follow --region us-east-2
aws logs tail /ecs/easybid-frontend --follow --region us-east-2
```

## Troubleshooting

### Tasks not starting
Check logs:
```bash
aws logs describe-log-groups --region us-east-2
aws logs tail /ecs/easybid-backend --follow --region us-east-2
```

### Database connection issues
Verify security group allows RDS access:
```bash
aws ec2 authorize-security-group-ingress \
  --group-id ${SG_ID} \
  --protocol tcp \
  --port 5432 \
  --cidr 10.0.0.0/8
```

### UI not connecting to backend
Verify CORS settings in backend task definition match your domain.

## Rollback

To rollback to previous task definition version:
```bash
aws ecs update-service \
  --cluster easybid \
  --service easybid-backend \
  --task-definition easybid-backend:2 \
  --force-new-deployment \
  --region us-east-2
```

## Scaling

Auto-scale ECS services:
```bash
# Register scalable target
aws application-autoscaling register-scalable-target \
  --service-namespace ecs \
  --resource-id service/easybid/easybid-backend \
  --scalable-dimension ecs:service:DesiredCount \
  --min-capacity 2 \
  --max-capacity 10 \
  --region us-east-2

# Create scaling policy
aws application-autoscaling put-scaling-policy \
  --policy-name cpu-scaling \
  --service-namespace ecs \
  --resource-id service/easybid/easybid-backend \
  --scalable-dimension ecs:service:DesiredCount \
  --policy-type TargetTrackingScaling \
  --target-tracking-scaling-policy-configuration '{
    "TargetValue": 70.0,
    "PredefinedMetricSpecification": {
      "PredefinedMetricType": "ECSServiceAverageCPUUtilization"
    }
  }' \
  --region us-east-2
```

## Cost Optimization

- Use Fargate Spot instances for non-critical workloads (50% cheaper)
- Set appropriate task memory/CPU limits
- Use RDS Reserved Instances for long-term deployments
- Enable CloudWatch alarms for monitoring

## Next Steps

1. Set up Route 53 for DNS
2. Configure SSL/TLS with ACM
3. Set up monitoring with CloudWatch
4. Configure CI/CD pipeline with CodePipeline
5. Set up backup strategies
6. Configure WAF rules
