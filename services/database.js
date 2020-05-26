const mysql = require('mysql');
const myConnection = require('express-myconnection');
const dbConfig = require('../config/database.js');

var util = require('util');

  async function initialize() {
    await mysql.createPool(dbConfig.hrPool);
  }
module.exports.initialize = initialize;
const p= initialize();
async function close() {
  await p.end(function (err) {
  // all connections in the pool have ended
});
}
module.exports.close = close;
  const pool=mysql.createPool(dbConfig.hrPool);
/*pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('Database connection was refused.');
        }
        if (connection) connection.release();
        return
    }
});*/

function simpleExecute(statement, binds=[]) {
  return new Promise(async (resolve, reject) => {
    let conn;


    try {
      pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        // Use the connection


    const  result=connection.query(statement,[binds], function (error, results, fields) {
     
              resolve(results);
        });
      });


    } catch (err) {
      console.log(err);
      reject(err);
    }

  });
}
function simpleExecuteupdate(statement, binds,binds2) {
  return new Promise(async (resolve, reject) => {
    let conn;

    try {
      pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        // Use the connection


    const  result=connection.query(statement,[binds,binds2], function (error, results, fields) {
              resolve(results);
        });
      });


    } catch (err) {
      console.log(err);
      reject(err);
    }

  });
}



module.exports.simpleExecute = simpleExecute;
module.exports.simpleExecuteupdate = simpleExecuteupdate;