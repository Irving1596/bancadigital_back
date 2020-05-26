const pool = require('../services/database.js');
const mysql = require('mysql');



const calif_estudsQuery =
 `SELECT * FROM credenciales_view`;

async function find_cliente_userrecovery(context) {
  let query = calif_estudsQuery;
  const binds = {};

  if (context.id) {
    binds.id_cliente = context.id; 
    binds.pin_cliente = context.pass;
    query += `\nwhere identificacion =`+"'"+binds.id_cliente+"'";
    query += `\n AND password=`+"'"+binds.pin_cliente+"'";
  }

const result = await pool.simpleExecute(query);
  //const result = await database.simpleExecute(query, binds);

  return result;

}

module.exports.find_cliente_userrecovery = find_cliente_userrecovery;
