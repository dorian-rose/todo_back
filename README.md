# todo_back

Back end to do list

## Run project:

- clone this repository from github
- in terminal, navigate to local repository folder
- run "npm install" to install all dependencies (see note below)
- configure environment variables: environment variables used in this project can be found in .env.template file
- to run project in development, use command "npm run dev"
- or: to start, use command "npm start"

Using different versions of dependencies may cause conflicts. Versions used here are:

- "cors": "^2.8.5",
- "dotenv": "^16.3.1",
- "express": "^4.18.2",
- "express-validator": "^7.0.1",
- "mongoose": "^7.4.1"

## API

Endpoints and documentation for APIs created in this project can be found here: https://documenter.getpostman.com/view/26092520/2s9Y5cszqJ

## Database

- MongoDB is used. Relevant files other than root file are dbConnect.js and taskModel.js

## Code documentation

- Code has been documented using JS Docs. Documentation can be found at: https://dorian-rose.github.io/todo_back/

## Other

- Open source code for front end where these apis are consumed can be found at: https://github.com/dorian-rose/todo_back
- Deployed project (inc above front end) can be found at: https://todo-dorian.netlify.app
