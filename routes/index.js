const express = require('express');
const router = express.Router();
//const { vistaInicio } = require('../controllers/catController.js')
const { informacion, vistaInicio, apiInfo } = require('../controllers/indexControler')

/* GET home page. */
router.get('/', vistaInicio);

/* Obtener página de Informacion. */
router.get('/info',informacion);

/* Obtener página de Informacion. */
router.get('/api',apiInfo);

module.exports = router;
