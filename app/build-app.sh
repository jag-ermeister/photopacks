#!/bin/bash

# Variables
archive="app-deployment.zip"
temp_dir="temp_deployment_dir"

# Remove previous zip file
rm -f $archive

# Create temporary directory
mkdir -p $temp_dir

# Use rsync to copy all files except those matching patterns in .gitignore to temporary directory
rsync -av \
  --exclude-from='.gitignore' \
  --exclude='.git' \
  --exclude="$temp_dir" \
  --exclude="$archive" \
  --exclude="ai" \
  --exclude="serverless" \
  ./ $temp_dir/

# Zip up the contents of the temporary directory
cd $temp_dir
zip -r "../$archive" .

# Clean up temporary directory
cd ..
rm -rf $temp_dir