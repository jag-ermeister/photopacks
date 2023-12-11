import runpod
from gpu_info import print_gpu_memory
from file_utils import create_required_folders, move_image_files
from trainer import Trainer


def handler(job):
    """ Handler function that will be used to process jobs. """
    job_input = job['input']
    name = job_input.get('name', 'World')

    print_gpu_memory()
    create_required_folders()
    move_image_files()
    trainer = Trainer()
    trainer.enable_accelerator()
    trainer.execute_training()

    return f"Hello, {name}, you rock!"


runpod.serverless.start({"handler": handler})