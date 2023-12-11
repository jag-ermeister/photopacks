#!/bin/bash

set -e

docker build -f Dockerfile -t sdxl:latest .
docker tag sdxl:latest 302468449804.dkr.ecr.us-east-1.amazonaws.com/sdxl-generate-image-dev:1
docker login -u AWS -p $(aws ecr get-login-password --region us-east-1) 302468449804.dkr.ecr.us-east-1.amazonaws.com
docker push 302468449804.dkr.ecr.us-east-1.amazonaws.com/sdxl-generate-image-dev:1 # todo change version

