const express = require('express');
const router = express.Router();
//const { vistaInicio } = require('../controllers/catController.js')
const { informacion, vistaInicio, apiInfo } = require('../controllers/indexControler')
const { authSession, authCookie } = require('../middleware/auth');


/* GET home page. */
router.get('/', vistaInicio);

/* Obtener página de Informacion sobre el entorno del servidor. */
router.get('/info', informacion);
//router.get('/info', authSession, informacion);

/* Obtener página de Informacion sobre las api. */
router.get('/api',apiInfo);


/* Obtener página de Resultados. */
//router.get('/consulta/:accion/:ListaValores',resultado);

module.exports = router;
