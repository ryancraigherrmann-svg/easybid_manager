#!/bin/bash

# EasyBid AWS CI/CD Pipeline Setup
# This script configures AWS resources for GitHub Actions to deploy to ECS

set -e

AWS_REGION="us-east-2"
AWS_ACCOUNT_ID="263701502489"
GITHUB_REPO_OWNER="${1:-yourusername}"
GITHUB_REPO_NAME="${2:-easybid}"

echo "🚀 EasyBid AWS CI/CD Setup"
echo "======================================"
echo "AWS Region: ${AWS_REGION}"
echo "AWS Account: ${AWS_ACCOUNT_ID}"
echo "GitHub Repo: ${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}"
echo ""

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not installed"
    exit 1
fi

# Check if authenticated
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI not authenticated. Run: aws configure"
    exit 1
fi

echo "✅ AWS CLI authenticated"
echo ""

# Step 1: Create CloudWatch Log Groups
echo "📋 Creating CloudWatch log groups..."
aws logs create-log-group --log-group-name /ecs/easybid-backend --region ${AWS_REGION} 2>/dev/null || echo "   (backend log group already exists)"
aws logs create-log-group --log-group-name /ecs/easybid-frontend --region ${AWS_REGION} 2>/dev/null || echo "   (frontend log group already exists)"
echo "✅ Log groups ready"
echo ""

# Step 2: Create/Verify IAM Roles
echo "🔐 Checking IAM roles..."

# Check if ecsTaskExecutionRole exists
if ! aws iam get-role --role-name ecsTaskExecutionRole &> /dev/null; then
    echo "   Creating ecsTaskExecutionRole..."
    aws iam create-role \
      --role-name ecsTaskExecutionRole \
      --assume-role-policy-document '{
        "Version": "2012-10-17",
        "Statement": [{
          "Effect": "Allow",
          "Principal": {"Service": "ecs-tasks.amazonaws.com"},
          "Action": "sts:AssumeRole"
        }]
      }' > /dev/null
    
    aws iam attach-role-policy \
      --role-name ecsTaskExecutionRole \
      --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy > /dev/null
    
    # Add Secrets Manager access
    aws iam put-role-policy \
      --role-name ecsTaskExecutionRole \
      --policy-name SecretsManagerAccess \
      --policy-document '{
        "Version": "2012-10-17",
        "Statement": [{
          "Effect": "Allow",
          "Action": [
            "secretsmanager:GetSecretValue",
            "secretsmanager:DescribeSecret"
          ],
          "Resource": "arn:aws:secretsmanager:'${AWS_REGION}':'${AWS_ACCOUNT_ID}':secret:easybid/*"
        }]
      }' > /dev/null
    
    echo "   ✅ Created ecsTaskExecutionRole"
else
    echo "   ✅ ecsTaskExecutionRole exists"
fi

# Check if ecsTaskRole exists
if ! aws iam get-role --role-name ecsTaskRole &> /dev/null; then
    echo "   Creating ecsTaskRole..."
    aws iam create-role \
      --role-name ecsTaskRole \
      --assume-role-policy-document '{
        "Version": "2012-10-17",
        "Statement": [{
          "Effect": "Allow",
          "Principal": {"Service": "ecs-tasks.amazonaws.com"},
          "Action": "sts:AssumeRole"
        }]
      }' > /dev/null
    
    # Add ECS Exec permissions for migrations
    aws iam put-role-policy \
      --role-name ecsTaskRole \
      --policy-name ECSExecAccess \
      --policy-document '{
        "Version": "2012-10-17",
        "Statement": [{
          "Effect": "Allow",
          "Action": [
            "ssmmessages:CreateControlChannel",
            "ssmmessages:CreateDataChannel",
            "ssmmessages:OpenControlChannel",
            "ssmmessages:OpenDataChannel"
          ],
          "Resource": "*"
        }]
      }' > /dev/null
    
    echo "   ✅ Created ecsTaskRole"
else
    echo "   ✅ ecsTaskRole exists"
fi

echo "✅ IAM roles ready"
echo ""

# Step 3: Create ECR repositories
echo "🏗️  Creating ECR repositories..."
aws ecr describe-repositories --repository-names easybid-backend --region ${AWS_REGION} &> /dev/null || \
  aws ecr create-repository --repository-name easybid-backend --region ${AWS_REGION} > /dev/null && \
  echo "   ✅ Created easybid-backend repository"

aws ecr describe-repositories --repository-names easybid-frontend --region ${AWS_REGION} &> /dev/null || \
  aws ecr create-repository --repository-name easybid-frontend --region ${AWS_REGION} > /dev/null && \
  echo "   ✅ Created easybid-frontend repository"

echo "✅ ECR repositories ready"
echo ""

