const express = require('express');
const router = express.Router(); 
const {vistaGatitos, crearGatito, apiCatInfo } = require('../controllers/catController.js')

/**
 *  GET users listing. 
 * */
// Mostrar Info de la api
router.get('/', apiCatInfo);

// Listar todos los Gatitos
router.get('/ver', vistaGatitos);


/**
 *  POST users listing. 
 * */

// Crear un Gatito
router.post('/crear/:name', crearGatito);

module.exports = router;
