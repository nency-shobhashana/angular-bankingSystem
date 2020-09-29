"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var mysql = require("mysql2");
var routerModule_1 = require("./routerModule");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'banking_admin',
    password: 'nenu',
    database: 'banking_cbd',
    multipleStatements: true
});
var port = process.env.PORT || 8080;
var eve = new routerModule_1.RouterModule(connection);
var app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(eve.getRouter());
app.listen(port, function () {
    console.log("Express server listening on port " + port);
});
//# sourceMappingURL=index.js.map