/** 
 * -------------------------------
 * Modulo: simrInvBtcContoler.js
 * -------------------------------
 * Parte de: Proyecto Simulador de inversiones en Bitcon (BTC).
 * 
 * Descripcion: Este modulo contiene los metodos (Funciones), que ejecutan las acciones 
 *              del CRUD de la coleccion, del "Simulador de Inversiones en Bitcoin" (BTC).
 *              Ademas contiene los metodos que controlan las rutas para la prueba 
 *              de estos metodos del CRUD de la coleccion por medio de Axios.
 * 
*/



// Importo las dependencias.
const MgObjectId = require('mongoose').Types.ObjectId;
const {SmldrInvrsBtc} = require('../models/simuladorInversionBtc');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const { simInvBtcInfo } = require('../PaginasJs/simInvBtc');
 
 
// Defino que envio a la consola (Global)
let consologuearProcesos = true;
let consologuearErrores = true;
// (Local), en cada controlador se puede usar el valor global, o definir el valor 
    // const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos
    // const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores

 
 

// ----------------------------------------------------------------
// Inicio - CRUD de la colleccion simuladorInversionBtc (SimInvBtc)
// ----------------------------------------------------------------

/**  
 * Mostrar todos los registros de la coleccion SimInvBtc 
 */
const mostrarSimInvBtc = async (req, res) => {
    const consologuearProceso = consologuearProcesos; //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;    //Valores (true, false) PorDefecto = consologuearErrores 
    (consologuearProceso) ? console.log('* Controlador: mostrarSimInvBtc...') : null;
     
    try {
        // cargar SimInvBtc
        let verSimInvBtc = await SmldrInvrsBtc.find();

        
        res.status(200).json(verSimInvBtc);
 
    } catch (error) {
        (consologuearProceso) ? console.log({msg: 'Hubo un error al leer los datos SimInvBtc'},error) : null;
        res.status(400).send({msg: 'Hubo un error al leer los datos SimInvBtc'});
        return;
    };
};
 
 
/**  
 * Mostrar un registro de la coleccion SimInvBtc por id 
 */
