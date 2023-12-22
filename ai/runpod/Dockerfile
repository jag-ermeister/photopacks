# Base image -> https://github.com/runpod/containers/blob/main/official-templates/base/Dockerfile
# DockerHub -> https://hub.docker.com/r/runpod/base/tags
FROM runpod/base:0.4.0-cuda11.8.0

WORKDIR /app

COPY ./regularization_images /app/regularization_images
COPY ./weights /app/weights
COPY ./yolov5x.pt /app/yolov5x.pt
COPY ./mimic-dev-391917-f58102d4a50c.json /app/mimic-dev-391917-f58102d4a50c.json

#--- Optional: System dependencies ---
ENV DEBIAN_FRONTEND=noninteractive
COPY builder/setup.sh /setup.sh
RUN /bin/bash /setup.sh && \
    rm /setup.sh


# Python dependencies
COPY builder/requirements.txt /requirements.txt
RUN python -m pip install --upgrade pip && \
    python -m pip install --upgrade -r /requirements.txt --no-cache-dir && \
    rm /requirements.txt


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
RUN pip install yolov5==7.0.10 --root-user-action=ignore
# These two are for image captioning
RUN pip install google-cloud-aiplatform==1.38.1 --root-user-action=ignore
RUN pip install google-auth==2.25.2 --root-user-action=ignore


ARG AWS_ACCESS_KEY_ID
RUN test -n "$AWS_ACCESS_KEY_ID" || (echo "Please set the AWS_ACCESS_KEY_ID build argument" && false)
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID

ARG AWS_SECRET_ACCESS_KEY
RUN test -n "$AWS_SECRET_ACCESS_KEY" || (echo "Please set the AWS_SECRET_ACCESS_KEY build argument" && false)
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

ARG AWS_S3_REGION_NAME
RUN test -n "$AWS_S3_REGION_NAME" || (echo "Please set the AWS_S3_REGION_NAME build argument" && false)
ENV AWS_S3_REGION_NAME=$AWS_S3_REGION_NAME


# TODO tag a specific version of this - ideally from master branch
# Perhaps I should fork this repo
# 39bb319d4cac05d7da054ee726f86061e629574d is from 11/28/23
RUN git clone https://github.com/bmaltais/kohya_ss.git
RUN cd kohya_ss \
  && git checkout sd-scripts-dev \
  && git checkout 39bb319d4cac05d7da054ee726f86061e629574d \
  && pip install -e . --root-user-action=ignore

WORKDIR /app/kohya_ss

COPY ./src /app/kohya_ss

CMD python -u /app/kohya_ss/handler.py