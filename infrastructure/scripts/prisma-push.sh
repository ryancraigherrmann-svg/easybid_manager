#!/bin/bash
# =============================================================================
# prisma-push.sh — Run prisma db push inside the backend ECS container
#
# This connects to the running backend container via ECS Exec and runs
# `npx prisma db push` to sync the database schema.
#
# Prerequisites:
#   - AWS Session Manager Plugin installed locally
#   - ECS Exec enabled on the backend service (set in 04-services.yml)
#   - Backend service running with at least 1 task
#
# Usage:
#   ./infrastructure/scripts/prisma-push.sh
# =============================================================================
set -e

AWS_REGION="us-east-2"
CLUSTER_NAME="easybid-production"
SERVICE_NAME="easybid-backend"
CONTAINER_NAME="easybid-backend"

echo "============================================"
echo "  EasyBid — Prisma DB Push"
echo "============================================"
echo ""

# Get the running task ARN
echo "── Finding running backend task ──"
TASK_ARN=$(aws ecs list-tasks \
  --cluster ${CLUSTER_NAME} \
  --service-name ${SERVICE_NAME} \
  --desired-status RUNNING \
  --region ${AWS_REGION} \
  --query 'taskArns[0]' --output text)

if [ "$TASK_ARN" = "None" ] || [ -z "$TASK_ARN" ]; then
  echo "ERROR: No running backend tasks found. Deploy the backend first."
  exit 1
fi

TASK_ID=$(echo "$TASK_ARN" | awk -F'/' '{print $NF}')
echo "  Task: ${TASK_ID}"

# Step 1: Delete generated Prisma client so it regenerates cleanly
echo ""
echo "── Deleting generated Prisma client ──"
echo ""

aws ecs execute-command \
  --cluster ${CLUSTER_NAME} \
  --task "${TASK_ARN}" \
  --container ${CONTAINER_NAME} \
  --interactive \
  --command "rm -rf dist/generated && echo 'Generated files deleted.'" \
  --region ${AWS_REGION}

# Step 2: Regenerate Prisma client
echo ""
echo "── Regenerating Prisma client ──"
echo ""

aws ecs execute-command \
  --cluster ${CLUSTER_NAME} \
  --task "${TASK_ARN}" \
  --container ${CONTAINER_NAME} \
  --interactive \
  --command "npx prisma generate --schema=./schema.prisma" \
  --region ${AWS_REGION}

# Step 3: Push schema changes to database
echo ""
echo "── Running prisma db push ──"
echo "  (This uses ECS Exec to connect to the container)"
echo ""

aws ecs execute-command \
  --cluster ${CLUSTER_NAME} \
  --task "${TASK_ARN}" \
  --container ${CONTAINER_NAME} \
  --interactive \
  --command "npx prisma db push --schema=./schema.prisma --accept-data-loss" \
  --region ${AWS_REGION}

echo ""
echo "============================================"
echo "  Prisma DB Push complete!"
echo "============================================"
