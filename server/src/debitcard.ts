import * as express from 'express';
import moment = require('moment');

export const debitcardRouter = (events) => {

  events.getRequest(
    '/debit_card',
    'SELECT * from debit_card', () => []);

  events.getRequest(
    '/debit_card/:id',
    'SELECT * from debit_card WHERE debit_id=?',
    (req: express.Request) => {
      return [
        req.params.id
      ];
    });

  events.getRequest(
    '/debit_card/account/:id',
    'SELECT * from debit_card WHERE acc_no=?',
    (req: express.Request) => {
      return [
        req.params.id
      ];
    });

  events.getRequest(
    '/debit_card/customer/:id',
    'SELECT * from debit_card WHERE acc_no IN (SELECT acc_no from account WHERE cust_id = ?)',
    (req: express.Request) => {
      return [
        req.params.id
      ];
    });

  events.putRequest(
    '/debit_card',
    'INSERT INTO debit_card ( holder_name, debit_no, exp_date, cvv, acc_no) VALUES (?,?,?,?,?)',
    (req: express.Request) => {
      return [
        req.body.holder_name,
        req.body.debit_no,
        moment(req.body.createdDate).format('yyyy-MM-DD'),
        req.body.cvv,
        req.body.acc_no
      ];
    });

  events.deleteRequest(
    '/debit_card/:id',
    'DELETE FROM debit_card WHERE debit_id = ?',
    (req: express.Request) => [req.params.id]
  );

  events.putRequest(
    '/debit_card/:id',
    'UPDATE debit_card SET ' +
    'holder_name=?' +
    ' WHERE debit_id = ?',
    (req: express.Request) => {
      return [
        req.body.holder_name,
        req.params.id
      ];
    }
  );
};
