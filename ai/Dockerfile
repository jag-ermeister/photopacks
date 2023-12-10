FROM nvidia/cuda:11.8.0-runtime-ubuntu20.04

WORKDIR /app

COPY ./regularization_images /app/regularization_images
COPY ./training_images /app/training_images
COPY ./weights /app/weights

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
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


RUN apt-get update -y && apt-get install -y libgl1
RUN apt update -y && apt install -y python3-tk
RUN pip install torch==2.0.1+cu118 torchvision==0.15.2+cu118 --extra-index-url https://download.pytorch.org/whl/cu118 --root-user-action=ignore # no_verify leave this to specify not checking this a verification stage
RUN pip install xformers==0.0.20 bitsandbytes==0.35.0 --root-user-action=ignore
RUN pip install tensorboard==2.12.3 tensorflow==2.12.0 wheel --root-user-action=ignore
RUN pip install protobuf==3.20.3 --root-user-action=ignore
RUN pip install tensorrt --root-user-action=ignore
RUN pip install gdown --root-user-action=ignore
RUN pip install github-clone --root-user-action=ignore
RUN pip install accelerate==0.23.0 --root-user-action=ignore
RUN pip install transformers==4.30.2 --root-user-action=ignore
RUN pip install diffusers[torch]==0.18.2 --root-user-action=ignore
RUN pip install ftfy==6.1.1 --root-user-action=ignore
RUN pip install albumentations==1.3.0 --root-user-action=ignore
RUN pip install opencv-python==4.7.0.68 --root-user-action=ignore
RUN pip install einops==0.6.0 --root-user-action=ignore
RUN pip install pytorch-lightning==1.9.0 --root-user-action=ignore
RUN pip install bitsandbytes==0.35.0 --root-user-action=ignore
RUN pip install tensorboard==2.12.0 --root-user-action=ignore
RUN pip install safetensors==0.3.1 --root-user-action=ignore
RUN pip install altair==4.2.2 --root-user-action=ignore
RUN pip install easygui==0.98.3 --root-user-action=ignore
RUN pip install toml==0.10.2 --root-user-action=ignore
RUN pip install voluptuous==0.13.1 --root-user-action=ignore
RUN pip install huggingface-hub==0.15.1 --root-user-action=ignore
RUN pip install invisible-watermark==0.2.0  --root-user-action=ignore
RUN pip install open-clip-torch==2.20.0 --root-user-action=ignore
RUN pip install protobuf==3.20.3 --root-user-action=ignore

# TODO tag a specific version of this
RUN git clone https://github.com/bmaltais/kohya_ss.git
RUN cd kohya_ss && git checkout sd-scripts-dev && pip install -e . --root-user-action=ignore

WORKDIR /app/kohya_ss

COPY ./src /app/kohya_ss

CMD ["./app/kohya_ss/generate.sh"]
