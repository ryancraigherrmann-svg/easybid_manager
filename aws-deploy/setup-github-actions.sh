#!/bin/bash

# GitHub Actions IAM Role Setup
# Run this once to enable GitHub Actions to deploy to AWS

AWS_REGION="us-east-2"
AWS_ACCOUNT_ID="263701502489"
GITHUB_REPO_OWNER="yourusername"  # Change this to your GitHub username
GITHUB_REPO_NAME="easybid"         # or your actual repo name

echo "Setting up GitHub Actions IAM Role..."
echo "Account ID: ${AWS_ACCOUNT_ID}"
echo "Region: ${AWS_REGION}"
echo "GitHub Repo: ${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}"
echo ""

# Create the trust policy for GitHub OIDC
cat > /tmp/trust-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::AWS_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:GITHUB_REPO:ref:refs/heads/*"
        }
      }
    }
  ]
}
EOF

# Replace placeholders
sed -i "s/AWS_ACCOUNT_ID/${AWS_ACCOUNT_ID}/g" /tmp/trust-policy.json
sed -i "s|GITHUB_REPO|${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}|g" /tmp/trust-policy.json

# Create the IAM role
echo "Creating IAM role..."
aws iam create-role \
  --role-name GitHub-Actions-Role \
  --assume-role-policy-document file:///tmp/trust-policy.json \
  --description "GitHub Actions role for EasyBid deployment" \
  --region ${AWS_REGION}

# Create policy for GitHub Actions
cat > /tmp/github-actions-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
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
        "ecs:DescribeContainerInstances",
        "ecs:ListServices",
        "ecs:ListTaskDefinitions"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "iam:PassRole"
      ],
      "Resource": [
        "arn:aws:iam::${AWS_ACCOUNT_ID}:role/ecsTaskExecutionRole",
        "arn:aws:iam::${AWS_ACCOUNT_ID}:role/ecsTaskRole"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecs:RegisterTaskDefinition"
      ],
      "Resource": "arn:aws:ecs:${AWS_REGION}:${AWS_ACCOUNT_ID}:task-definition/*"
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

# Replace AWS account ID
sed -i "s/\${AWS_ACCOUNT_ID}/${AWS_ACCOUNT_ID}/g" /tmp/github-actions-policy.json
sed -i "s/\${AWS_REGION}/${AWS_REGION}/g" /tmp/github-actions-policy.json

# Attach policy to role
echo "Attaching policy to role..."
aws iam put-role-policy \
  --role-name GitHub-Actions-Role \
  --policy-name GitHub-Actions-Policy \
  --policy-document file:///tmp/github-actions-policy.json

echo ""
echo "✅ GitHub Actions IAM Role created successfully!"
echo ""
echo "Next steps:"
echo "1. Push the .github/workflows/deploy.yml file to your GitHub repo"
echo "2. Update the VITE_GRAPHQL_URL in the workflow file with your actual domain"
echo "3. Add GitHub secrets (if needed) - currently using OIDC"
echo ""

# Cleanup
rm -f /tmp/trust-policy.json /tmp/github-actions-policy.json