const mostrarUnSimInvBtc = async (req, res) => {
    const consologuearProceso = consologuearProcesos; //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;    //Valores (true, false) PorDefecto = consologuearErrores 
    const controladorEnUso= 'mostrarUnSimInvBtc';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;

    //consologueo los valores recibidos
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.params) ->`,req.params) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.query) -> `,req.query) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.body) -> `,req.body) : null;

    // Extraer datos del body (_id, email son identificadores unico)
    const {_id, 
        compraAño, 
        compraMes, 
        compraDia, 
        precioEntradaUsd, 
        importeInicialUsd, 
        compraCotizacionUsd, 
        importeCriptoComprado, 
        importeArsInvertido, 
        inversorEmail, 
        InversorComentario } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const valorClave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;    
    (consologuearProceso) ? console.log(`${controladorEnUso} (valorClave) -> `,valorClave) : null;
    
    try {
        // Verificar si no se paso el id 
        if(!valorClave) {
            return res.status(400).json({ msg: 'El email es obligatorio' });
        };

        // Por si el dato del _id viene por params o qry,
        // - Verifico que la cadena sea un objeto id valido para mongoose.
        if (!MgObjectId.isValid(valorClave)) {
            (consologuearProceso) ? console.log(`${controladorEnUso}, La cadena (valorClave) no es un ObjetoId valido para Mongoose -> ${valorClave} `) : null;
            res.status(400).json({ msg: 'La cadena (valorClave) no es un ObjetoId valido para Mongoose.' });
            return;
        };        
        
        // Verificar si se paso el id en el body
        if (_id) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            (consologuearProceso) ? console.log(`${controladorEnUso} (Verifico validationResult(req)...)`) : null;
            if( !errores.isEmpty() ) {
                (consologuearProceso) ? console.log(`${controladorEnUso} (validationResult(req)) -> `,errores.array()) : null;
                return res.status(400).json({errores: errores.array() });
            };
            (consologuearProceso) ? console.log(`${controladorEnUso} (Resultado validationResult(req) -> OK.)`) : null;    
        };

        // Buscar SimInvBtc, si myUSimInvBtc resulta vacio rompe por el catch
        let myUSimInvBtc = await SmldrInvrsBtc.findById( valorClave );

        res.status(200).json(myUSimInvBtc);

    } catch (error) {
        (consologuearProceso) ? console.log({msg: 'Hubo un error al leer los SimInvBtc'},error) : null;
        res.status(400).send({msg: 'Hubo un error al leer los SimInvBtc'});
        return;
    };
};
 
 
/** 
 * Crear un registro nuevo en la coleccion SimInvBtc  
 */
const crearSimInvBtc = async (req, res) => {
    const consologuearProceso = consologuearProcesos; //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;    //Valores (true, false) PorDefecto = consologuearErrores
    const controladorEnUso = 'crearSimInvBtc';
    //console.log(`* Controlador: ${controladorEnUso}...`);
    //console.log('consologuearProceso -> ',consologuearProceso);
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;

    //consologueo los valores recibidos
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.params) ->`,req.params) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.query) -> `,req.query) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.body) -> `,req.body) : null;

    // Extraer datos del body (email es un identificador unico)
    const { _id, 
            compraAño, 
            compraMes, 
            compraDia, 
            precioEntradaUsd, 
            importeInicialUsd, 
            compraCotizacionUsd, 
            importeCriptoComprado, 
            importeArsInvertido, 
            inversorEmail, 
            InversorComentario } = req.body;

    try {
        // Verificar si se paso el mail o el SimInvBtc en el body
        //  - Comprobar si hay errores con validationResult
        if (compraAño || 
            compraMes || 
            compraDia || 
            precioEntradaUsd || 
            importeInicialUsd || 
            compraCotizacionUsd || 
            importeCriptoComprado || 
            importeArsInvertido || 
            inversorEmail || 
            InversorComentario) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            (consologuearProceso) ? console.log(`${controladorEnUso} (Verifico validationResult(req)...)`) : null;
            if( !errores.isEmpty() ) {
                (consologuearProceso) ? console.log(`${controladorEnUso} (validationResult(req)) -> `,errores.array()) : null;
                return res.status(400).json({errores: errores.array() });
            };
            (consologuearProceso) ? console.log(`${controladorEnUso} (Resultado validationResult(req) -> OK.)`) : null;    
        } else {
            (consologuearProceso) ? console.log(`${controladorEnUso} (El registro en la coleccion SimInvBtc solo puede ser creado pasando todos sus datos en el body.)`) : null;
            return res.status(400).json({ msg: 'El registro en la coleccion SimInvBtc solo puede ser creado pasando todos sus datos en el body.' });
        }; 

        let newSimInvBtc  // Defino la variable que contendra el SimInvBtc

        // Crea el nuevo SimInvBtc
        newSimInvBtc = new SmldrInvrsBtc(req.body);

        // guardar SimInvBtc, si newSimInvBtc resulta vacio rompe por el catch
        await newSimInvBtc.save();

        res.status(201).json({msg: 'Se ha creado un nuevo registro en la coleccion SimInvBtc'}); 

    } catch (error) {
        (consologuearProceso) ? console.log({msg: `${controladorEnUso}, Hubo un error al crear el nuevo registro en la coleccion SimInvBtc`},error) : null;
        res.status(400).send({msg: 'Hubo un error al crear el nuevo registro en la coleccion SimInvBtc'});
        return;
    };
};
 
 
/**
 * Modifico un registro de la coleccion SimInvBtc por su id
 */
