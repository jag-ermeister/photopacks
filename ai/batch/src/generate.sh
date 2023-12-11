#!/bin/bash

set -e

python create_folders.py

echo "Moving training and regularization images..."
mv /app/training_images/* "/app/kohya_ss/training_images/40_ohwx dog"
mv /app/regularization_images/* "/app/kohya_ss/reg_images/1_dog"
echo "Images moved successfully."

accelerate config default --mixed_precision "bf16"

accelerate launch \
  --num_cpu_threads_per_process=4 "./sdxl_train.py" \
  --pretrained_model_name_or_path="stabilityai/stable-diffusion-xl-base-1.0" \
  --train_data_dir="/app/kohya_ss/training_images" \
  --reg_data_dir="/app/kohya_ss/reg_images" \
  --resolution="1024,1024" \
  --output_dir="{output_dir}" \
  --logging_dir="logs" \
  --save_model_as=safetensors \
  --full_bf16 \
  --output_name="24GB_Best" \
  --lr_scheduler_num_cycles="4" \
  --max_data_loader_n_workers="0" \
  --learning_rate="1e-05" \
  --lr_scheduler="constant" \
  --train_batch_size="1" \
  --max_train_steps="4160" \
  --mixed_precision="bf16" \
  --save_precision="bf16" \
  --cache_latents \
  --cache_latents_to_disk \
  --optimizer_type="Adafactor" \
  --optimizer_args scale_parameter=False relative_step=False warmup_init=False weight_decay=0.01 \
  --max_data_loader_n_workers="0" \
  --bucket_reso_steps=64 \
  --gradient_checkpointing \
  --bucket_no_upscale \
  --noise_offset=0.0 \
  --max_grad_norm=0.0 \
  --no_half_vae \
  --train_text_encoder \
  --learning_rate_te1 3e-6 \
  --learning_rate_te2 0 \
  --vae="/app/weights/sdxl_vae.safetensors" \
  --sample_sampler="euler_a" \
  --sample_prompts="prompt.txt" \
  --sample_every_n_steps=8000