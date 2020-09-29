import { Router } from 'express';
import * as express from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import * as Connection from 'mysql2/typings/mysql/lib/Connection';
import { RouterModule } from './routerModule';

export const loginRouter = (events: RouterModule) => {

  events.postRequest(
    '/login',
    'SELECT username, role, cust_id, emp_id from login where username = ? and password = ?',
    (req: express.Request) => [req.body.username, req.body.password]
  );

  events.getRequest(
    '/nonManager',
    `SELECT * from login WHERE role=1`
    , () => []);

  events.postRequest(
    '/promoteManager',
    'UPDATE login SET ' +
    'role=0' +
    ' WHERE role=1 AND emp_id = ?',
    (req: express.Request) => {
      return [
        req.body.emp_id,
      ];
    }
  );
};
