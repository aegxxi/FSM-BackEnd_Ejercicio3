const express = require('express');
const router = express.Router(); 
const { check } = require('express-validator');
const { apiCatInfo, apiCatPrueba, catResultado, vistaGatitos, verUnGatito, crearGatito, editarGatito, elininarGatito } = require('../controllers/catController.js');



// ----------------------------
// Inicio - Rutas para el CRUD.
// ----------------------------

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

// ----------------------------
// Fin - Rutas para el CRUD.
// ----------------------------




// ------------------------------------------------------------------
// Inicio - Rutas para Informacion sobre las api de la coleccion Cat.
// ------------------------------------------------------------------

/**
 *  GET 
 *  Mostrar Info de la api
 *  Ruta: /api/cats
 * */
// 
router.get('/', apiCatInfo);

// ---------------------------------------------------------------
// Fin - Rutas para Informacion sobre las api de la coleccion Cat.
// ---------------------------------------------------------------



// ----------------------------------------------------------------------
// Inicio - Rutas para el uso de Axios sobre las api de la coleccion Cat.
// ----------------------------------------------------------------------

/**
 *  GET 
 *  Probar la api 
 *  Esta ruta muestra la informacion que se necesita para crear las rutas
 *  que pueden ser utilizadas para trabajar con el CRUD de la coleccion Cats
 *  usando Axios.
 *  Ruta: /api/cats
 * */
// 
router.get('/prueba', apiCatPrueba);


/**
 *  GET (Por Params)
 *  llamar a el procedimiento Axios que sera ejecutado
 *  Esta ruta define que procedimiento axis sera ejecutado y con que valores.
 *  Ruta: /api/cats
 * */
// 
router.get('/resultado/:accion/:listaDeValores', catResultado);


/**
 *  GET (Por Qry o Body)
 *  Mostrar Resultado de la prueba de la api
 *  Esta ruta muestra el resultado del procedimiento Axios llamado 
 *  Ruta: /api/cats
 * */
// 
router.get('/resultado', catResultado);

// -------------------------------------------------------------------
// Fin - Rutas para el uso de Axios sobre las api de la coleccion Cat.
// -------------------------------------------------------------------


module.exports = router;
