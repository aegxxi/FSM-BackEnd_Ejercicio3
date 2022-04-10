// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const { crearUsuario, mostrarUsuarios, apiUserInfo  } = require('../controllers/usuarioController');


/* GET users listing. */
// Muestra info de la Api
//Muestra todos los usuarios
router.get('/', apiUserInfo );

//Muestra todos los usuarios
router.get('/ver', mostrarUsuarios);


/* Post users crated. */
// Crea un usuario
// api/usuarios
router.post('/cargar',  crearUsuario); 


module.exports = router;

