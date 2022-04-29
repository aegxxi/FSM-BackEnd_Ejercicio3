// Subruta para la consulta de Apis Externas por Axios

const express = require('express');
const router = express.Router();
//const { check } = require('express-validator');
const {  apiExternasInfo, extResultado } = require('../controllers/externasControler');


/** 
 * GET
 * Muestra info de la Api
 * Ruta: api/externas
*/
router.get('/', apiExternasInfo );



// ------------------------------------------------------------------------------
// Inicio - Rutas para el uso de Axios sobre las api de consulta a apis externas.
// ------------------------------------------------------------------------------

/**
 *  GET (Por Params -> Accion, ListaDeValores)
 *  llamar a el procedimiento Axios que sera ejecutado
 *  Esta ruta define que procedimiento axios sera ejecutado y con que valores.
 *  Ruta: /api/cats
 * */
// 
router.get('/resultado/:accion/:listaDeValores', extResultado);


/**
 *  GET (Por Params -> Accion)
 *  llamar a el procedimiento Axios que sera ejecutado
 *  Esta ruta define que procedimiento axios sera ejecutado y con que valores.
 *  Ruta: /api/cats
 * */
// 
router.get('/resultado/:accion', extResultado);


/**
 *  GET (Por Qry o Body)
 *  Mostrar Resultado de la prueba de la api
 *  Esta ruta muestra el resultado del procedimiento Axios llamado 
 *  Ruta: /api/cats
 * */
// 
router.get('/resultado', extResultado);

// ---------------------------------------------------------------------------
// Fin - Rutas para el uso de Axios sobre las api de consulta a apis externas.
// ---------------------------------------------------------------------------




module.exports = router;