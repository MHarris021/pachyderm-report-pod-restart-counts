# Script purpose: Create pachyderm pipelines from all of the jsonnet defined pipelines
# Usage: ./createPipelines.sh
# Example: ./createPipelines.sh
set -x

# Docker image to use for the pipelines
imageTag=$1

# Check if the image tag is set
if [ -z "$imageTag" ]; then
  echo "Usage: $0 <imageTag>"
  exit 1
fi

# Create the pachyderm pipelines

# Create the pipeline to test datum timeout behavior
pachctl create pipeline --jsonnet ./pipelines/.jsonnet --arg imageTag="$imageTag"

