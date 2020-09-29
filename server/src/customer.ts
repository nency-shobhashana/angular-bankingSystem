import * as express from 'express';
import moment = require('moment');

export const customerRouter = (events) => {

  events.getRequest(
    '/customer/search/:string',
    `SELECT *, DATE_FORMAT(dob, '%Y-%m-%d') as dob, CONCAT_WS( ', ', street, city, state, pin) AS address from customer WHERE f_name = ?`,
    (req: express.Request) => [req.params.string]
  );

  events.getRequest(
    '/customer',
    `SELECT *, DATE_FORMAT(dob, '%Y-%m-%d') as dob, CONCAT_WS( ', ', street, city, state, pin) AS address from customer`
    , () => []);

  events.getRequest(
    '/customer/:id',
    `SELECT *, DATE_FORMAT(dob, '%Y-%m-%d') as dob, CONCAT_WS( ', ', street, city, state, pin) AS address from customer WHERE cust_id = ?`,
    (req: express.Request) => [req.params.id]
  );

  events.putRequestMultiQuery(
    '/customer',
    `INSERT INTO customer (f_name, l_name, email, pan_no, dob, gender, state, city, street, pin, contact) VALUES (?,?,?,?,?,?,?,?,?,?,?);

    INSERT INTO login(username,password,role,cust_id)
    values
    (concat('cust_', LAST_INSERT_ID()),
    concat(char(round(rand()*25)+97), char(round(rand()*25)+97),char(round(rand()*25)+97),char(round(rand()*25)+97),char(round(rand()*25)+97),char(round(rand()*25)+97)),
    '2',
    LAST_INSERT_ID()
    );
    `,
    (req: express.Request) => {
      return [
        req.body.f_name,
        req.body.l_name,
        req.body.email,
        req.body.pan_no,
        moment(req.body.dob).format('yyyy-MM-DD'),
        req.body.gender,
        req.body.state,
        req.body.city,
        req.body.street,
        req.body.pin,
        req.body.contact
      ];
    });

  events.deleteRequest(
    '/customer/:id',
    'DELETE FROM customer WHERE cust_id = ?',
    (req: express.Request) => [req.params.id]
  );

  events.putRequest(
    '/customer/:id',
    'UPDATE customer SET ' +
    'f_name=?, l_name=?, email=?, pan_no=?, dob=?, gender=?, state=?, city=?, street=?, pin=?, contact=?' +
    ' WHERE cust_id = ?',
    (req: express.Request) => {
      return [
        req.body.f_name,
        req.body.l_name,
        req.body.email,
        req.body.pan_no,
        moment(req.body.dob).format('yyyy-MM-DD'),
        req.body.gender,
        req.body.state,
        req.body.city,
        req.body.street,
        req.body.pin,
        req.body.contact,
        req.params.id
      ];
    }
  );
};
