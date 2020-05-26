const express = require('express');
const router = new express.Router();
const login = require('../controllers/login.js');
//Bancadigital
router.get('/cliente_recovery/:id?',login.recovery_usuario);







   //SMEP
        //Sin Sequelize
        //router.get('/profesor_list/',profesor.list_profesores);
        //Con Sequelize
     //router.get('/profesor_list/',profesor.list_profesores_seq);
     //router.get('/estudiante_list/',estudiante.list_estudiantes);


//ruta para el login sin sequelize
   //  router.get('/user_list/',user.list_users);
//router of login with sequelize
     //router.get('/user_list/',user.list_users_seq);

     module.exports = router;