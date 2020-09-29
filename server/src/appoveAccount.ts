import * as express from 'express';
import moment = require('moment');

export const approveAccountRouter = (events) => {

  events.getRequest(
    '/nonApproveAccount',
    `SELECT * from account WHERE approved=0`
    , () => []);

  events.postRequest(
    '/approveAccount',
    'UPDATE account SET ' +
    'approved=1, approvedBy=?' +
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
    `SELECT * from loan_account WHERE approved=0`
    , () => []);

  events.postRequest(
    '/approveLoan',
    'UPDATE loan_account SET ' +
    'approved=1, authorizedBy=?' +
    ' WHERE loan_id = ?',
    (req: express.Request) => {
      return [
        req.body.managerId,
        req.body.loan_id,
      ];
    }
  );
};
