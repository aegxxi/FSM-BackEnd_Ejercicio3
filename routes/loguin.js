// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
//const {  loguinUsuarios  } = require('../controllers/loguinController');

//

/** 
 * POST. 
 * Looguea el usuario
 * Ruta: api/loguin
*/
router.post('/loguin',
            [
                check('email').not().isEmpty().isEmail().withMessage('Agrega un email válido'),
                check('password').not().isEmpty().isLength({ min: 6}).withMessage('El password debe ser minimo de 6 caracteres')
            ],  
            loguinUsuarios
            ); 