const editarSimInvBtc = async (req, res) => {
    const consologuearProceso = consologuearProcesos; //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;    //Valores (true, false) PorDefecto = consologuearErrores     
    const controladorEnUso= 'editarSimInvBtc';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;

    //consologueo los valores recibidos
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.params) ->`,req.params) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.query) -> `,req.query) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.body) -> `,req.body) : null;

    // Extraer datos del body (_id, email son identificadores unico)
    const { _id, 
        compraAño, 
        compraMes, 
        compraDia, 
        precioEntradaUsd, 
        importeInicialUsd, 
        compraCotizacionUsd, 
        importeCriptoComprado, 
        importeArsInvertido, 
        inversorEmail, 
        InversorComentario } = req.body;


    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const valorClave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
            ;
    (consologuearProceso) ? console.log(`${controladorEnUso} (valorClave) -> `,valorClave) : null;    

    let editarSimInvBtc;

    try {
        // Verificar si no se paso el id 
        if(!valorClave) {
            return res.status(400).json({ msg: 'El id es obligatorio' });
        };

        // Por si el dato del _id viene por params o qry,
        // - Verifico que la cadena sea un objeto id valido para mongoose.
        if (!MgObjectId.isValid(valorClave)) {
            (consologuearProceso) ? console.log(`${controladorEnUso}, La cadena (valorClave) no es un ObjetoId valido para Mongoose -> ${valorClave} `) : null;
            res.status(400).json({ msg: 'La cadena (valorClave) no es un ObjetoId valido para Mongoose.' });
            return;
        }; 
        
        // Verificar si se paso el id en el body
        if (compraAño || 
            compraMes || 
            compraDia || 
            precioEntradaUsd || 
            importeInicialUsd || 
            compraCotizacionUsd || 
            importeCriptoComprado || 
            importeArsInvertido || 
            inversorEmail || 
            InversorComentario) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            (consologuearProceso) ? console.log(`${controladorEnUso} (Verifico validationResult(req)...)`) : null;
            if( !errores.isEmpty() ) {
                (consologuearProceso) ? console.log(`${controladorEnUso} (validationResult(req)) -> `,errores.array()) : null;
                return res.status(400).json({errores: errores.array() });
            };
            (consologuearProceso) ? console.log(`${controladorEnUso} (Resultado validationResult(req) -> OK.)`) : null;    
        } else {
            (consologuearProceso) ? console.log(`${controladorEnUso} (El registro de la coleccion SimInvBtc, solo puede ser modificado pasando todos sus datos en el body.)`) : null;
            return res.status(400).json({ msg: 'El registro de la coleccion SimInvBtc, solo puede ser modificado pasando todos sus datos en el body.' });
        };
        

        // Armo el objeto Modificado (para modificar el SimInvBtc).
        //editarSimInvBtc = req.body;
        editarSimInvBtc={
                        _id: valorClave,
                        compraAño: compraAño, 
                        compraMes: compraMes, 
                        compraDia: compraDia, 
                        precioEntradaUsd: precioEntradaUsd, 
                        importeInicialUsd: importeInicialUsd, 
                        compraCotizacionUsd: compraCotizacionUsd, 
                        compraCotizacionUsd: compraCotizacionUsd, 
                        importeCriptoComprado: importeCriptoComprado, 
                        importeArsInvertido: importeArsInvertido, 
                        inversorEmail: inversorEmail, 
                        InversorComentario: InversorComentario
                        };  
        
        // Modifico el SimInvBtc, si SimInvBtc resulta vacio rompe por el catch
        (consologuearProceso) ? console.log(`${controladorEnUso} (Ejecutando findByIdAndUpdate(${valorClave}, ${editarSimInvBtc}).)`,editarSimInvBtc) : null;    
        const SimInvBtc = await SmldrInvrsBtc.findByIdAndUpdate( valorClave, editarSimInvBtc );

        res.status(200).json({msg: `SimInvBtc editado:${SimInvBtc}`, editarSimInvBtc}); 

    } catch (error) {
        (consologuearProceso) ? console.log({msg: 'Hubo un error al modificar el registro en la coleccion SimInvBtc'},error) : null;
        res.status(400).send({msg: 'Hubo un error al modificar el registro, o el registro no se encuentro en la coleccion SimInvBtc'});
        return;      
    };
};
 
 
/**
 * Elimina un registro de la coleccion SimInvBtc por su id 
 */
const eliminarSimInvBtc = async (req, res) => {
    const consologuearProceso = consologuearProcesos; //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;    //Valores (true, false) PorDefecto = consologuearErrores
    const controladorEnUso= 'eliminarSimInvBtc';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;
    
    //consologueo los valores recibidos
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.params) ->`,req.params) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.query) -> `,req.query) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.body) -> `,req.body) : null;

    // Extraer id y email (ambos son identificadores unicos)
    const { _id } = req.body;
    
    // Almecenar el valor del id, si se paso por algun metodo (body, query, params)
    const valorclave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;
    (consologuearProceso) ? console.log(`${controladorEnUso} (valorclave) -> `,valorclave) : null;

    try {
        // Verificar si no se paso el id del SimInvBtc a eliminar.
        if(!valorclave) {
            res.status(400).json({ msg: 'No existen parametros validos para esta operacion' });
            return;
        }

        // Por si el dato del _id viene por params o qry,
        // - Verifico que la cadena sea un objeto id valido para mongoose.
        if (!MgObjectId.isValid(valorclave)) {
            (consologuearProceso) ? console.log(`${controladorEnUso}, La cadena (valorClave) no es un ObjetoId valido para Mongoose -> ${valorClave} `) : null;
            res.status(400).json({ msg: 'La cadena (valorClave) no es un ObjetoId valido para Mongoose.' });
            return;
        };        
        
        // Verificar si se paso el id en el body    
        if (_id) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            (consologuearProceso) ? console.log(`${controladorEnUso} (Verifico validationResult(req)...)`) : null;
            if( !errores.isEmpty() ) {
                (consologuearProceso) ? console.log(`${controladorEnUso} (validationResult(req)) -> `,errores.array()) : null;
                res.status(400).json({errores: errores.array() });
                return;
            };
            (consologuearProceso) ? console.log(`${controladorEnUso} (Resultado validationResult(req) -> OK.)`) : null;    
        };
        
        // Eliminar , si mySimInvBtc resulta vacio rompe por el catch
        const mySimInvBtc = await SmldrInvrsBtc.findByIdAndDelete( valorclave );

        res.status(200).json({msg: 'Registro eliminado de la coleccion SimInvBtc.', mySimInvBtc}); 
        
    } catch (error) {
        (consologuearProceso) ? console.log({msg: 'Hubo un error al eliminar el registro en la coleccion SimInvBtc'},error) : null;
        res.status(400).send({msg: 'Hubo un error al eliminar el registro en la coleccion SimInvBtc'});
        return;
    };
};
 
 // -------------------------------------
 // Fin - CRUD de la colleccion SimInvBtc
 // -------------------------------------
 
 
 
 
