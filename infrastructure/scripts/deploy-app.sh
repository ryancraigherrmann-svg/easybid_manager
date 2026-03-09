#!/bin/bash
# =============================================================================
# deploy-app.sh — Build Docker images, push to ECR, and update ECS services
#
# This is the script you run after code changes to deploy new versions.
# Infrastructure must already exist (run deploy-infra.sh first).
#
# Usage:
#   ./infrastructure/scripts/deploy-app.sh              # Deploy both
#   ./infrastructure/scripts/deploy-app.sh backend       # Deploy backend only
#   ./infrastructure/scripts/deploy-app.sh frontend      # Deploy frontend only
# =============================================================================
set -e

AWS_REGION="us-east-2"
AWS_ACCOUNT_ID="${AWS_ACCOUNT_ID:-$(aws sts get-caller-identity --query Account --output text)}"
ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
CLUSTER_NAME="easybid-production"
IMAGE_TAG="$(git rev-parse --short HEAD 2>/dev/null || date +%s)"
DEPLOY_TARGET="${1:-all}"

echo "============================================"
echo "  EasyBid — Application Deployment"
echo "  Account: ${AWS_ACCOUNT_ID}"
echo "  Image tag: ${IMAGE_TAG}"
echo "  Deploying: ${DEPLOY_TARGET}"
echo "============================================"

# Log in to ECR
echo ""
echo "── Logging in to ECR ──"
aws ecr get-login-password --region ${AWS_REGION} | \
  docker login --username AWS --password-stdin ${ECR_REGISTRY}

# ── Deploy Backend ──
if [ "$DEPLOY_TARGET" = "all" ] || [ "$DEPLOY_TARGET" = "backend" ]; then
  echo ""
  echo "── Building backend image ──"
  docker build -t easybid-backend:${IMAGE_TAG} ./easybid_be
  docker tag easybid-backend:${IMAGE_TAG} ${ECR_REGISTRY}/easybid-backend:${IMAGE_TAG}
  docker tag easybid-backend:${IMAGE_TAG} ${ECR_REGISTRY}/easybid-backend:latest

  echo "── Pushing backend to ECR ──"
  docker push ${ECR_REGISTRY}/easybid-backend:${IMAGE_TAG}
  docker push ${ECR_REGISTRY}/easybid-backend:latest

  echo "── Updating backend service ──"
  aws ecs update-service \
    --cluster ${CLUSTER_NAME} \
    --service easybid-backend \
    --desired-count 1 \
    --force-new-deployment \
    --region ${AWS_REGION} \
    --query 'service.serviceName' --output text

  echo "  ✓ Backend deployment initiated"
fi

# ── Deploy Frontend ──
if [ "$DEPLOY_TARGET" = "all" ] || [ "$DEPLOY_TARGET" = "frontend" ]; then
  echo ""
  echo "── Building frontend image ──"
  # Pass empty VITE_* vars so the React app falls through to window.location.origin
  # (relative paths routed by ALB). The Dockerfile has localhost defaults for local dev.
  docker build \
    --build-arg VITE_GRAPHQL_URL="" \
    --build-arg VITE_API_URL="" \
    -t easybid-frontend:${IMAGE_TAG} ./easybid_ui
  docker tag easybid-frontend:${IMAGE_TAG} ${ECR_REGISTRY}/easybid-frontend:${IMAGE_TAG}
  docker tag easybid-frontend:${IMAGE_TAG} ${ECR_REGISTRY}/easybid-frontend:latest

  echo "── Pushing frontend to ECR ──"
  docker push ${ECR_REGISTRY}/easybid-frontend:${IMAGE_TAG}
  docker push ${ECR_REGISTRY}/easybid-frontend:latest

  echo "── Updating frontend service ──"
  aws ecs update-service \
    --cluster ${CLUSTER_NAME} \
    --service easybid-frontend \
    --desired-count 1 \
    --force-new-deployment \
    --region ${AWS_REGION} \
    --query 'service.serviceName' --output text

  echo "  ✓ Frontend deployment initiated"
fi

echo ""
echo "============================================"
echo "  Deployment initiated!"
echo ""
echo "  Monitor progress:"
echo "    aws ecs describe-services --cluster ${CLUSTER_NAME} \\"
echo "      --services easybid-backend easybid-frontend \\"
echo "      --region ${AWS_REGION} \\"
echo "      --query 'services[].{Name:serviceName,Running:runningCount,Desired:desiredCount,Status:status}'"
echo ""
echo "  View logs:"
echo "    aws logs tail /ecs/easybid-backend --region ${AWS_REGION} --follow"
echo "    aws logs tail /ecs/easybid-frontend --region ${AWS_REGION} --follow"
echo ""
echo "  Run Prisma schema push (if schema changed):"
echo "    ./infrastructure/scripts/prisma-push.sh"
echo "============================================"
