// Rutas para crear simInvBtc
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {  apiSimInvBtcInfo, crearSimInvBtc, editarSimInvBtc , mostrarSimInvBtc, mostrarUnSimInvBtc , eliminarSimInvBtc, apisimInvBtcPrueba, simInvBtcResultado  } = require('../controllers/simrInvBtcContoler');


/** 
 * GET
 * Muestra info de la Api
 * Ruta: api/simInvBtc
*/
router.get('/', apiSimInvBtcInfo );


/**
 * GET
 * Muestra todos los simInvBtc
 * Ruta: api/simInvBtc
*/
router.get('/ver', mostrarSimInvBtc);

/**
 * GET
 * Muestra un simInvBtc por su Id (por params)
 * Ruta: api/simInvBtc
*/
router.get('/ver/registro/:id', 
            [
                check('_id').not().isEmpty().isLength({max:24, min:24}).withMessage('El _id es obligatorio y debe tener 24 caracteres')
            ], 
            mostrarUnSimInvBtc);



/**
 * GET
 * Muestra un simInvBtc por su Id (por body o qry)
 * Ruta: api/simInvBtc
*/
router.get('/ver/registro', 
    [
        check('_id').not().isEmpty().isLength({max:24, min:24}).withMessage('El _id es obligatorio y debe tener 24 caracteres')
    ], 
    mostrarUnSimInvBtc);


/** 
 * POST. 
 * Crea un registro simInvBtc (por body)
 * Ruta: api/simInvBtc
*/
router.post('/cargar',
            [
                check('compraAño').exists().isInt({ min: 2008, max: 3000 }).withMessage('El Año de la compra es obligatorio, rango: >=2008 y <=3000'),
                check('compraMes').exists().isInt({ min: 1, max: 12 }).withMessage('El Mes de la compra es obligatorio, rango: >=1 y <=12'),
                check('compraDia').exists().isInt({ min: 1, max: 31 }).withMessage('El Dia de la compra es obligatorio, rango: >=1 y <=31'),
                check('precioEntradaUsd').exists().isFloat({ min: 0}).withMessage('El "precio de entrada" de la inversion es obligatorio y > 0'),
                check('importeInicialUsd').exists().isFloat({ min: 0}).withMessage('El "importe Inicial en Usd" de la inversion es obligatorio y > 0'),
                check('importeCriptoComprado').exists().isFloat({ min: 0}).withMessage('El "importe Cripto Comprado" de la inversion es obligatorio y > 0'),
                check('importeArsInvertido').exists().isFloat({ min: 0}).withMessage('El "importe Ars Invertido" de la inversion es obligatorio y > 0'),
                check('compraCotizacionUsd').exists().isFloat({ min: 0}).withMessage('El valor "compra Cotizacion Usd" de la inversion es obligatorio y > 0'),
                check('InversorComentario').optional().isString().withMessage('El comentario debe ser string'),
                check('inversorEmail').not().isEmpty().isEmail().withMessage('Ingresa un email válido')
            ],  
            crearSimInvBtc
            ); 


/** 
 * PUT
 * Editar un simInvBtc por su Id. 
 * Modifica un simInvBtc (por body)
 * Ruta: api/simInvBtc
*/
router.put('/editar',
            [
                check('_id').not().isEmpty().isLength({max:24, min:24}).withMessage('El _id es obligatorio y debe tener 24 caracteres'), 
                check('compraAño').exists().isInt({ min: 2008, max: 3000 }).withMessage('El Año de la compra es obligatorio, rango: >=2008 y <=3000'),
                check('compraMes').exists().isInt({ min: 1, max: 12 }).withMessage('El Mes de la compra es obligatorio, rango: >=1 y <=12'),
                check('compraDia').exists().isInt({ min: 1, max: 31 }).withMessage('El Dia de la compra es obligatorio, rango: >=1 y <=31'),
                check('precioEntradaUsd').exists().isFloat({ min: 0}).withMessage('El "precio de entrada" de la inversion es obligatorio y > 0'),
                check('importeInicialUsd').exists().isFloat({ min: 0}).withMessage('El "importe Inicial en Usd" de la inversion es obligatorio y > 0'),
                check('importeCriptoComprado').exists().isFloat({ min: 0}).withMessage('El "importe Cripto Comprado" de la inversion es obligatorio y > 0'),
                check('importeArsInvertido').exists().isFloat({ min: 0}).withMessage('El "importe Ars Invertido" de la inversion es obligatorio y > 0'),
                check('compraCotizacionUsd').exists().isFloat({ min: 0}).withMessage('El valor "compra Cotizacion Usd" de la inversion es obligatorio y > 0'),
                check('InversorComentario').optional().isString().withMessage('El comentario debe ser string'),
                check('inversorEmail').not().isEmpty().isEmail().withMessage('Ingresa un email válido')
            ],   
            editarSimInvBtc
        ); 


/** 
 * DELETE. 
 * Elimina un simInvBtc (por params)
 * Ruta: api/simInvBtc
*/
router.delete(  '/eliminar/registro/:id',
                [
                    check('_id').not().isEmpty().isLength({max:24, min:24}).withMessage('El _id es obligatorio y debe tener 24 caracteres')
                ],  
                eliminarSimInvBtc
            ); 


/** 
 * DELETE
 * Eliminar un simInvBtc por su Id. 
 * Elimina un simInvBtc (por body o qry)
 * Ruta: api/simInvBtc /eliminar/registro
*/
router.delete('/eliminar/registro',
                [
                    check('_id').not().isEmpty().isLength({max:24, min:24}).withMessage('El _id es obligatorio y debe tener 24 caracteres')
                ],  
                eliminarSimInvBtc
            ); 


// ----------------------------------------------------------------------
// Inicio - Rutas para el uso de Axios sobre las api de la coleccion simInvBtc.
// ----------------------------------------------------------------------

/**
 *  GET 
 *  Probar la api 
 *  Esta ruta muestra la informacion que se necesita para crear las rutas
 *  que pueden ser utilizadas para trabajar con el CRUD de la coleccion simInvBtc
 *  usando Axios.
 *  Ruta: /api/simInvBtc
 * */
// 
router.get('/prueba', apisimInvBtcPrueba);


/**
 *  GET (Por Params)
 *  llamar a el procedimiento Axios que sera ejecutado
 *  Esta ruta define que procedimiento axis sera ejecutado y con que valores.
 *  Ruta: /api/simInvBtc
 * */
// 
router.get('/resultado/:accion/:listaDeValores', simInvBtcResultado);


/**
 *  GET (Por Qry o Body)
 *  Mostrar Resultado de la prueba de la api
 *  Esta ruta muestra el resultado del procedimiento Axios llamado 
 *  Ruta: /api/cats
 * */
// 
router.get('/resultado', simInvBtcResultado);

// -------------------------------------------------------------------
// Fin - Rutas para el uso de Axios sobre las api de la coleccion Cat.
// -------------------------------------------------------------------





module.exports = router;

