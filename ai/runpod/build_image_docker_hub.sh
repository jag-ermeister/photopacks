#!/bin/bash

set -e

# docker login --username=<username>
docker build \
  --build-arg AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
  --build-arg AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
  --build-arg AWS_S3_REGION_NAME="$AWS_S3_REGION_NAME" \
  --build-arg ORDER_IMAGES_S3_BUCKET_NAME="$ORDER_IMAGES_S3_BUCKET_NAME" \
  -t sdxl:latest \
  -f Dockerfile .
docker tag sdxl:latest jgustine/photo-pack-generation-image:17
docker push jgustine/photo-pack-generation-image:17

