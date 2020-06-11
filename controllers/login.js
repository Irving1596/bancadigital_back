const cliente = require('../db_apis/cliente.js');
const controller = {};
const crypto = require("crypto");
const key = "verysecretkey";


controller.recovery_usuario = async function get(req, res, next) {
  try {
    const context = {};

    context.id = req.query.userId;
    context.pass = req.query.userPass;

    const rows = await cliente.find_cliente_userrecovery(context);
      if (rows.length === 1) {

        res.status(200).json(rows[0]);

      }else{
      res.status(200).json(rows);
      }
  } catch (err) {
    next(err);
  }
}

controller.create_code = async function post(req, res, next) {
  try {

    const phone = req.body.celular;
    const correo=req.body.correo;
    const fullhash = await cliente.creacion_hash(phone,correo);
    res.status(200).json({
      hash: fullhash
    });

  } catch (err) {
    next(err);
  }


}


controller.valid_code = async function post(req, res, next) {
  try {


    const phone = req.body.celular;
    const otp = req.body.otp;
    const hash = req.body.hash;
    let [hashValue, expires] = hash.split(".");
    let now = Date.now();
    if (now > parseInt(expires)) {
      res.status(200).json({
        estado: 'timeout'
      });
      return false;
    }
    let data = `${phone}.${otp}.${expires}`;
    let newCalculatedHash = crypto.createHmac("sha256", key).update(data).digest("hex");
    if (newCalculatedHash === hashValue) {
      res.status(200).json({
        estado: 'valido'
      });
      return true;
    }
    res.status(200).json({
      estado: 'novalido'
    });
    return false;
  } catch (err) {
    next(err);
  }


}


module.exports = controller;