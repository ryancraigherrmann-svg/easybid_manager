#!/bin/bash

# EasyBid AWS Deployment Script
# This script builds and pushes Docker images to AWS ECR and deploys to ECS

set -e

# Configuration
AWS_REGION="us-east-2"
AWS_ACCOUNT_ID="${AWS_ACCOUNT_ID:-$(aws sts get-caller-identity --query Account --output text)}"
ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
BACKEND_REPO="easybid-backend"
FRONTEND_REPO="easybid-frontend"
CLUSTER_NAME="easybid"
BACKEND_SERVICE_NAME="easybid-backend"
FRONTEND_SERVICE_NAME="easybid-frontend"

echo "AWS Account ID: ${AWS_ACCOUNT_ID}"
echo "AWS Region: ${AWS_REGION}"
echo "ECR Registry: ${ECR_REGISTRY}"

# Step 1: Create ECR repositories if they don't exist
echo "Creating ECR repositories if needed..."
aws ecr describe-repositories --repository-names ${BACKEND_REPO} --region ${AWS_REGION} 2>/dev/null || \
  aws ecr create-repository --repository-name ${BACKEND_REPO} --region ${AWS_REGION}

aws ecr describe-repositories --repository-names ${FRONTEND_REPO} --region ${AWS_REGION} 2>/dev/null || \
  aws ecr create-repository --repository-name ${FRONTEND_REPO} --region ${AWS_REGION}

# Step 2: Log in to ECR
echo "Logging in to ECR..."
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}

# Step 3: Build and push backend image
echo "Building backend image..."
docker build -t ${BACKEND_REPO}:latest ./easybid_be
docker tag ${BACKEND_REPO}:latest ${ECR_REGISTRY}/${BACKEND_REPO}:latest
docker tag ${BACKEND_REPO}:latest ${ECR_REGISTRY}/${BACKEND_REPO}:$(date +%s)

echo "Pushing backend image to ECR..."
docker push ${ECR_REGISTRY}/${BACKEND_REPO}:latest
docker push ${ECR_REGISTRY}/${BACKEND_REPO}:$(date +%s)

# Step 4: Build and push frontend image
echo "Building frontend image..."
docker build \
  --build-arg VITE_GRAPHQL_URL=https://api.yourdomain.com/graphql \
  --build-arg VITE_API_URL=https://api.yourdomain.com/api \
  -t ${FRONTEND_REPO}:latest ./easybid_ui
docker tag ${FRONTEND_REPO}:latest ${ECR_REGISTRY}/${FRONTEND_REPO}:latest
docker tag ${FRONTEND_REPO}:latest ${ECR_REGISTRY}/${FRONTEND_REPO}:$(date +%s)

echo "Pushing frontend image to ECR..."
docker push ${ECR_REGISTRY}/${FRONTEND_REPO}:latest
docker push ${ECR_REGISTRY}/${FRONTEND_REPO}:$(date +%s)

# Step 5: Update ECS task definitions and services
echo "Updating ECS task definitions..."

# Update backend task definition
aws ecs register-task-definition \
  --region ${AWS_REGION} \
  --cli-input-json file://aws-deploy/ecs-task-def-backend.json

# Update frontend task definition
aws ecs register-task-definition \
  --region ${AWS_REGION} \
  --cli-input-json file://aws-deploy/ecs-task-def-frontend.json

# Step 6: Update services to use new task definitions
echo "Updating ECS services..."

# Get the latest task definition revisions
BACKEND_TASK_DEF=$(aws ecs describe-task-definition \
  --region ${AWS_REGION} \
  --task-definition easybid-backend \
  --query 'taskDefinition.taskDefinitionArn' --output text)

FRONTEND_TASK_DEF=$(aws ecs describe-task-definition \
  --region ${AWS_REGION} \
  --task-definition easybid-frontend \
  --query 'taskDefinition.taskDefinitionArn' --output text)

# Update backend service
aws ecs update-service \
  --region ${AWS_REGION} \
  --cluster ${CLUSTER_NAME} \
  --service ${BACKEND_SERVICE_NAME} \
  --task-definition ${BACKEND_TASK_DEF} \
  --force-new-deployment

# Update frontend service
aws ecs update-service \
  --region ${AWS_REGION} \
  --cluster ${CLUSTER_NAME} \
  --service ${FRONTEND_SERVICE_NAME} \
  --task-definition ${FRONTEND_TASK_DEF} \
  --force-new-deployment

echo "Deployment initiated! Monitor progress in the AWS Console."
