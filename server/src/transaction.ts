import * as express from 'express';
import moment = require('moment');

export const transactionRouter = (events) => {

  events.getRequest(
    '/transaction',
    `SELECT * from transaction`
    , () => []);

  events.getRequest(
      '/transaction/:id',
      `SELECT * from transaction where trans_id=?`,
      (req: express.Request) => {
        return [
          req.params.id
        ];
      });

  events.getRequest(
    '/transaction/account/:id',
    `SELECT * from transaction where acc_no=?`,
    (req: express.Request) => {
      return [
        req.params.id
      ];
    });

  events.getRequest(
      '/transaction/customer/:id',
      `SELECT * from transaction WHERE acc_no IN (SELECT acc_no from account WHERE cust_id = ?)`,
      (req: express.Request) => {
        return [
          req.params.id
        ];
      });

  events.putRequest(
    '/transaction',
    'INSERT INTO transaction ( trans_date, trans_amt, trans_type, balance, acc_no) VALUES (?,?,?,?,?)',
    (req: express.Request) => {
      return [
        moment(req.body.createdDate).format('yyyy-MM-DD'),
        req.body.trans_amt,
        req.body.trans_type,
        req.body.balance,
        req.body.acc_no
      ];
    });

  events.deleteRequest(
    '/transaction/:id',
    'DELETE FROM transaction WHERE trans_id = ?',
    (req: express.Request) => [req.params.id]
  );

  events.putRequest(
    '/transaction/:id',
    'UPDATE transaction SET ' +
    'trans_date=?, trans_amt=?, trans_type=?, balance=?, acc_no=?' +
    ' WHERE trans_id = ?',
    (req: express.Request) => {
      return [
        moment(req.body.createdDate).format('yyyy-MM-DD'),
        req.body.trans_amt,
        req.body.trans_type,
        req.body.balance,
        req.body.acc_no,
        req.params.id
      ];
    }
  );
};