/**
 * Muestro informacion de la api:
 * Este controlador muestra una pagina con informacion de apoyo 
 * para el uso de las api de la coleccion SimInvBtc.
 */
const apiSimInvBtcInfo = async (req, res) => {
    const consologuearProceso = consologuearProcesos;  //Valores (true, false) PorDefecto = consologuearProcesos 
    //const consologuearError = consologuearErrores;   //Valores (true, false) PorDefecto = consologuearErrores
    const controladorEnUso = 'apiUserInfo';
    (consologuearProceso) ? console.log( `* Controlador: ${controladorEnUso}...` ) : null;

    try {
        const contenido = simInvBtcInfo();
        res.send(contenido);    
    } catch (error) {
        (consologuearProceso) ? console.log({msg: 'Hubo un error al mostrar la informacion de la api SimInvBtc'},error) : null;
        res.status(400).send({msg: 'Hubo un error al mostrar la informacion de la api SimInvBtc'});
        return;
    };
};
 
// -------------------------------------------------
// Inicio - Funciones para prueba del crud por Axios
// -------------------------------------------------

/**
 * Muestro pagina para la prueba de la api con Axios:
 * - Este controlador muestra una pagina con instrucciones para probar las api 
 *   de la coleccion Cats.
 *   - Se pueden probar los metodos GET, POST, PUT y DELETE 
 *   - Se le puede pasar los valores por Params, Query, o Body
 */
 const {simInvBtcPrueba} = require('../PaginasJs/simInvBtcPrueba');
 const apisimInvBtcPrueba = async (req, res) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
    // Defino y consologueo el controlador en uso
    const controladorEnUso= 'apisimInvBtcPrueba';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;

     try {
         const contenido = simInvBtcPrueba();
         res.send(contenido);    
     } catch (error) {
        (consologuearError) ? console.log(`Error al mostrar la pagina de prueba (por Axios) de la api, Error: ) -> `, error) : null
        res.status(400).send({msg: 'Hubo un error al mostrar la pagina'});    
     };
 };
 


