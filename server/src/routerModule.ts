import * as  express from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import * as Connection from 'mysql2/typings/mysql/lib/Connection';
import { loginRouter } from './login';
import { employeeRouter } from './employee';
import { customerRouter } from './customer';
import { accountRouter } from './account';
import { loanAccountRouter } from './loanAccount';
import { creditcardRouter } from './creditcard';
import { debitcardRouter } from './debitcard';
import { paymentRouter } from './payment';
import { transactionRouter } from './transaction';
import { approveAccountRouter } from './appoveAccount';

export class RouterModule {
  db: Connection;
  private router = express.Router();

  constructor(db: Connection) {
    this.db = db;
  }
  getRequest = (path: string, query: string, values: (request: express.Request) => string[]) => {
    this.router.get(path, (req, res) => {
      this.db.query(
        query,
        values(req),
        (error, result) => {
          console.log('/***********/');
          console.log(query);
          console.log(result);
          console.log('/***********/');
          if (error) {
            res.status(500).json({ status: 'error' });
          } else if ((result as RowDataPacket[]).length <= 0) {
            res.status(204).send();
          } else {
            res.status(200).json({ data: result });
          }
        }
      );
    });
  }

  postRequest = (path: string, query: string, values: (request: express.Request) => string[]) => {
    this.router.post(path, (req, res) => {
      this.db.query(
        query,
        values(req),
        (error, result) => {
          console.log('/***********/');
          console.log(query);
          console.log(result);
          console.log('/***********/');
          if (error) {
            res.status(500).json({ status: 'error' });
          } else if ((result as RowDataPacket[]).length <= 0) {
            res.status(204).send();
          } else {
            res.status(200).json({ data: result[0] });
          }
        }
      );
    });
  }

  putRequest = (path: string, query: string, values: (request: express.Request) => string[]) => {
    this.router.put(path, (req, res) => {
      this.db.query(
        query,
        values(req),
        (error, result: ResultSetHeader) => {
          console.log('/***********/');
          console.log(query);
          console.log(result);
          console.log('/***********/');
          if (error) {
            console.log(error);
            res.status(500).json({ status: 'error' });
          } else {
            console.log(result);
            res.status(200).json({ data: result.insertId });
          }
        }
      );
    });
  }

  putRequestMultiQuery = (path: string, query: string, values: (request: express.Request) => string[]) => {
    this.router.put(path, (req, res) => {
      this.db.query(
        query,
        values(req),
        (error, result: ResultSetHeader) => {
          console.log('/***********/');
          console.log(query);
          console.log(result);
          console.log('/***********/');
          if (error) {
            console.log(error);
            res.status(500).json({ status: 'error' });
          } else {
            console.log(result);
            res.status(200).json({ data: result.insertId });
          }
        }
      );
    });
  }

  deleteRequest = (path: string, query: string, values: (request: express.Request) => string[]) => {
    this.router.delete(path, (req, res) => {
      this.db.query(
        query,
        values(req),
        (error, result: ResultSetHeader) => {
          console.log('/***********/');
          console.log(query);
          console.log(result);
          console.log('/***********/');
          if (error) {
            res.status(500).json({ status: 'error' });
          } else {
            res.status(200).json({ data: result.affectedRows });
          }
        }
      );
    });
  }

  public getRouter(): express.Router {
    loginRouter(this);
    employeeRouter(this);
    customerRouter(this);
    accountRouter(this);
    loanAccountRouter(this);
    creditcardRouter(this);
    debitcardRouter(this);
    transactionRouter(this);
    paymentRouter(this);
    approveAccountRouter(this);

    return this.router;
  }
}
