#Photo Packs


#### Starting the app
- Activate virtual environment: `source venv/bin/activate`
- Run: `ngrok http 8000`
- Update the `API_URL` in the `.env` file with the ngrok URL
- Run the app: `python manage.py runserver`


### Django

- Start the virtual environment: `source venv/bin/activate`
- Install dependencies: `pip install -r requirements.txt`
- Update requirements.txt: `pip freeze > requirements.txt`
- Create super user: `python manage.py createsuperuser`
- Super user -> username: `jgustine`, password: `password`

### React
- Install dependencies: `npm install`
- Start the frontend: `npm start`
- Access the address http://localhost:8000/api/students/ and check if the API is up.

### Simulate Deployment Build
- In the frontend directory, run: `npm run relocate`
- In the main app directly, run: `python manage.py collectstatic --noinput`
- This should create a `build` and `static` directory in the `app` directory.
- Now when starting the server, you should see the react app at `http://localhost:8000`


https://github.com/diogosouza/django-react-logrocket
https://blog.logrocket.com/using-react-django-create-app-tutorial/

#### Serving react via Django static assets
- (I used this strategy): https://medium.com/codex/deploying-react-through-djangos-static-files-part-1-dev-setup-8a3a7b93c809 (paywall)
  - Slightly less paywalled: https://webcache.googleusercontent.com/search?q=cache:https://medium.com/codex/deploying-react-through-djangos-static-files-part-1-dev-setup-8a3a7b93c809&sca_esv=590226030&strip=1&vwsrc=0
  - Code repo: https://github.com/kieronjmckenna/react-in-django-static-files
- https://fractalideas.com/blog/making-react-and-django-play-well-together-hybrid-app-model/
- https://pypi.org/project/whitenoise/
- https://pypi.org/project/django-create-react-app/
- https://stackoverflow.com/questions/61270154/how-to-serve-a-react-app-with-django-on-elastic-beanstalk
