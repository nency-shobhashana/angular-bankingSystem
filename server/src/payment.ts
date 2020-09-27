import * as express from 'express';
import moment = require('moment');

export const paymentRouter = (events) => {

  events.getRequest(
    '/payment',
    `SELECT * from payment`
    , () => []);

  events.getRequest(
    '/payment/:id',
    `SELECT * from payment WHERE pay_id = ?`,
    (req: express.Request) => [req.params.id]
  );

  events.getRequest(
    '/payment/loan/:id',
    `SELECT * from payment where loan_id =? `,
    (req: express.Request) => {
      return [
        req.params.id
      ];
    });

  events.getRequest(
    '/payment/customer/:id',
    `SELECT * from payment WHERE loan_id IN(SELECT loan_id from loan_account WHERE cust_id = ?)`,
    (req: express.Request) => {
      return [
        req.params.id
      ];
    });

  events.putRequest(
    '/payment',
    'INSERT INTO payment ( pay_date, pay_amt, loan_id) VALUES (?,?,?)',
    (req: express.Request) => {
      return [
        moment(req.body.createdDate).format('yyyy-MM-DD'),
        req.body.pay_amt,
        req.body.loan_id
      ];
    });

  events.deleteRequest(
    '/payment/:id',
    'DELETE FROM payment WHERE pay_id = ?',
    (req: express.Request) => [req.params.id]
  );

  events.putRequest(
    '/payment/:id',
    'UPDATE payment SET ' +
    'pay_date=?, pay_amt=?, loan_id=?' +
    ' WHERE pay_id = ?',
    (req: express.Request) => {
      return [
        moment(req.body.createdDate).format('yyyy-MM-DD'),
        req.body.pay_amt,
        req.body.loan_id,
        req.params.id
      ];
    }
  );
};
