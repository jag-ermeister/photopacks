#!/bin/bash

set -e

# docker login --username=<username>
docker build -f Dockerfile -t sdxl:latest .
docker tag sdxl:latest jgustine/photo-pack-generation-image:1
docker push jgustine/photo-pack-generation-image:1

