import { Router } from 'express';
import * as express from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import * as Connection from 'mysql2/typings/mysql/lib/Connection';
import { RouterModule } from './routerModule';

export const loginRouter = (events: RouterModule) => {

  events.postRequest(
    '/login',
    'SELECT username, role, loginId from login where username = ? and password = ?',
    (req: express.Request) => [req.body.username, req.body.password]
  );

  events.putRequest(
    '/login',
    'INSERT INTO login(username,password,role,loginId) values (?, ?,?,?)',
    (req: express.Request) => [req.body.username, req.body.password]);
};
