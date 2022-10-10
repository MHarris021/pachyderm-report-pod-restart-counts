# Script purpose: This script is used to setup the test pipelines.
# Set noCache to true to force a rebuild of the image

# Usage: ./setupTest.sh <imageVersion> [true|false] [imageRepo] [imageName] [inputDir]

# Example: ./setupTest.sh 1.0.0
# Example: ./setupTest.sh 1.0.0 true
# Example: ./setupTest.sh 1.0.0 true my-repo my-image /tmp/test-data

# Note: The imageRepo, imageName, inputDir parameters are optional. If not set, the default values will be used.
# Additional parameters can be added to the script if needed.

# Lastly, this script assumes that the pachyderm cluster is already running and that the pachctl client is configured to connect to the cluster.
# Further, this script assumes that there is a single input directory that contains all of the data to be used for the test. And there is only one input repo as well.

set -x

# Get the parameters
imageVersion=$1
noCache=$2
imageRepo=$3
imageName=$4
inputDir=$5

# Check if all of the parameters are set
if [ -z "$imageVersion" ] ; then
  echo "Usage: $0 <imageVersion> [true|false] [imageRepo] [imageName] [inputDir]"
  exit 1
fi

# Set the default value for imageRepo
if [ -z "$imageRepo" ] ; then
  imageRepo="[imageRepo]"
fi

# Set the default value for imageName
if [ -z "$imageName" ] ; then
  imageName="[imageName]"
fi

# Create the image tag
imageTag="${imageRepo}/${imageName}:${imageVersion}"

# Set the default value for inputDir
if [ -z "$inputDir" ] ; then
  inputDir="./data/test/"
fi

# Build and push the image
./scripts/buildAndPushImage.sh "$imageRepo" "$imageName" "$imageVersion" "$noCache"

# Create the pachyderm repo
./scripts/createRepo.sh data

# Load the data
./scripts/loadTestData.sh data "$inputDir"

# Create the pipelines
./scripts/createPipelines.sh "$imageTag"