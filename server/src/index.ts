import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as mysql from 'mysql2';
import { RouterModule }from './routerModule';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'banking_admin',
    password: 'nenu',
    database: 'banking_cbd',
    multipleStatements: true
});

const port = process.env.PORT || 8080;
const eve = new RouterModule(connection);
const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(eve.getRouter());

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});