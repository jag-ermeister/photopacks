import logging
import subprocess
import threading

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

    def execute_training(self, num_steps):
        logger.info("Starting training...")
        logger.info(f"Number of steps: {num_steps}")
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
            f"--max_train_steps={num_steps}",
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
            "--sample_every_n_steps=10000"
        ]

        def stream_reader(stream, logger, is_stderr=False):
            for line in iter(stream.readline, ''):
                line = line.strip()
                if is_stderr:
                    logger.error(line)
                else:
                    logger.info(line)

        process = subprocess.Popen(
            cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, bufsize=1
        )

        stdout_thread = threading.Thread(target=stream_reader, args=(process.stdout, logger))
        stderr_thread = threading.Thread(target=stream_reader, args=(process.stderr, logger, True))
        stdout_thread.start()
        stderr_thread.start()

        process.wait()
        stdout_thread.join()
        stderr_thread.join()

        exit_code = process.returncode
        if exit_code != 0:
            raise RuntimeError(f"Subprocess failed with exit code {exit_code}")

    def execute_inference(self, model_type, prompts, images_per_prompt):
        logger.info("Executing inference...")
        for prompt in prompts:
            modified_prompt = prompt.replace("MODELNAME", f"ohwx {model_type}")
            cmd = [
                "python",
                "sdxl_gen_img.py",
                "--ckpt",
                "/app/kohya_ss/trained_models/24GB_Best.safetensors",
                "--prompt",
                f"{modified_prompt}",
                "--images_per_prompt",
                f"{images_per_prompt}",
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
