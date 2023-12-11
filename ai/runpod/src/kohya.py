import logging
import subprocess

logger = logging.getLogger()


class Kohya:
    def __init__(self):
        pass

    def enable_accelerator(self):
        logger.info("Enable BF16 on accelerator...")
        cmd = ["accelerate", "config", "default", "--mixed_precision", "bf16"]
        process = subprocess.Popen(
            cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT
        )

        for line in iter(process.stdout.readline, b""):
            logger.info(line.decode())

        process.stdout.close()
        process.wait()

        exit_code = process.returncode
        if exit_code != 0:
            raise RuntimeError(f"Subprocess failed with exit code {exit_code}")

    def execute_training(self):
        logger.info("Starting training...")
        cmd = [
            "accelerate",
            "launch",
            "--num_cpu_threads_per_process=4",
            "./sdxl_train.py",
            "--pretrained_model_name_or_path=stabilityai/stable-diffusion-xl-base-1.0",
            "--train_data_dir=/app/kohya_ss/training_images",
            "--reg_data_dir=/app/kohya_ss/reg_images",
            "--resolution=1024,1024",
            "--output_dir=trained_models",
            "--logging_dir=logs",
            "--save_model_as=safetensors",
            "--full_bf16",
            "--output_name=24GB_Best",
            "--lr_scheduler_num_cycles=4",
            "--max_data_loader_n_workers=0",
            "--learning_rate=1e-05",
            "--lr_scheduler=constant",
            "--train_batch_size=1",
            "--max_train_steps=4160",
            "--mixed_precision=bf16",
            "--save_precision=bf16",
            "--cache_latents",
            "--cache_latents_to_disk",
            "--optimizer_type=Adafactor",
            "--optimizer_args",
            "scale_parameter=False",
            "relative_step=False",
            "warmup_init=False",
            "weight_decay=0.01",
            "--max_data_loader_n_workers=0",
            "--bucket_reso_steps=64",
            "--gradient_checkpointing",
            "--bucket_no_upscale",
            "--noise_offset=0.0",
            "--max_grad_norm=0.0",
            "--no_half_vae",
            "--train_text_encoder",
            "--learning_rate_te1",
            "3e-6",
            "--learning_rate_te2",
            "0.0",
            "--vae=/app/weights/sdxl_vae.safetensors",
            "--sample_sampler=euler_a",
            "--sample_prompts=prompts.txt",
            "--sample_every_n_steps=8000"
        ]

        process = subprocess.Popen(
            cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )

        # Read both stdout and stderr
        stdout, stderr = process.communicate()

        # Log the stdout
        if stdout:
            logger.info(stdout.decode())

        # Get the exit code
        exit_code = process.returncode

        # If the process failed, raise an exception with the error details
        if exit_code != 0:
            error_message = stderr.decode().strip()
            if error_message:
                raise RuntimeError(f"Subprocess failed with exit code {exit_code}: {error_message}")
            else:
                raise RuntimeError(f"Subprocess failed with exit code {exit_code}")

    def execute_inference(self):
        logger.info("Executing inference...")
        cmd = [
            "python",
            "sdxl_gen_img.py",
            "--ckpt",
            "/app/kohya_ss/trained_models/24GB_Best.safetensors",
            "--prompt",
            "portrait of ((ohwx dog)) as a zombie, dark, art by greg rutkowski, detailed, matte painting, trending on artstation",
            "--images_per_prompt",
            "4",
            "--outdir",
            "/app/kohya_ss/inference_results",
            "--scale",
            "7.0",
            "--xformers",
            "--bf16",
            "--steps",
            "25"
        ]
        process = subprocess.Popen(
            cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT
        )

        for line in iter(process.stdout.readline, b""):
            logger.info(line.decode())

        process.stdout.close()
        process.wait()

        exit_code = process.returncode
        if exit_code != 0:
            raise RuntimeError(f"Subprocess failed with exit code {exit_code}")
