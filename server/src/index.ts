import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as mysql from 'mysql2';
import { RouterModule }from './routerModule';

const connection = mysql.createConnection({
    host: '192.168.0.205',
    user: 'banking_admin',
    password: 'nenu',
    database: 'cbd_banking',
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