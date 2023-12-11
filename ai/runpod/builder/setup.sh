#!/bin/bash

# NOTE: This script is not ran by default for the template docker image.
#       If you use a custom base image you can add your required system dependencies here.

set -e # Stop script on error
apt-get update && apt-get upgrade -y # Update System

# Install System Dependencies
# - openssh-server: for ssh access and web terminal
apt-get install -y --no-install-recommends software-properties-common curl git openssh-server

# Install Python 3.10
add-apt-repository ppa:deadsnakes/ppa -y
apt-get update && apt-get install -y --no-install-recommends python3.10 python3.10-dev python3.10-distutils
update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.10 1

# Install pip for Python 3.10
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py

# Clean up, remove unnecessary packages and help reduce image size
apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*


# This is added by Jeremy
apt-get update \
    && apt-get install -y software-properties-common \
    && add-apt-repository ppa:deadsnakes/ppa \
    && apt-get install -y --no-install-recommends \
    curl wget ca-certificates git \
    python3.9 python3.9-distutils python3.9-dev \
    build-essential manpages-dev \
    libgl1-mesa-glx \
    pkg-config libcairo2-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && update-alternatives --install /usr/bin/python python /usr/bin/python3.9 1 \
    && curl -O https://bootstrap.pypa.io/get-pip.py \
    && python get-pip.py \
    && rm get-pip.py