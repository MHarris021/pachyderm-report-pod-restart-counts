# Script purpose: Update the deployed pachyderm pipelines
# Usage: ./updatePipelines.sh <imageTag> [true|false]
# Example: ./updatePipelines.sh v0.0.1

set -x

# Get parameters
imageTag=$1
reprocess=$2

# Check parameters
if [ -z "$imageTag" ]; then
  echo "Usage: $0 <imageTag> [true|false]"
  exit 1
fi

# Set default reprocess
if [ -z "$reprocess" ]; then
  reprocess=false # default
fi

# Update the pipelines

# Update the pipeline for testing datum timeout behavior
pachctl update pipeline --reprocess="$reprocess" --jsonnet ./pipelines/test-datum-timeout-behavior.jsonnet imageTag="$imageTag"
