import torch

print(f"Is cuda available? {torch.cuda.is_available()}")
print(f"PyTorch version: {torch.__version__}")


def print_gpu_memory():
    if torch.cuda.is_available():
        # Get the number of GPUs available
        n_gpu = torch.cuda.device_count()
        print(f"Number of GPUs available: {n_gpu}")

        for i in range(n_gpu):
            # Get the memory usage in bytes and convert to megabytes
            total_memory = torch.cuda.get_device_properties(i).total_memory / 1e6
            free_memory = torch.cuda.memory_allocated(i) / 1e6
            used_memory = torch.cuda.memory_reserved(i) / 1e6

            print(f"GPU {i}:")
            print(f"  Total Memory: {total_memory:.2f} MB")
            print(f"  Used Memory : {used_memory:.2f} MB")
            print(f"  Free Memory : {free_memory:.2f} MB")
    else:
        print("No CUDA GPUs are available")


print_gpu_memory()

token_word = "ohwx"
class_word = "dog"
training_repeats = 40
training_root_dir = "training_images"
regularization_root_dir = "reg_images"
models_dir = "training_models"
project_name = "myProject"
output_dir = "trained_models"


#### Cell 3
training_dir = f'{training_root_dir}/{training_repeats}_{token_word} {class_word}'
reg_dir = f'{regularization_root_dir}/1_{class_word}'

# back to parent folder

import os
if os.path.exists(training_dir) == False:
  os.makedirs(training_dir)
  print(f'{training_dir} Created.')
else:
  print(f'{training_dir} already exists.')

if os.path.exists(reg_dir) == False:
  os.makedirs(reg_dir)
  print(f'{reg_dir} Created.')
else:
  print(f'{reg_dir} already exists.')

if os.path.exists(models_dir) == False:
  os.makedirs(models_dir)
  print(f'{models_dir} Created.')
else:
  print(f'{models_dir} already exists.')

# Create prompt file use for samples during training.
# first 2 prompts are the same but one has CFG=1 and the other CFG=7
# if subject likeness is strong and regular even at CFG=1 then it is an good indicator that it is overfitted
# third prompt is to check how well it responds to styling.
lines = [
    f"a photo of {token_word} {class_word} --w 1024 --h 1024 --l 7, --s 20 --d 1234567890\n",
    f"a photo of {token_word} {class_word} --w 1024 --h 1024 --l 1, --s 20 --d 1234567890\n",
    f"a portrait of {token_word} {class_word} in the style of Rembrandt --w 1024 --h 1024 --l 6, --s 20 --d 1234567890\n"
]

# Create and write to the text file
with open("prompt.txt", "w") as file:
    file.writelines(lines)

print("File 'prompt.txt' has been created.")
###