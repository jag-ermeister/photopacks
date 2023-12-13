runpod_webhook_successful = {
    'delayTime': 5514,
    'executionTime': 970161,
    'id': '319fa4b3-0269-45ca-b588-613d5704a8ff-u1',
    'input': {
        'model_type': 'woman',
        'num_steps': 100,
        'order_id': '706af5de-a6c8-40d7-861e-fd589da6dc64',
        'prompts': [
            'christmas MODELNAME by christian giles, in the style of digital illustration, narrative elegance, uhd image, comic art, american scene painting, interior scenes, handsome',
            'portrait of MODELNAME with glasses in an ugly christmas sweater and a beanie, in the style of colourful fantasy realism the helsinki school, detailed science fiction illustrations, 32k uhd, white background optical illusion paintings, lively illustrations',
            'portrait of MODELNAME in an ugly christmas sweater and a beanie, in the style of colourful fantasy realism the helsinki school, detailed science fiction illustrations, 32k uhd, white background optical illusion paintings, lively illustrations',
            'close up of MODELNAME wearing christmas sweater, under the christmas tree, in the snow, in the style of national geographic photo, studio lighting, detailed and sharp, album covers, editorial photography, Award winning photography',
            'a christmas  MODELNAME on white background with santa hat, in the style of rob hefferan, depictions of animals, avocadopunk, sketchfab, glistening',
            'a christmas MODELNAME mignon bébé chien thème Noël style Pixar illustration digital',
            'Christmas MODELNAME, detailed matte painting, deep color, fantastical, intricate detail, splash screen, complementary colors, fantasy concept art, 8k resolution trending on Artstation Unreal Engine 5',
            'MODELNAME the cartoon comic book sitting with santa hat on',
            'the vintage MODELNAME sitting by a christmas tree with gifts, vintage christmas scene, perfect composition, muted colors, oil painting by James Gurney',
            'Whimsical Christmas MODELNAME with antlers decorated with Christmas ornaments and glowing lights, whimsical winter background, by Alexander Jansson,'
        ],
        'results_url': 'https://a878-75-166-61-47.ngrok-free.app/api/orders/706af5de-a6c8-40d7-861e-fd589da6dc64'
    },
    'output': 'Hello, 706af5de-a6c8-40d7-861e-fd589da6dc64, you rock!',
    'status': 'COMPLETED',
    'webhook': 'https://a878-75-166-61-47.ngrok-free.app/api/orders/706af5de-a6c8-40d7-861e-fd589da6dc64'
}

