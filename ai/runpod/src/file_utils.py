import os
import shutil


def create_required_folders(model_type):
    token_word = "ohwx"
    class_word = model_type
    training_repeats = 40
    training_root_dir = "training_images"
    regularization_root_dir = "reg_images"
    models_dir = "training_models"
    project_name = "myProject"

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

    return f"/app/kohya_ss/{training_dir}"


def move_files(src, dest):
    for filename in os.listdir(src):
        shutil.move(os.path.join(src, filename), dest)


def move_image_files(model_type):
    regularization_src = f'/app/regularization_images/{model_type}/'
    regularization_dest = f'/app/kohya_ss/reg_images/1_{model_type}/'
    print("Moving regularization images.")
    print(f"From:{regularization_src}")
    print(f"To:{regularization_dest}")

    move_files(regularization_src, regularization_dest)

    print("Images moved successfully.")
