// import * as express from 'express';
// import * as cors from 'cors';
// import * as bodyParser from 'body-parser';
// import * as mysql from 'mysql2';
// import * as events from './events';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const events = require('./events');

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
  .use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});