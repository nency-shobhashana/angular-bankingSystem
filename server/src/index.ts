import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as mysql from 'mysql2';
import {createRouter }from './events';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'banking_admin',
    password: 'nenu',
    database: 'cbd_banking'
});

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(createRouter(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});