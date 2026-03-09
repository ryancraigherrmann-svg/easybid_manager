#!/bin/bash
# =============================================================================
# ecs-exec.sh — SSH into a running ECS container
#
# Usage:
#   ./infrastructure/scripts/ecs-exec.sh              # backend (default)
#   ./infrastructure/scripts/ecs-exec.sh frontend      # frontend
# =============================================================================
set -e

AWS_REGION="us-east-2"
CLUSTER_NAME="easybid-production"
TARGET="${1:-backend}"
SERVICE_NAME="easybid-${TARGET}"
CONTAINER_NAME="easybid-${TARGET}"

echo "── Connecting to ${SERVICE_NAME} ──"

TASK_ARN=$(aws ecs list-tasks \
  --cluster ${CLUSTER_NAME} \
  --service-name ${SERVICE_NAME} \
  --desired-status RUNNING \
  --region ${AWS_REGION} \
  --query 'taskArns[0]' --output text)

if [ "$TASK_ARN" = "None" ] || [ -z "$TASK_ARN" ]; then
  echo "ERROR: No running ${SERVICE_NAME} tasks found."
  exit 1
fi

TASK_ID=$(echo "$TASK_ARN" | awk -F'/' '{print $NF}')
echo "  Task: ${TASK_ID}"
echo ""

SHELL_CMD="/bin/bash"
if [ "$TARGET" = "frontend" ]; then
  SHELL_CMD="/bin/sh"  # Alpine-based nginx image uses sh
fi

aws ecs execute-command \
  --cluster ${CLUSTER_NAME} \
  --task "${TASK_ARN}" \
  --container ${CONTAINER_NAME} \
  --interactive \
  --command "${SHELL_CMD}" \
  --region ${AWS_REGION}
