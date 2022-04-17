const express = require('express');
const router = express.Router(); 
const { check } = require('express-validator');
const { apiCatInfo, vistaGatitos, verUnGatito, crearGatito, editarGatito, elininarGatito } = require('../controllers/catController.js');

/**
 *  GET 
 *  Mostrar Info de la api
 *  Ruta: /api/cats
 * */
// 
router.get('/', apiCatInfo);

/**
 * Get Obtener un gatito por id  (Por Parametro)
 * Ruta: /api/cats
 * */
 router.get(
    '/ver/gato/:id', 
    verUnGatito
    );

/**
 * Get Obtener un gatito por id  (Por Body o Qry)
 * Ruta: /api/cats 
 * */
 router.get(
            '/ver/gato', 
            [
                check('_id').not().isEmpty().isLength({max:24, min:24}).withMessage('El _id es obligatorio y debe tener 24 caracteres')
            ],
            verUnGatito
            );

/**
 * Get Obtener todos los gatitos. 
 * Ruta: /api/cats
 * */
router.get('/ver', vistaGatitos);



/**
 * POST Crear un Gatito. (por params)
 * Ruta: /api/cats
 * */
router.post('/crear/:name',
            crearGatito
            );


/**
 * POST Crear un Gatito. (por body o qry)
 * Ruta: /api/cats
 * */
 router.post('/crear',
            [
                check('name').not().isEmpty().isLength({min:2, max:30}).withMessage( 'El nombre es obligatorio y debe tener minimo dos letras y como maximo 30')
            ],
            crearGatito
            );            


/**
 * PUT Modificar un Gatito. (por param)
 * Ruta: /api/cats
 * */
 router.put('/editar/:id/:name',
            editarGatito
            );  

/**
 * PUT Modificar un Gatito. (por param y body)
 * Ruta: /api/cats
 * */
 router.put('/editar/:id',
            [
                check('_id').not().isEmpty().isLength({max:24, min:24}).withMessage('El _id es obligatorio y debe tener 24 caracteres'),
                check('name').not().isEmpty().isLength({min:2, max:30}).withMessage( 'El nombre es obligatorio y debe tener minimo dos letras y como maximo 30')
            ],
            editarGatito
            ); 

/**
 * PUT Modificar un Gatito. (por body o qry)
 * Ruta: /api/cats
 * */
 router.put('/editar',
            [
                check('_id').not().isEmpty().isLength({max:24, min:24}).withMessage('El _id es obligatorio y debe tener 24 caracteres'),
                check('name').not().isEmpty().isLength({min:2, max:30}).withMessage( 'El nombre es obligatorio y debe tener minimo dos letras y como maximo 30')
            ],
            editarGatito
            );            


/** 
 * Delete cat. 
 * Elimina un Gatito (Por Parametro)
 * Ruta: /api/cats
*/
router.delete('/eliminar/:id',
            elininarGatito
            ); 


/** 
 * Delete cat. 
 * Elimina un Gatito (Por Body o Query)
 * Ruta: /api/cats
*/
router.delete('/eliminar',
            [
                check('_id').not().isEmpty().isLength({max:24, min:24}).withMessage('El _id es obligatorio y debe tener 24 caracteres'),
            ],  
            elininarGatito
            ); 


module.exports = router;
