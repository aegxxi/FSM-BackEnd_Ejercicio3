const express = require('express');
const router = express.Router();
//const { vistaInicio } = require('../controllers/catController.js')
const { informacion, vistaInicio, apiInfo, resultado } = require('../controllers/indexControler')

/* GET home page. */
router.get('/', vistaInicio);

/* Obtener página de Informacion sobre el entorno del servidor. */
router.get('/info',informacion);

/* Obtener página de Informacion sobre las api. */
router.get('/api',apiInfo);


/* Obtener página de Resultados. */
router.get('/resultado/:accion',resultado);

module.exports = router;
