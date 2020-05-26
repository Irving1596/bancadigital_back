const mysql = require('mysql');
const dbConfig = require('../config/database.js');
const cliente = require('../db_apis/cliente.js');

const controller = {};


//const db = require('../models/index');
//const Prof = db.sequelize.models.Profesor;


controller.recovery_usuario = async function get(req, res, next) {
    try {
        const context = {};

            context.id = req.query.userId;
            context.pass = req.query.userPass;

            const rows = await cliente.find_cliente_userrecovery(context);
            console.log("rows 0",rows);
            if (req.query.userId) {
                    //  if (rows.length === 1) {
                        /*res.render('customer',{
                          data: rows
                        });*/
                          res.status(200).json(rows);
                         
                      /*} else {
                        res.status(404).end();
                      }*/
                    } else {
                console.log(rows[0]);
  
              res.status(200).json(rows);
            }
          } catch (err) {
            next(err);
          }


}

module.exports = controller;