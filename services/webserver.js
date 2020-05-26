const http = require('http');
const express = require('express');
const morgan = require('morgan');
const webServerConfig = require('../config/webserver.js');
const router = require('./router.js');
const path = require('path');
const bodyParser= require("body-parser");

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);

    // Combines logging info from request and response
    app.use(morgan('dev'));
    app.use(express.json({
         reviver: reviveJson
       }));

       const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

       function reviveJson(key, value) {
         // revive ISO 8601 date strings to instances of Date
         if (typeof value === 'string' && iso8601RegExp.test(value)) {
           return new Date(value);
         } else {
           return value;
         }
       }

app.use(bodyParser.json());
app.set('view engine','ejs');
//app.set('views',path.join(__dirname,'../views'));
    // Mount the router at /api so all its routes start with /api
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
      next();
    });
    app.use(bodyParser.urlencoded({extended: false}));
    app.use('/', router);
    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);

        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

module.exports.initialize = initialize;

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;