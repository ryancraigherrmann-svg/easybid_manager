#!/bin/bash
# =============================================================================
# teardown.sh — Remove all EasyBid CloudFormation stacks
#
# Deletes stacks in reverse order (services → ALB → cluster → network).
# ECR images are deleted with the repos. Secrets Manager entries are NOT deleted.
# =============================================================================
set -e

AWS_REGION="us-east-2"

echo "============================================"
echo "  EasyBid — Infrastructure Teardown"
echo "  WARNING: This will delete all AWS resources"
echo "============================================"
echo ""
read -p "Are you sure? Type 'yes' to continue: " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
  echo "Aborted."
  exit 0
fi

delete_stack() {
  local STACK_NAME=$1
  echo "── Deleting: ${STACK_NAME} ──"

  if aws cloudformation describe-stacks --stack-name $STACK_NAME --region $AWS_REGION &>/dev/null; then
    aws cloudformation delete-stack --stack-name $STACK_NAME --region $AWS_REGION
    echo "  Waiting..."
    aws cloudformation wait stack-delete-complete --stack-name $STACK_NAME --region $AWS_REGION
    echo "  ✓ Deleted"
  else
    echo "  Stack doesn't exist, skipping"
  fi
}

# Delete in reverse dependency order
delete_stack "easybid-services"
delete_stack "easybid-alb"
delete_stack "easybid-cluster"
delete_stack "easybid-network"

echo ""
echo "============================================"
echo "  All stacks deleted."
echo "  Note: Secrets Manager entries were NOT deleted."
echo "  To delete secrets:"
echo "    aws secretsmanager delete-secret --secret-id easybid/database-url --region ${AWS_REGION}"
echo "    aws secretsmanager delete-secret --secret-id easybid/jwt-secret --region ${AWS_REGION}"
echo "============================================"
