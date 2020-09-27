import * as express from 'express';
import moment = require('moment');

export const employeeRouter = (events) => {

  events.getRequest(
    '/employee/search/:string',
    `SELECT *, DATE_FORMAT(dob, '%Y-%m-%d') as dob, CONCAT_WS( ', ', street, city, state, pin) AS address from employee WHERE f_name = ?`,
    (req: express.Request) => [req.params.string]
  );

  events.getRequest(
    '/employee/:id',
    `SELECT *, DATE_FORMAT(dob, '%Y-%m-%d') as dob, CONCAT_WS( ', ', street, city, state, pin) AS address from employee WHERE emp_id = ?`,
    (req: express.Request) => [req.params.id]
  );

  events.getRequest(
    '/employee',
    `SELECT *, DATE_FORMAT(dob, '%Y-%m-%d') as dob, CONCAT_WS( ', ', street, city, state, pin) AS address from employee`,
    (req: express.Request) => []
  );

  events.putRequestMultiQuery(
    '/employee',
    `INSERT INTO employee (f_name, l_name, contact, dob, gender, state, city, street, pin) VALUES (?,?,?,?,?,?,?,?,?);

    INSERT INTO login(username,password,role,loginId)
    values
    (concat('emp_', LAST_INSERT_ID()) ,
    concat(char(round(rand()*25)+97), char(round(rand()*25)+97),char(round(rand()*25)+97),char(round(rand()*25)+97),char(round(rand()*25)+97),char(round(rand()*25)+97)),
    '1',
    LAST_INSERT_ID()
    );`,
    (req: express.Request) => {
      return [
        req.body.f_name,
        req.body.l_name,
        req.body.contact,
        moment(req.body.dob).format('yyyy-MM-DD'),
        req.body.gender,
        req.body.state,
        req.body.city,
        req.body.street,
        req.body.pin
      ];
    }
  );

  events.deleteRequest(
    '/employee/:id',
    'DELETE FROM employee WHERE emp_id = ?',
    (req: express.Request) => [req.params.id]
  );

  events.putRequest(
    '/employee/:id',
    'UPDATE employee SET ' +
    'f_name=?, l_name=?, contact=?, dob=?, gender=?, state=?, city=?, street=?, pin=?' +
    ' WHERE emp_id = ?',
    (req: express.Request) => {
      return [
        req.body.f_name,
        req.body.l_name,
        req.body.contact,
        moment(req.body.dob).format('yyyy-MM-DD'),
        req.body.gender,
        req.body.state,
        req.body.city,
        req.body.street,
        req.body.pin,
        req.params.id
      ];
    }
  );

};