/**
 * Muestro pagina con el resultado de la prueba de la api por Axios.
 * - Este controlador:
 *      - Recibe la ruta con los datos de prueba para axios.
 *      - En la ruta hay dos parametros:
 *          Accion: valores fijos que indican como se ejecutara axios.
 *          ListaDeValores: son los valores que utilizara accios para la prueba
 *      - Con el valor del parametro Accion se determina a travez de un swicht 
 *        el metodo a ejecutar.
 *  - Este controlador devuelve a la ruta el resultado del metodo ejecutado
 *    obteniendo los valores a trvez de un callback. 
 */
function simInvBtcResultado(req, res){
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
    // Defino y consologueo el controlador en uso
    const controladorEnUso= 'simInvBtcResultado';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;

    //const myAction = req.params.accion;
    //const myValues = req.params.listaDeValores;
    
    const { accion, listaDeValores } = req.body;

    const myAction = (accion) 
        ? accion 
        : (req.params.accion)
            ? req.params.accion
            : req.query.accion
        ;    
    (consologuearProceso) ? console.log(`${controladorEnUso} -> (accion): `,myAction) : null;

        const myValues = (listaDeValores) 
        ? listaDeValores 
        : (req.params.listaDeValores)
            ? req.params.listaDeValores
            : req.query.listaDeValores
        ;  
    (consologuearProceso) ? console.log(`${controladorEnUso} -> (listaDeValores): `,myValues) : null;  

    // Valido el parametro lista de valores.
    if (myValues && !IsJsonString(myValues)) {
        (consologuearProceso) ? console.log(`${controladorEnUso} -> Los valores pasados en el parametro 'listaDeValores' no son validos.: `,myValues) : null;
        res.send({msg: "Los valores pasados en el parametro 'listaDeValores' no son validos. "} );
        return;    
    };

    // Constante que contiene las acciones permitidas en el parametro Accion de la ruta
    const {TYPES} = require('../consultas/simInvBtcCrudAccion');
    
    // Constante que contiene los metodos (funciones) a llamar
    const { 
            verSimInvBtcPorBody,
            crearSimInvBtcPorBody,
            editarSimInvBtcPorBody,
            eliminarSimInvBtcPorBody
        } = require('../consultas/simInvBtcCrudHandler');
    
    // Lista de todos los manejadores proyectados:        
    /* 
    verSimInvBtcPorParams,          // En desarrollo para futura funcionalidad.  
    verSimInvBtcPorQry,             // En desarrollo para futura funcionalidad.
    verSimInvBtcPorBody,            // Probado Funcionando ok.
    crearSimInvBtcPorBody,          // Probado Funcionando ok.
    editarSimInvBtcPorBody,         // Probado Funcionando ok.
    eliminarSimInvBtcPorParams,     // En desarrollo para futura funcionalidad.
    eliminarSimInvBtcPorQry,        // En desarrollo para futura funcionalidad.
    eliminarSimInvBtcPorBody        // Probado Funcionando ok. 
    */

    let contenido = {};
    let respuesta = '';

    // envio respuesta al servidor
    try {
        //console.log(TYPES)
        switch (myAction) {
            
            // En desarrollo para futura funcionalidad.
            /*             
            case TYPES.verPorParams:
                //console.log(TYPES.verPorParams);
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Buscando el contenido por Params: `,TYPES.verPorParams) : null;
                contenido = verSimInvBtcPorParams( myValues, 
                                                '', 
                                                responder = (contenido) => {                       
                                                    let respuesta = '';                        
                                                    (consologuearProceso) ? console.log(`${controladorEnUso}, callback-Responder -> (contenido.data): `,contenido.data) : null;
                                                    
                                                    if (contenido.data) {
                                                        respuesta = `{
                                                                        "msg": "Registro encontrado",
                                                                        "_id": "${contenido.data._id}",
                                                                        "compraAño": ${contenido.data.compraAño}, 
                                                                        "compraMes": ${contenido.data.compraMes}, 
                                                                        "compraDia": ${contenido.data.compraDia}, 
                                                                        "precioEntradaUsd": ${contenido.data.precioEntradaUsd}, 
                                                                        "importeInicialUsd": ${contenido.data.importeInicialUsd}, 
                                                                        "compraCotizacionUsd": ${contenido.data.compraCotizacionUsd}, 
                                                                        "importeCriptoComprado": ${contenido.data.importeCriptoComprado}, 
                                                                        "importeArsInvertido": ${contenido.data.importeArsInvertido}, 
                                                                        "inversorEmail": "${contenido.data.inversorEmail}", 
                                                                        "InversorComentario": "${contenido.data.InversorComentario}" 
                                                                    }`
                                                    } else {
                                                        respuesta = `{"msg": "No se encontraron los datos"}`
                                                    };

                                                    (consologuearProceso) ? console.log(`${controladorEnUso}, callback-Responder (respuesta) -> `,respuesta) : null;
                                                    //res.send(respuesta);
                                                    res.json(JSON.parse(respuesta));
                                                    return;   
                                                }
                                    );
                return; 
            */

            // En desarrollo para futura funcionalidad.
            /*          
            case TYPES.verPorQry:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Buscando el contenido por Qry: `,TYPES.verPorQry) : null;
                contenido = verSimInvBtcPorQry(myValues, 
                                            '', 
                                            responder = (contenido) => { 
                                                let respuesta = '';                        
                                                (consologuearProceso) ? console.log(`${controladorEnUso}, callback-Responder -> (contenido.data): `,contenido.data) : null;
                                                
                                                if (contenido.data) {
                                                    respuesta = `{
                                                                    "msg": "Registro encontrado",
                                                                    "_id": "${contenido.data._id}",
                                                                    "compraAño": ${contenido.data.compraAño}, 
                                                                    "compraMes": ${contenido.data.compraMes}, 
                                                                    "compraDia": ${contenido.data.compraDia}, 
                                                                    "precioEntradaUsd": ${contenido.data.precioEntradaUsd}, 
                                                                    "importeInicialUsd": ${contenido.data.importeInicialUsd}, 
                                                                    "compraCotizacionUsd": ${contenido.data.compraCotizacionUsd}, 
                                                                    "importeCriptoComprado": ${contenido.data.importeCriptoComprado}, 
                                                                    "importeArsInvertido": ${contenido.data.importeArsInvertido}, 
                                                                    "inversorEmail": "${contenido.data.inversorEmail}", 
                                                                    "InversorComentario": "${contenido.data.InversorComentario}" 
                                                                }`
                                                } else {
                                                    respuesta = `{"msg": "No se encontraron los datos"}`
                                                };

                                                (consologuearProceso) ? console.log(`${controladorEnUso}, callback-Responder (respuesta) -> `,respuesta) : null;
                                                //res.send(respuesta);
                                                res.json(JSON.parse(respuesta));
                                                return;   
                                            }
                                );
                return; 
            */                
            
            // Probado Funcionando ok.
            case TYPES.verPorBody:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Buscando el contenido por Body: `,TYPES.verPorBody) : null;
                contenido = verSimInvBtcPorBody(myValues, 
                                            '', 
                                            responder = (contenido) => { 
                                                            let respuesta = '';                        
                                                            (consologuearProceso) ? console.log(`${controladorEnUso}, callback-Responder -> (contenido.data): `,contenido.data) : null;
                                                            
                                                            if (contenido.data) {
                                                                respuesta = `{
                                                                                "msg": "Registro encontrado",
                                                                                "_id": "${contenido.data._id}",
                                                                                "compraAño": ${contenido.data.compraAño}, 
                                                                                "compraMes": ${contenido.data.compraMes}, 
                                                                                "compraDia": ${contenido.data.compraDia}, 
                                                                                "precioEntradaUsd": ${contenido.data.precioEntradaUsd}, 
                                                                                "importeInicialUsd": ${contenido.data.importeInicialUsd}, 
                                                                                "compraCotizacionUsd": ${contenido.data.compraCotizacionUsd}, 
                                                                                "importeCriptoComprado": ${contenido.data.importeCriptoComprado}, 
                                                                                "importeArsInvertido": ${contenido.data.importeArsInvertido}, 
                                                                                "inversorEmail": "${contenido.data.inversorEmail}", 
                                                                                "InversorComentario": "${contenido.data.InversorComentario}" 
                                                                            }`
                                                            } else {
                                                                respuesta = `{"msg": "No se encontraron los datos"}`
                                                            };

                                                            (consologuearProceso) ? console.log(`${controladorEnUso}, callback-Responder (respuesta) -> `,respuesta) : null;
                                                            //res.send(respuesta);
                                                            res.json(JSON.parse(respuesta));
                                                            return;    
                                                        }
                                            );
                return;

            // Probado Funcionando ok.
            case TYPES.crearPorBody:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Creando un nuevo registro por Body: `,TYPES.crearPorBody) : null;
                contenido = crearSimInvBtcPorBody(myValues, 
                                            '', 
                                            responder = async (contenido) => { 
                                                        try {
                                                            let respuesta = '';                        
                                                            (consologuearProceso) ? console.log(`${controladorEnUso} -> (Llamando callback-Responder)... `) : null;
                                                            respuesta = await '{ "msg": "' + contenido.data.msg + '" }';   // `${contenido}`
                                                            (consologuearProceso) ? console.log(`${controladorEnUso} -> (callback-Responder) -> `,contenido.data.msg) : null;
                                                            //res.send(respuesta);
                                                            res.json(JSON.parse(respuesta));
                                                            return;    
                                                        } catch (error) {
                                                            (consologuearError) ? console.log(`${controladorEnUso} (responder) -> Error al crear los datos.`,error) : null;
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            // Probado Funcionando ok.
            case TYPES.editarPorBody:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Editando un registro por Body: `,TYPES.editarPorBody) : null;
                contenido = editarSimInvBtcPorBody(myValues, 
                                            '', 
                                            responder = async (contenido) => { 
                                                        try {
                                                            let respuesta = '';                        
                                                            (consologuearProceso) ? console.log(`${controladorEnUso} -> (Llamando callback-Responder)... `) : null;
                                                            respuesta = await '{ "msg": "' + contenido.data.msg + '" }';   // `${contenido}`
                                                            (consologuearProceso) ? console.log(`${controladorEnUso} -> (callback-Responder) -> `,contenido.data.msg) : null;
                                                            //res.send(respuesta);
                                                            res.json(JSON.parse(respuesta));
                                                            return;    
                                                        } catch (error) {
                                                            (consologuearError) ? console.log(`${controladorEnUso} (responder) -> Error al editar los datos.`,error) : null;
                                                            res.send('Error al editar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;
            
            // En desarrollo para futura funcionalidad.
            /*          
            case TYPES.eliminarPorParams:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Eliminando un registro por Params: `,TYPES.eliminarPorParams) : null;
                contenido = eliminarSimInvBtcPorParams( myValues, 
                                                        '', 
                                                        responder = (contenido) => { 
                                                            let respuesta = '';                        
                                                            (consologuearProceso) ? console.log(`${controladorEnUso}, callback-Responder -> (contenido.data): `,contenido.data) : null;
                                                            
                                                            if (contenido.data) {
                                                                respuesta = `{
                                                                                "msg": "Registro eliminado" 
                                                                            }`
      
                                                            } else {
                                                                respuesta = `{"msg": "No se encontro el registro a eliminar"}`
                                                            };

                                                            (consologuearProceso) ? console.log(`${controladorEnUso}, callback-Responder (respuesta) -> `,respuesta) : null;
                                                            //res.send(respuesta);
                                                            res.json(JSON.parse(respuesta));
                                                            return;    
                                                        }
                                                    );
                return; 
            */

            // En desarrollo para futura funcionalidad
            /*             
            case TYPES.eliminarPorQry:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Eliminando un registro por Qry: `,TYPES.eliminarPorQry) : null;
                contenido = eliminarSimInvBtcPorQry(myValues, 
                                            '', 
                                            responder = (contenido) => { 
                                                let respuesta = '';                        
                                                (consologuearProceso) ? console.log(`${controladorEnUso}, callback-Responder -> (contenido.data): `,contenido.data) : null;
                                                
                                                if (contenido.data) {
                                                    respuesta = `{
                                                                    "msg": "Registro eliminado" 
                                                                }`

                                                } else {
                                                    respuesta = `{"msg": "No se encontro el registro a eliminar"}`
                                                };

                                                (consologuearProceso) ? console.log(`${controladorEnUso}, callback-Responder (respuesta) -> `,respuesta) : null;
                                                //res.send(respuesta);
                                                res.json(JSON.parse(respuesta));
                                                return;    
                                            }
                                            );
                return; 
            */

            // Probado Funcionando ok.
            case TYPES.eliminarPorBody:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Eliminando un registro por Body: `,TYPES.eliminarPorBody) : null;
                contenido = eliminarSimInvBtcPorBody(myValues, 
                                            '', 
                                            responder = (contenido) => { 
                                                let respuesta = '';                        
                                                (consologuearProceso) ? console.log(`${controladorEnUso}, callback-Responder -> (contenido.data): `,contenido.data) : null;
                                                
                                                if (contenido.data) {
                                                    respuesta = `{
                                                                    "msg": "Registro eliminado" 
                                                                }`
                                                                    /* 
                                                                    "_id": "${contenido.data._id}",
                                                                    "compraAño": ${contenido.data.compraAño}, 
                                                                    "compraMes": ${contenido.data.compraMes}, 
                                                                    "compraDia": ${contenido.data.compraDia}, 
                                                                    "precioEntradaUsd": ${contenido.data.precioEntradaUsd}, 
                                                                    "importeInicialUsd": ${contenido.data.importeInicialUsd}, 
                                                                    "compraCotizacionUsd": ${contenido.data.compraCotizacionUsd}, 
                                                                    "importeCriptoComprado": ${contenido.data.importeCriptoComprado}, 
                                                                    "importeArsInvertido": ${contenido.data.importeArsInvertido}, 
                                                                    "inversorEmail": "${contenido.data.inversorEmail}", 
                                                                    "InversorComentario": "${contenido.data.InversorComentario}"  
                                                                    */
                                                } else {
                                                    respuesta = `{"msg": "No se encontro el registro a eliminar"}`
                                                };

                                                (consologuearProceso) ? console.log(`${controladorEnUso}, callback-Responder (respuesta) -> `,respuesta) : null;
                                                //res.send(respuesta);
                                                res.json(JSON.parse(respuesta));
                                                return;    
                                            }
                                );
                return;

            default:
                contenido = 'Accion desconocida.';
                (consologuearProceso) ? console.log(`${controladorEnUso} -> switch default:  ${contenido}`) : null;
                return res.send(contenido);    
        };
        return;
    } catch (error) {
        (consologuearError) ? console.log({msg: `Hubo un error en el controlador (${controladorEnUso}) en la rura /resultado...`,error}) : null;
        res.status(400).send({msg: `Hubo un error en el controlador (${controladorEnUso}) en la rura /resultado...`,error});  
    };
};

// ----------------------------------------------
// Fin - Funciones para prueba del crud por Axios
// ----------------------------------------------



//---------------------------------------------------
// Inicio - Funciones Auxiliares para la validaciones
//---------------------------------------------------

function IsJsonString(str) {
    try {
      var json = JSON.parse(str);
      return (typeof json === 'object');
    } catch (e) {
      return false;
    };
  };

//------------------------------------------------
// Fin - Funciones Auxiliares para la validaciones
//------------------------------------------------
 
 
 
 
 
 
 // ---------------------
 // Exporto controladores
 // ---------------------
 
 module.exports = {
                    apiSimInvBtcInfo,   
                    mostrarSimInvBtc,
                    mostrarUnSimInvBtc,
                    crearSimInvBtc,
                    editarSimInvBtc,
                    eliminarSimInvBtc,
                    apisimInvBtcPrueba,
                    simInvBtcResultado   
                 }
 
 
 
 
 
 
 
 
 
 
 