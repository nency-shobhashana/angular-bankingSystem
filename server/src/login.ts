import { Router } from 'express';
import * as express from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import * as Connection from 'mysql2/typings/mysql/lib/Connection';
import { RouterModule } from './routerModule';

export const loginRouter = (events: RouterModule) => {
  
  events.postRequest(
    '/login',
    'SELECT username from login where username = ? and password = ?',
    (req: express.Request) => { return [req.body.username, req.body.password] }
  );

  events.putRequest(
    '/login',
    'INSERT INTO login (username, password) VALUES (?,?)',
    (req: express.Request) => { return [req.body.username, req.body.password] });
};
