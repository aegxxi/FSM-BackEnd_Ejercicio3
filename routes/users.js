// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {  apiUserInfo, crearUsuario, mostrarUsuarios, eliminarUsuario  } = require('../controllers/usuarioController');


/** 
 * GET users listing.
 * Muestra info de la Api
 * Ruta: api/usuarios
*/
router.get('/', apiUserInfo );

/**
 * Muestra todos los usuarios
 * Ruta: api/usuarios
*/
router.get('/ver', mostrarUsuarios);


/** 
 * Post users crated. 
 * Crea un usuario
 * Ruta: api/usuarios
*/
router.post('/cargar',
            [
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'Agrega un email válido').isEmail(),
                check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6})
            ],  
            crearUsuario
            ); 


/** 
 * Delete users. 
 * Elimina un usuario
 * Ruta: api/usuarios
*/
router.delete('/eliminar',
            [
                check('_id', 'El id es obligatorio').not().isEmpty(),
                check('email', 'Proporciona un email válido').isEmail(),
            ],  
            eliminarUsuario
            ); 


module.exports = router;

