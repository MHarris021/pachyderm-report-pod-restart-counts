# Remove the output directory contents
# usage: cleanOutput.sh [output directory]

set -x

outputDir="$1"

# Check if the user has passed the output directory
if [ -z "$outputDir" ]; then
    outputDir="./out"
fi

# Remove the output directory contents
rm -rf "${outputDir:?}/*"
