const express = require('express');
const router = new express.Router();
const login = require('../controllers/login.js');
//Bancadigital
//endpoint para obtener los datos del cliente para el proceso de verificacion
router.get('/cliente_recovery/:id?',login.recovery_usuario);
//generacion del codigo otp
router.post('/create_code',login.create_code);
//envio del codigo otp via SMS
router.post('/valid_code',login.valid_code);
module.exports = router;