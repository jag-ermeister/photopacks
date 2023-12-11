import torch


def print_gpu_memory():
    print(f"Is cuda available? {torch.cuda.is_available()}")
    print(f"PyTorch version: {torch.__version__}")

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