runpod_webhook_failure = {
    'delayTime': 8673,
    'error': '{"error_type": "<class \'RuntimeError\'>", "error_message": "Subprocess failed with exit code 1: Traceback (most recent call last):\\n  File \\"/usr/local/bin/accelerate\\", line 8, in <module>\\n    sys.exit(main())\\n  File \\"/usr/local/lib/python3.9/dist-packages/accelerate/commands/accelerate_cli.py\\", line 47, in main\\n    args.func(args)\\n  File \\"/usr/local/lib/python3.9/dist-packages/accelerate/commands/launch.py\\", line 986, in launch_command\\n    simple_launcher(args)\\n  File \\"/usr/local/lib/python3.9/dist-packages/accelerate/commands/launch.py\\", line 628, in simple_launcher\\n    raise subprocess.CalledProcessError(returncode=process.returncode, cmd=cmd)\\nsubprocess.CalledProcessError: Command \'[\'/usr/bin/python\', \'./sdxl_train.py\', \'--pretrained_model_name_or_path=stabilityai/stable-diffusion-xl-base-1.0\', \'--train_data_dir=/app/kohya_ss/training_images\', \'--reg_data_dir=/app/kohya_ss/reg_images\', \'--resolution=1024,1024\', \'--output_dir=trained_models\', \'--logging_dir=logs\', \'--save_model_as=safetensors\', \'--full_bf16\', \'--output_name=24GB_Best\', \'--lr_scheduler_num_cycles=4\', \'--max_data_loader_n_workers=0\', \'--learning_rate=1e-05\', \'--lr_scheduler=constant\', \'--train_batch_size=1\', \'--max_train_steps=100\', \'--mixed_precision=bf16\', \'--save_precision=bf16\', \'--cache_latents\', \'--cache_latents_to_disk\', \'--optimizer_type=Adafactor\', \'--optimizer_args\', \'scale_parameter=False\', \'relative_step=False\', \'warmup_init=False\', \'weight_decay=0.01\', \'--max_data_loader_n_workers=0\', \'--bucket_reso_steps=64\', \'--gradient_checkpointing\', \'--bucket_no_upscale\', \'--noise_offset=0.0\', \'--max_grad_norm=0.0\', \'--no_half_vae\', \'--train_text_encoder\', \'--learning_rate_te1\', \'3e-6\', \'--learning_rate_te2\', \'0.0\', \'--vae=/app/weights/sdxl_vae.safetensors\', \'--sample_sampler=euler_a\', \'--sample_prompts=prompts.txt\', \'--sample_every_n_steps=8000\']\' died with <Signals.SIGILL: 4>.", "error_traceback": "Traceback (most recent call last):\\n  File \\"/usr/local/lib/python3.9/dist-packages/runpod/serverless/modules/rp_job.py\\", line 134, in run_job\\n    handler_return = handler(job)\\n  File \\"/app/kohya_ss/handler.py\\", line 28, in handler\\n    kohya.execute_training(num_steps)\\n  File \\"/app/kohya_ss/kohya.py\\", line 97, in execute_training\\n    raise RuntimeError(f\\"Subprocess failed with exit code {exit_code}: {error_message}\\")\\nRuntimeError: Subprocess failed with exit code 1: Traceback (most recent call last):\\n  File \\"/usr/local/bin/accelerate\\", line 8, in <module>\\n    sys.exit(main())\\n  File \\"/usr/local/lib/python3.9/dist-packages/accelerate/commands/accelerate_cli.py\\", line 47, in main\\n    args.func(args)\\n  File \\"/usr/local/lib/python3.9/dist-packages/accelerate/commands/launch.py\\", line 986, in launch_command\\n    simple_launcher(args)\\n  File \\"/usr/local/lib/python3.9/dist-packages/accelerate/commands/launch.py\\", line 628, in simple_launcher\\n    raise subprocess.CalledProcessError(returncode=process.returncode, cmd=cmd)\\nsubprocess.CalledProcessError: Command \'[\'/usr/bin/python\', \'./sdxl_train.py\', \'--pretrained_model_name_or_path=stabilityai/stable-diffusion-xl-base-1.0\', \'--train_data_dir=/app/kohya_ss/training_images\', \'--reg_data_dir=/app/kohya_ss/reg_images\', \'--resolution=1024,1024\', \'--output_dir=trained_models\', \'--logging_dir=logs\', \'--save_model_as=safetensors\', \'--full_bf16\', \'--output_name=24GB_Best\', \'--lr_scheduler_num_cycles=4\', \'--max_data_loader_n_workers=0\', \'--learning_rate=1e-05\', \'--lr_scheduler=constant\', \'--train_batch_size=1\', \'--max_train_steps=100\', \'--mixed_precision=bf16\', \'--save_precision=bf16\', \'--cache_latents\', \'--cache_latents_to_disk\', \'--optimizer_type=Adafactor\', \'--optimizer_args\', \'scale_parameter=False\', \'relative_step=False\', \'warmup_init=False\', \'weight_decay=0.01\', \'--max_data_loader_n_workers=0\', \'--bucket_reso_steps=64\', \'--gradient_checkpointing\', \'--bucket_no_upscale\', \'--noise_offset=0.0\', \'--max_grad_norm=0.0\', \'--no_half_vae\', \'--train_text_encoder\', \'--learning_rate_te1\', \'3e-6\', \'--learning_rate_te2\', \'0.0\', \'--vae=/app/weights/sdxl_vae.safetensors\', \'--sample_sampler=euler_a\', \'--sample_prompts=prompts.txt\', \'--sample_every_n_steps=8000\']\' died with <Signals.SIGILL: 4>.\\n", "hostname": "avl10ieqjwdxzo-64410bad", "worker_id": "avl10ieqjwdxzo", "runpod_version": "1.4.0"}',
    'executionTime': 78351,
    'id': 'e7c64a2f-6f25-49fc-b8e6-a65f29649bf7-u1',
    'input': {
        'model_type': 'woman',
        'num_steps': 100,
        'order_id': '349a24e8-737f-4469-9961-4cebff8d2e58',
        'prompts': [
            'christmas MODELNAME by christian giles, in the style of digital illustration, narrative elegance, uhd image, comic art, american scene painting, interior scenes, handsome',
            'portrait of MODELNAME with glasses in an ugly christmas sweater and a beanie, in the style of colourful fantasy realism the helsinki school, detailed science fiction illustrations, 32k uhd, white background optical illusion paintings, lively illustrations',
            'portrait of MODELNAME in an ugly christmas sweater and a beanie, in the style of colourful fantasy realism the helsinki school, detailed science fiction illustrations, 32k uhd, white background optical illusion paintings, lively illustrations',
            'close up of MODELNAME wearing christmas sweater, under the christmas tree, in the snow, in the style of national geographic photo, studio lighting, detailed and sharp, album covers, editorial photography, Award winning photography',
            'a christmas  MODELNAME on white background with santa hat, in the style of rob hefferan, depictions of animals, avocadopunk, sketchfab, glistening',
            'a christmas MODELNAME mignon bébé chien thème Noël style Pixar illustration digital',
            'Christmas MODELNAME, detailed matte painting, deep color, fantastical, intricate detail, splash screen, complementary colors, fantasy concept art, 8k resolution trending on Artstation Unreal Engine 5',
            'MODELNAME the cartoon comic book sitting with santa hat on',
            'the vintage MODELNAME sitting by a christmas tree with gifts, vintage christmas scene, perfect composition, muted colors, oil painting by James Gurney',
            'Whimsical Christmas MODELNAME with antlers decorated with Christmas ornaments and glowing lights, whimsical winter background, by Alexander Jansson,'
        ],
        'results_url': 'https://a878-75-166-61-47.ngrok-free.app/api/orders/349a24e8-737f-4469-9961-4cebff8d2e58'
    },
    'status': 'FAILED',
    'webhook': 'https://a878-75-166-61-47.ngrok-free.app/api/orders/349a24e8-737f-4469-9961-4cebff8d2e58'
}
