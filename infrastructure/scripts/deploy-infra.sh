#!/bin/bash
# =============================================================================
# deploy-infra.sh — Deploy EasyBid CloudFormation stacks in order
#
# This creates: VPC, subnets, security groups, ECS cluster, ECR repos,
# ALB with routing rules, and ECS services.
#
# Run this from the repository root:
#   ./infrastructure/scripts/deploy-infra.sh
# =============================================================================
set -e

AWS_REGION="us-east-2"
ENV_NAME="production"
CF_DIR="infrastructure/cloudformation"
PARAMS_DIR="${CF_DIR}/parameters"

echo "============================================"
echo "  EasyBid — Infrastructure Deployment"
echo "  Region: ${AWS_REGION}"
echo "  Environment: ${ENV_NAME}"
echo "============================================"

deploy_stack() {
  local STACK_NAME=$1
  local TEMPLATE=$2
  local PARAMS_FILE=$3
  local CAPABILITIES=${4:-""}

  echo ""
  echo "── Deploying: ${STACK_NAME} ──"

  local CAPS_ARG=""
  if [ -n "$CAPABILITIES" ]; then
    CAPS_ARG="--capabilities $CAPABILITIES"
  fi

  local PARAMS_ARG=""
  if [ -n "$PARAMS_FILE" ] && [ -f "$PARAMS_FILE" ]; then
    PARAMS_ARG="--parameters file://$PARAMS_FILE"
  fi

  # Check if stack exists
  if aws cloudformation describe-stacks --stack-name $STACK_NAME --region $AWS_REGION &>/dev/null; then
    echo "  Stack exists, updating..."
    aws cloudformation update-stack \
      --stack-name $STACK_NAME \
      --template-body file://$TEMPLATE \
      $PARAMS_ARG \
      --region $AWS_REGION \
      $CAPS_ARG 2>/dev/null || echo "  No updates needed"
  else
    echo "  Creating stack..."
    aws cloudformation create-stack \
      --stack-name $STACK_NAME \
      --template-body file://$TEMPLATE \
      $PARAMS_ARG \
      --region $AWS_REGION \
      $CAPS_ARG
  fi

  echo "  Waiting for stack to complete..."
  # Poll stack status — handles CREATE, UPDATE, and ROLLBACK states
  while true; do
    STATUS=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --region $AWS_REGION \
      --query 'Stacks[0].StackStatus' --output text 2>/dev/null)

    case "$STATUS" in
      CREATE_COMPLETE|UPDATE_COMPLETE)
        echo "  ✓ ${STACK_NAME} complete (${STATUS})"
        return 0
        ;;
      ROLLBACK_COMPLETE|CREATE_FAILED|UPDATE_ROLLBACK_COMPLETE|DELETE_COMPLETE)
        echo "  ✗ ${STACK_NAME} FAILED (${STATUS})"
        echo "  Check events: aws cloudformation describe-stack-events --stack-name $STACK_NAME --region $AWS_REGION"
        aws cloudformation describe-stack-events --stack-name $STACK_NAME --region $AWS_REGION \
          --query 'StackEvents[?ResourceStatus==`CREATE_FAILED`].[LogicalResourceId,ResourceStatusReason]' --output table 2>&1 | cat
        exit 1
        ;;
      *)
        # Still in progress (CREATE_IN_PROGRESS, UPDATE_IN_PROGRESS, etc.)
        sleep 10
        ;;
    esac
  done
}

# Deploy in dependency order — each stack gets its own parameter file
deploy_stack "easybid-network"  "${CF_DIR}/01-network.yml"  "${PARAMS_DIR}/network.json"
deploy_stack "easybid-cluster"  "${CF_DIR}/02-cluster.yml"  "${PARAMS_DIR}/cluster.json"  "CAPABILITY_NAMED_IAM"
deploy_stack "easybid-alb"      "${CF_DIR}/03-alb.yml"      "${PARAMS_DIR}/alb.json"
deploy_stack "easybid-services" "${CF_DIR}/04-services.yml" "${PARAMS_DIR}/services.json"

echo ""
echo "============================================"
echo "  Infrastructure deployment complete!"
echo ""
echo "  Your application URL:"
aws cloudformation describe-stacks \
  --stack-name easybid-alb \
  --region $AWS_REGION \
  --query 'Stacks[0].Outputs[?OutputKey==`ALBDnsName`].OutputValue' \
  --output text
echo ""
echo "  Next step: Build and push images with:"
echo "    ./infrastructure/scripts/deploy-app.sh"
echo "============================================"
