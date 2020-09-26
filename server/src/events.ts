import * as  express from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import * as Connection from 'mysql2/typings/mysql/lib/Connection';

export const createRouter = (db: Connection) => {
  const router = express.Router();
  const owner = '';

  router.post('/login', (req, res, next) => {
    db.query(
      'SELECT username from login where username = ? and password = ?',
      [req.body.username, req.body.password],
      (error, result) => {
        if (error || ((result as RowDataPacket[]).length == 0)) {
          console.error(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json({ status: 'ok' });
        }
      }
    );
  });

  router.put('/login', function (req, res, next) {
    db.query(
      'INSERT INTO login (username, password) VALUES (?,?)',
      [req.body.username, req.body.password]),
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json({ status: 'ok' });
        }
      }
  });

  return router;
}
// module.exports = createRouter;