# Step 4: Create GitHub OIDC Provider (if doesn't exist)
echo "🔗 Setting up GitHub OIDC..."

if ! aws iam list-open-id-connect-providers | grep -q "token.actions.githubusercontent.com"; then
    echo "   Creating GitHub OIDC provider..."
    aws iam create-open-id-connect-provider \
      --url https://token.actions.githubusercontent.com \
      --client-id-list sts.amazonaws.com \
      --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1 > /dev/null
    echo "   ✅ Created GitHub OIDC provider"
else
    echo "   ✅ GitHub OIDC provider exists"
fi

# Step 5: Create GitHub Actions IAM Role
echo "👤 Creating GitHub Actions IAM role..."

# Create trust policy
cat > /tmp/github-trust-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}:ref:refs/heads/*"
        }
      }
    }
  ]
}
EOF

if ! aws iam get-role --role-name GitHub-Actions-Role &> /dev/null; then
    echo "   Creating GitHub-Actions-Role..."
    aws iam create-role \
      --role-name GitHub-Actions-Role \
      --assume-role-policy-document file:///tmp/github-trust-policy.json \
      --description "GitHub Actions role for EasyBid deployment" > /dev/null
else
    echo "   Updating GitHub-Actions-Role trust policy..."
    aws iam update-assume-role-policy \
      --role-name GitHub-Actions-Role \
      --policy-document file:///tmp/github-trust-policy.json
fi

# Create and attach policy
cat > /tmp/github-actions-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:PutImage",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecs:UpdateService",
        "ecs:DescribeServices",
        "ecs:DescribeTaskDefinition",
        "ecs:ListServices",
        "ecs:DescribeContainerInstances"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "iam:PassRole"
      ],
      "Resource": [
        "arn:aws:iam::AWS_ACCOUNT_ID:role/ecsTaskExecutionRole",
        "arn:aws:iam::AWS_ACCOUNT_ID:role/ecsTaskRole"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecs:RegisterTaskDefinition"
      ],
      "Resource": "arn:aws:ecs:AWS_REGION:AWS_ACCOUNT_ID:task-definition/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecs:ListTasks",
        "ecs:ExecuteCommand"
      ],
      "Resource": "*"
    }
  ]
}
EOF

# Replace placeholders
sed -i "s/AWS_ACCOUNT_ID/${AWS_ACCOUNT_ID}/g" /tmp/github-actions-policy.json
sed -i "s/AWS_REGION/${AWS_REGION}/g" /tmp/github-actions-policy.json

aws iam put-role-policy \
  --role-name GitHub-Actions-Role \
  --policy-name GitHub-Actions-Policy \
  --policy-document file:///tmp/github-actions-policy.json

echo "   ✅ GitHub-Actions-Role configured"
echo "✅ GitHub OIDC integration ready"
echo ""

# Step 6: Create Secrets Manager entries
echo "🔒 Setting up AWS Secrets Manager..."
echo ""
echo "You need to create the database secret. Run this command:"
echo ""
echo "aws secretsmanager create-secret \\"
echo "  --name easybid/database-url \\"
echo "  --secret-string \"postgresql://easybid:PASSWORD@easybid.xxxxx.us-east-2.rds.amazonaws.com:5432/easybid\" \\"
echo "  --region ${AWS_REGION}"
echo ""
echo "Replace PASSWORD with your actual RDS password"
echo "Replace xxxxx with your RDS endpoint prefix"
echo ""

# Check if database secret exists
if aws secretsmanager describe-secret --secret-id easybid/database-url --region ${AWS_REGION} &> /dev/null; then
    echo "✅ Database secret already exists"
else
    echo "⚠️  Please create the database secret manually (see command above)"
fi

echo ""

# Step 7: Summary
echo "======================================"
echo "✅ CI/CD Pipeline Setup Complete!"
echo "======================================"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Create RDS Secret (if not done):"
echo "   aws secretsmanager create-secret \\"
echo "   --name easybid/database-url \\"
echo "   --secret-string \"postgresql://easybid:PASSWORD@easybid.xxxxx.us-east-2.rds.amazonaws.com:5432/easybid\" \\"
echo "   --region ${AWS_REGION}"
echo ""
echo "2. Update GitHub workflow file:"
echo "   - Edit: .github/workflows/deploy.yml"
echo "   - Change: VITE_GRAPHQL_URL and VITE_API_URL to your domain"
echo ""
echo "3. Push to GitHub:"
echo "   git add .github/workflows/deploy.yml"
echo "   git commit -m 'Add CI/CD pipeline'"
echo "   git push origin main"
echo ""
echo "4. Monitor deployment:"
echo "   Go to: https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/actions"
echo ""

# Cleanup
rm -f /tmp/github-trust-policy.json /tmp/github-actions-policy.json

echo "🚀 Your CI/CD pipeline is ready!"
