// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {  apiloguinInfo, loguinUsuarios, logoutUsuarios, loguinResultado } = require('../controllers/loguinControler');

//

/** 
 * GET. 
 * Pagina de informacion del Loguin
 * Ruta: api/loguin
*/
router.get('/', apiloguinInfo); 

/** 
 * POST. 
 * Looguea el usuario
 * Ruta: api/loguin/ingresar
*/
router.post('/ingresar',
            [
                check('email').not().isEmpty().isEmail().withMessage('Agrega un email válido'),
                check('password').not().isEmpty().isLength({ min: 6}).withMessage('El password debe ser minimo de 6 caracteres')
            ],  
            loguinUsuarios
            ); 

/** 
 * DELETE. 
 * DesLooguea el usuario
 * Ruta: api/loguin/salir
*/
router.delete('/salir', logoutUsuarios); 



/**
 *  GET (Por Params)
 *  llamar a el procedimiento Axios que sera ejecutado
 *  Esta ruta define que procedimiento axios sera ejecutado y con que valores.
 *  Ruta: /api/loguin
 * */
// 
router.get('/resultado/:accion/:listaDeValores', loguinResultado);

/**
 *  GET (Por Params -> Accion)
 *  llamar a el procedimiento Axios que sera ejecutado
 *  Esta ruta define que procedimiento axios sera ejecutado y con que valores.
 *  Ruta: /api/loguin
 * */
// 
router.get('/resultado/:accion', loguinResultado);


module.exports = router;
