const pool = require('../services/database.js');
const mysql = require('mysql');
const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const key = "verysecretkey";
const nodemailer = require('nodemailer');
const myCredentials = require('schluessel');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: myCredentials.correo.username,
    pass: myCredentials.correo.password 
  }
});




const calif_estudsQuery =
  `SELECT * FROM credenciales_view`;

async function find_cliente_userrecovery(context) {
  let query = calif_estudsQuery;
  const binds = {};

  if (context.id) {
    binds.id_cliente = context.id;
    binds.pin_cliente = context.pass;
    query += `\nwhere identificacion =` + "'" + binds.id_cliente + "'";
    query += `\n AND password=` + "'" + binds.pin_cliente + "'";
  }

  const result = await pool.simpleExecute(query);


  return result;

}

function send_mail(correo,otp){
  var mailOptions = {
    from: myCredentials.correo.username,
    to: correo,
    subject: 'Sending Email from Node.js',
    text: 'Codigo OTP:'+otp
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function send_code(phone, otp) {

  const codeValid = otp
  console.log("enviando mediante twilio", phone);
  if (phone == 'none')

    res.status(400).json({
      ok: false,
      mensaje: 'El recurso no es válido',
      value: phone
    })

  else {
    // Download the helper library from https://www.twilio.com/docs/node/install
    // Your Account Sid and Auth Token from twilio.com/console
    // DANGER! This is insecure. See http://twil.io/secure
   //const accountSid = 'ACa26baa654624f2414d7fe7f7d824a3a8';
   //const authToken = 'f05ae72657ee5e13d11fa506d822243e';
    const client = require('twilio')(myCredentials.twilio.accountSid,myCredentials.twilio.authToken);
    client.messages
      .create({
        body: codeValid + ' este es su código de verificación',
        from: myCredentials.twilio.myphone,
        to: '+507' + phone
      })
      .then(message => {
        console.log(message.sid)
        res.json({
          ok: true,
          mensaje: 'Código de autenticación ' + codeValid + ' enviado a +' + phone + ' satisfactoriamente',
          value: codeValid
        })
      });
  }
}


async function creacion_hash(phone,correo) {
  const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
  console.log("****CODIGO OTP****", otp);
  const ttl = 3 * 60 * 1000; //3 Minutes in miliseconds
  const expires = Date.now() + ttl; //timestamp to 3 minutes in the future
  const data = `${phone}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
  const fullHash = `${hash}.${expires}`;
  //send_code(phone,otp)
  //send_mail(correo,otp);
  return fullHash;
}



module.exports.find_cliente_userrecovery = find_cliente_userrecovery;
module.exports.creacion_hash = creacion_hash;

