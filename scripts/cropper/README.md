# Cropper Test

- I created venv with: `python -m venv cropper_venv`
- Install dependencies: `pip install -r requirements.txt`
- Update requirements.txt: `pip freeze > requirements.txt`

- Deactivate virtual environment: `cd app && deactivate`
- Activate virtual environment: `cd scripts/cropper && source cropper_venv/bin/activate`
- Run tests (from src directory): `python -m unittest test_cropper`

- Running the tests actually works better w/o venv (no idea why, investigate later)
- You can ignore the cuda errors

