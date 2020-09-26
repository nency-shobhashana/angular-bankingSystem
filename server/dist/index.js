"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var mysql = require("mysql2");
var events_1 = require("./events");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'banking_admin',
    password: 'nenu',
    database: 'cbd_banking'
});
var port = process.env.PORT || 8080;
var app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(events_1.createRouter(connection));
app.listen(port, function () {
    console.log("Express server listening on port " + port);
});
