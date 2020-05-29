const mysql = require('mysql');
const dbConfig = require('../config/database.js');
const cliente = require('../db_apis/cliente.js');
const controller = {};
const otpGenerator = require("otp-generator");
const crypto       = require("crypto");
const key          = "verysecretkey"; 

controller.recovery_usuario = async function get(req, res, next) {
    try {
        const context = {};

            context.id = req.query.userId;
            context.pass = req.query.userPass;

            const rows = await cliente.find_cliente_userrecovery(context);
            if (req.query.userId) {
  
                          res.status(200).json(rows[0]);
        
                    } else {
  
              res.status(200).json(rows);
            }
          } catch (err) {
            next(err);
          }


}

controller.create_code = async function post(req, res, next) {
  try {

   const phone=req.body.celular;
    const fullhash = await cliente.creacion_hash(phone);
    res.status(200).json({
     celular:'',
     otp:'',
     hash: fullhash,
     estado: '',
    });
  
  } catch (err) {
      next(err);
    }


}


controller.valid_code = async function post(req, res, next) {
  try {

 
      const phone=req.body.celular;
      const otp=req.body.otp;
      const hash=req.body.hash;

      let [hashValue,expires]=hash.split(".");
      let now = Date.now();
      if(now>parseInt(expires)) {
        res.status(200).json({
          estado: 'timeout'
        });
      return false;
      }
      let data  = `${phone}.${otp}.${expires}`;
      let newCalculatedHash = crypto.createHmac("sha256",key).update(data).digest("hex");
      if(newCalculatedHash === hashValue){
        res.status(200).json({
          estado: 'correcto'
        });
          return true;
      } 
      res.status(200).json({
        estado: 'incorrecto'
      });
      return false;
  } catch (err) {
      next(err);
    }


}


module.exports = controller;