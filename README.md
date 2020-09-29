# Install Project

- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.
- for run in your deveice take clone of this project and check you have installed node and angular cli in your system

## To start web application

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### configure you local mmysql server
- create a database and user for our application
- grant all permission for database to that user
- open `server/createTable.ts` file, copy value of query variable and run into your mysql client terminal to create all tables in your database.

#### For API Server

- Go to `server` directory
- open `index.ts` file and configure your MySQL server settings in it, byt changing `host`, `user`, `password` and `database`
- Run 'npm install' 
- After successfull instatling all dpendencies run `npm run start-server`
