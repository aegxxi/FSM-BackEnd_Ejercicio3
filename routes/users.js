// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {  apiUserInfo, crearUsuario, editarUsuario , mostrarUsuarios, mostrarUnUsuario , eliminarUsuario  } = require('../controllers/usuarioController');


/** 
 * GET
 * Muestra info de la Api
 * Ruta: api/usuarios
*/
router.get('/', apiUserInfo );


/**
 * GET
 * Muestra todos los usuarios
 * Ruta: api/usuarios
*/
router.get('/ver', mostrarUsuarios);

/**
 * GET
 * Muestra un usuario por su Id (por params)
 * Ruta: api/usuarios
*/
router.get('/ver/usuario/:id', mostrarUnUsuario);



/**
 * GET
 * Muestra un usuarios por su Id (por body o qry)
 * Ruta: api/usuarios
*/
router.get('/ver/usuario', mostrarUnUsuario);


/** 
 * PUT
 * Editar un usuario por su Id. 
 * Modifica un usuario (por body o qry)
 * Ruta: api/usuarios
*/
router.put('/editar/usuario',
            [
                check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
                check('email').not().isEmpty().isEmail().withMessage('Agrega un email válido'),
                check('password').not().isEmpty().isLength({ min: 6}).withMessage('El password debe ser minimo de 6 caracteres')
            ],   
            editarUsuario
            ); 


/** 
 * POST. 
 * Crea un usuario
 * Ruta: api/usuarios
*/
router.post('/cargar',
            [
                check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
                check('email').not().isEmpty().isEmail().withMessage('Agrega un email válido'),
                check('password').not().isEmpty().isLength({ min: 6}).withMessage('El password debe ser minimo de 6 caracteres')
            ],  
            crearUsuario
            ); 


/** 
 * DELETE. 
 * Elimina un usuario (por params)
 * Ruta: api/usuarios
*/
router.delete('/eliminar/usuario/:id',
            [
                check('_id').not().isEmpty().isLength({max:24, min:24}).withMessage('El _id es obligatorio y debe tener 24 caracteres')
            ],  
            eliminarUsuario
            ); 


/** 
 * DELETE
 * Eliminar un usuario por su Id. 
 * Elimina un usuario (por body o qry)
 * Ruta: api/usuarios
*/
router.delete('/eliminar/usuario',
            [
                check('_id').not().isEmpty().isLength({max:24, min:24}).withMessage('El _id es obligatorio y debe tener 24 caracteres')
            ],  
            eliminarUsuario
            ); 


module.exports = router;

