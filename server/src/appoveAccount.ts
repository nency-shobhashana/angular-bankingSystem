import * as express from 'express';
import moment = require('moment');

export const approveAccountRouter = (events) => {

  events.getRequest(
    '/nonApproveAccount',
    `SELECT * from approvedAccount WHERE approved=0`
    , () => []);

  events.postRequest(
    '/approveAccount',
    'UPDATE approvedAccount SET ' +
    'approved=1, managerId=?' +
    ' WHERE acc_no = ?',
    (req: express.Request) => {
      return [
        req.body.managerId,
        req.body.acc_no,
      ];
    }
  );

  events.getRequest(
    '/nonApproveLoan',
    `SELECT * from approvedLoan WHERE approved=0`
    , () => []);

  events.postRequest(
    '/approveLoan',
    'UPDATE approvedLoan SET ' +
    'approved=1, managerId=?' +
    ' WHERE loan_id = ?',
    (req: express.Request) => {
      return [
        req.body.managerId,
        req.body.loan_id,
      ];
    }
  );
};
