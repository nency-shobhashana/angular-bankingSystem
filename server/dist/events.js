"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
var express = require("express");
exports.createRouter = function (db) {
    var router = express.Router();
    var owner = '';
    router.post('/login', function (req, res, next) {
        db.query('SELECT username from login where username = ? and password = ?', [req.body.username, req.body.password], function (error, result) {
            if (error || (result.length == 0)) {
                console.error(error);
                res.status(500).json({ status: 'error' });
            }
            else {
                res.status(200).json({ status: 'ok' });
            }
        });
    });
    router.put('/login', function (req, res, next) {
        db.query('INSERT INTO login (username, password) VALUES (?,?)', [req.body.username, req.body.password]),
            function (error) {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                }
                else {
                    res.status(200).json({ status: 'ok' });
                }
            };
    });
    return router;
};
// module.exports = createRouter;
