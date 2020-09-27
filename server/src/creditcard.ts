import * as express from 'express';
import moment = require('moment');

export const creditcardRouter = (events) => {

  events.getRequest(
    '/credit_card',
    'SELECT * from credit_card', () => []);

  events.getRequest(
    '/credit_card/:id',
    'SELECT * from credit_card WHERE credit_id=?',
    (req: express.Request) => {
      return [
        req.params.id
      ];
    });

  events.getRequest(
    '/credit_card/customer/:id',
    'SELECT * from credit_card WHERE cust_id=?',
    (req: express.Request) => {
      return [
        req.params.id
      ];
    });

  events.putRequest(
    '/credit_card',
    'INSERT INTO credit_card ( holder_name, credit_no, exp_date, cvv, cust_id) VALUES (?,?,?,?,?)',
    (req: express.Request) => {
      return [
        req.body.holder_name,
        req.body.credit_no,
        moment(req.body.createdDate).format('yyyy-MM-DD'),
        req.body.cvv,
        req.body.cust_id
      ];
    });

  events.deleteRequest(
    '/credit_card/:id',
    'DELETE FROM credit_card WHERE credit_id = ?',
    (req: express.Request) => [req.params.id]
  );

  events.putRequest(
    '/credit_card/:id',
    'UPDATE credit_card SET ' +
    'holder_name=?' +
    ' WHERE credit_id = ?',
    (req: express.Request) => {
      return [
        req.body.holder_name,
        req.params.id
      ];
    }
  );
};
