/** 
 * -------------------------------
 * Modulo: simInvBtcCrudHandler.js
 * -------------------------------
 * Parte de: Proyecto Simulador de inversiones en Bitcon (BTC).
 * 
 * Descripcion: Este modulo contiene los metodos (Funciones), que llaman a consultas Axios,
 *              que ejecutan una alguna de las acciones del CRUD de la coleccion,
 *              del "Simulador de Inversiones en Bitcoin" (BTC).
 * 
 * Nota: Estas funciones son llamadas por el metodo (Funcion): "simInvBtcResultado",
 *       desde el modulo, "controllers/simrInvBtcContoler.js".
 *       Este metodo es el controlador de la ruta:
 *       http://localhost:4001/api/simInvBtc/resultado/[Accion]/[listaDeValores]
 *       el cual determina por el contenido del parametro "Accion", cual de los metodos
 *       de este modulo sera llamado, y le entregara a dicho metodo los valores contenidos,
 *       en formato Json en el segundo parametro de esta ruta "listaDeValores".
 *       El metodo llamado procesara los datos recibidos del segundo parametro, y llamara,
 *       usando Axios, a alguno de los metodos del CRUD de la coleccion.
 *       Los valores resultantes de la consulta o su estado, seran pasados por medio de un
 *       callback al controlador de la ruta quien los procesara. 
*/



 // Importo las dependencias. 
const axios = require('axios');
const entorno = require('../appSrvEntorno');
const {fnMiServidor}= entorno;

// Defino valores globales de este modulo
let {srvPuerto} = fnMiServidor();
const mySrvUri = `http://localhost:${srvPuerto}`



// Defino que envio a la consola (Global)
let consologuearProcesos = true;
let consologuearErrores = true;
let consologuearErroresAxios = true;
let consologuearValoresRetornados = true;
// (Local), en cada controlador se puede usar el valor global, o definir el valor 
    // const consologuearProceso = consologuearProcesos;                    //Valores (true, false) PorDefecto = consologuearProcesos
    // const consologuearError = consologuearErrores;                       //Valores (true, false) PorDefecto = consologuearErrores
    // const consologuearErrorAxios = consologuearErroresAxios;             //Valores (true, false) PorDefecto = consologuearErroresAxios 
    // const consologuearValorRetornado = consologuearValoresRetornados;    //Valores (true, false) PorDefecto = consologuearValoresRetornados



// ---------------------------
// Metodos GET (Ver simInvBtc)
// ---------------------------

/** 
 * Ver un simInvBtc (por params)
 * api/ver/registro 
 * En desarrollo para futura funcionalidad.
*/
/* 
const verSimInvBtcPorParams = async ( valores, srvUri = mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'verSimInvBtcPorParams';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    // url = `${srvUri}/api/simInvBtc/ver/registro/${_id}`;
    // contenido = await axios.get(encodeURI(url), { timeout: 10000 });

    let contenido;
    let url;
    const {_id} = JSON.parse(decodeURIComponent(valores));    
    const idSimInvBtc = _id;
    
    if ( _id ) {
        url = ``${srvUri}/api/simInvBtc/ver/registro/${idSimInvBtc}`;
        (consologuearProceso) ? console.log(`${metodoHandler}, (url)-> ${url}`) : null;  
    } else {
        (consologuearProceso) ? console.log(`{ msg: "${metodoHandler}, El id es obligatorio en el parametro lista de valores"}`) : null;
        contenido = `{"msg": "El id es obligatorio en el parametro lista de valores"}`;
        responder(contenido);
        return;    
    };

    try {
        (consologuearProceso) ? console.log(`${metodoHandler}, Consultando por  axios.get a la ruta: ${url}`) : null;
        //contenido = await axios.get(encodeURI(url) , { timeout: 10000 });
        contenido = await axios.get( url, { timeout: 10000 } );    
    } catch (error) { 
        (consologuearErrorAxios) ? console.log(`${metodoHandler}, -> Error, Axios no pudo recuperar los datos en la ruta ${url}`,error) : null; 
        (!contenido)
            ? contenido = {msg: `Axios no pudo recuperar los datos en la ruta: ${url}`}
            : null;
    };

    (consologuearValorRetornado && contenido) 
        ? console.log(`${metodoHandler}, -> (contenido): `, contenido)
        : null;

    responder(contenido);
    return;
}; 
*/


/** 
 * Ver un simInvBtc (por query) 
 * api/ver/registro
 * En desarrollo para futura funcionalidad.
 */
/* 
const verSimInvBtcPorQry = async ( valores, srvUri=mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'verSimInvBtcPorQry';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;
    
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    // url = `${srvUri}/api/simInvBtc/ver/registro/${_id}`;
    // contenido = await axios.get(encodeURI(url), { timeout: 10000 });

    let contenido;
    let url;
    const {_id} = JSON.parse(decodeURIComponent(valores));    
    const idSimInvBtc = _id;
    
    if ( _id ) {
        url = `${srvUri}}/api/simInvBtc/ver/registro?id=${idSimInvBtc}`;
        (consologuearProceso) ? console.log(`${metodoHandler}, (url)-> ${url}`) : null;  
    } else {
        (consologuearProceso) ? console.log(`{ msg: "${metodoHandler}, El id es obligatorio en el parametro lista de valores"}`) : null;
        contenido = `{"msg": "El id es obligatorio en el parametro lista de valores"}`;
        responder(contenido);
        return;    
    };

    try {
        (consologuearProceso) ? console.log(`${metodoHandler}, Consultando por  axios.get a la ruta: ${url}`) : null;
        //contenido = await axios.get(encodeURI(url) , { timeout: 10000 });
        contenido = await axios.get( url, { timeout: 10000 } );    
    } catch (error) { 
        (consologuearErrorAxios) ? console.log(`${metodoHandler}, -> Error, Axios no pudo recuperar los datos en la ruta ${url}`,error) : null; 
        (!contenido)
            ? contenido = {msg: `Axios no pudo recuperar los datos en la ruta: ${url}`}
            : null;
    };

    (consologuearValorRetornado && contenido) 
        ? console.log(`${metodoHandler}, -> (contenido): `, contenido)
        : null;

    responder(contenido);
    return;
}; 
*/


/** 
 * Ver un simInvBtc (por body) 
 * api/ver/registro
 * Probado Funcionando ok.
 */
const verSimInvBtcPorBody = async ( body, srvUri = mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'verSimInvBtcPorBody';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
   
    let url = `${srvUri}/api/simInvBtc/ver/registro`;
    (consologuearProceso) ? console.log(`${metodoHandler} (url)-> ${url}`) : null;

    let myBody; 
    myBody = decodeURIComponent(body);      // Reemplazo caracteres %x de la url por caracteres equivalentes
    myBody = JSON.parse(myBody);            // parseo el string como objeto Json
    (consologuearProceso) ? console.log(`${metodoHandler} (body)-> ${myBody}`) : null;
    (consologuearProceso) ? console.log(`${metodoHandler} (body-Objeto):`, myBody) : null;
    const {_id} = myBody;                   // deconstruyo el objeto myBody y tomo el id
    myBody = { params: { id: `${_id}` } };  // armo el objeto para el parametro body de axios
    console.log(`${metodoHandler} (body Destructurado_&_Restructurado)-> ${myBody}`,myBody);

    /* 
    const headers = {
        "Content-Type": "application/json"
        //{ timeout: 10000 }
    } 
    */
    
    let contenido;
    try {
        contenido = await axios.get(url ,myBody , { timeout: 10000 });    
    } catch (error) { 
        (consologuearErrorAxios) ? console.log(`${metodoHandler}  -> Error al recuperar los datos.`,error) : null; 
        (!contenido)
            ? contenido = {msg: "Axios no pudo recuperar los datos"}
            : null
    };
    
    (consologuearValorRetornado) 
        ? console.log(`${metodoHandler} -> (contenido): `, contenido)
        : null;

    responder(contenido);
    return;
};


// ------------------------------
// Metodos POST (Crear simInvBtc)
// ------------------------------

/** 
 * Crear un simInvBtc (por body) 
 * /api/simInvBtc/cargar
 * Probado Funcionando ok.
 */
const crearSimInvBtcPorBody = async ( body, srvUri=mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'crearSimInvBtcPorBody';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    let url = `${srvUri}/api/simInvBtc/cargar`;
    (consologuearProceso) ? console.log(`${metodoHandler} (url)-> ${url}`) : null;
    
    let myBody; 
    myBody = decodeURIComponent(body);      // Reemplazo caracteres %x de la url por caracteres equivalentes
    myBody = JSON.parse(myBody);            // parseo el string como objeto Json
    (consologuearProceso) ? console.log(`${metodoHandler} (body)-> ${myBody}`) : null;
    (consologuearProceso) ? console.log(`${metodoHandler} (body-Objeto):`, myBody) : null;

    let contenido;
    try {
        contenido = await axios.post(url, myBody, { timeout: 10000 });    
    } catch (error) {
        (consologuearErrorAxios) ? console.log(`${metodoHandler}  -> Axios, error al cargar un registro en la coleccion o al crearla.`,error) : null; 
        (!contenido)
            ? contenido = {msg: "Axios, error al cargar un registro en la coleccion o al crearla"}
            : null  
    }

    (consologuearValorRetornado) 
        ? console.log(`${metodoHandler} -> (contenido.data.msg): `, contenido.data.msg) 
        : null;

    responder(contenido);
    return;
};


// ---------------------------------
// Metodos PUT (Modificar simInvBtc)
// ---------------------------------

/** 
 * Editar un simInvBtc (por body) 
 * /api/editar
 * Probado Funcionando ok.
 */
const editarSimInvBtcPorBody = async ( body, srvUri=mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = false     //consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = false    //consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'editarSimInvBtcPorBody';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    let url = `${srvUri}/api/simInvBtc/editar`;
    (consologuearProceso) ? console.log(`${metodoHandler} (url)-> ${url}`) : null;
    
    let myBody ={}
    myBody = decodeURIComponent(body);      // Reemplazo caracteres %x de la url por caracteres equivalentes
    myBody = JSON.parse(myBody);            // parseo el string como objeto Json
    (consologuearProceso) ? console.log(`${metodoHandler} (body)-> ${myBody}`) : null;
    (consologuearProceso) ? console.log(`${metodoHandler} (body-Objeto):`, myBody) : null;

    
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
            InversorComentario} = myBody;
    
    myBody = { _id: _id,
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
    
    console.log(`${metodoHandler} (body Destructurado_&_Restructurado)-> ${myBody}`,myBody);

    let contenido;
    try {
        contenido = await axios.put(url, myBody, { timeout: 10000 });    
    } catch (error) {
        (consologuearErrorAxios) ? console.log(`${metodoHandler}  -> Axios, error al cargar un registro en la coleccion o al crearla.`,error) : null; 
        (!contenido)
            ? contenido = {msg: "Axios, error al cargar un registro en la coleccion o al crearla"}
            : null  
    };
    
    (consologuearValorRetornado) 
        ? console.log(`${metodoHandler} -> (contenido.data.msg): `, contenido.data.msg) 
        : null;

    responder(contenido);
    return;
};



// -----------------------------------
// Metodos DELETE (Eliminar simInvBtc)
// -----------------------------------

/** 
 * Eliminar un simInvBtc (por params)
 * /api/eliminar 
 * En desarrollo para futura funcionalidad.
*/
/* 
const eliminarSimInvBtcPorParams = async ( valores, srvUri=mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'eliminarSimInvBtcPorParams';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    // url = `${srvUri}/api/simInvBtc/eliminar/registro/${_id}`;
    // contenido = await  axios.delete(url, { timeout: 10000 })

    let contenido;
    let url;
    const {_id} = JSON.parse(decodeURIComponent(valores));    
    const idSimInvBtc = _id;
    
    if ( _id ) {
        url = `${srvUri}/api/simInvBtc/eliminar/registro/${idSimInvBtc}`;
        (consologuearProceso) ? console.log(`${metodoHandler}, (url)-> ${url}`) : null;  
    } else {
        (consologuearProceso) ? console.log(`{ msg: "${metodoHandler}, El id es obligatorio en el parametro lista de valores"}`) : null;
        contenido = `{"msg": "El id es obligatorio en el parametro lista de valores"}`;
        responder(contenido);
        return;    
    };

    try {
        (consologuearProceso) ? console.log(`${metodoHandler}, Consultando por axios.delete a la ruta: ${url}`) : null;
        //contenido = await axios.get(encodeURI(url) , { timeout: 10000 });
        contenido = await axios.delete(url, { timeout: 10000 });    
    } catch (error) { 
        (consologuearErrorAxios) ? console.log(`${metodoHandler}, -> Error, Axios no pudo eliminar los datos en la ruta ${url}`,error) : null; 
        (!contenido)
            ? contenido = {msg: `Axios no pudo eliminar los datos en la ruta: ${url}`}
            : null;
    };

    (consologuearValorRetornado && contenido) 
        ? console.log(`${metodoHandler}, -> (contenido): `, contenido)
        : null;

    responder(contenido);
    return;
}; 
*/


/** 
 * Eliminar un simInvBtc (por query) 
 * /api/eliminar
 * En desarrollo para futura funcionalidad.
 */
/* 
const eliminarSimInvBtcPorQry = async ( valores, srvUri=mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'eliminarSimInvBtcPorQry';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    // ${srvUri}/api/simInvBtc/eliminar/registro?id=${idSimInvBtc}
    // axios.delete(url, { timeout: 10000 })

    let contenido;
    let url;
    const {_id} = JSON.parse(decodeURIComponent(valores));    
    const idSimInvBtc = _id;
    
    if ( _id ) {
        url = `${srvUri}/api/cats/eliminar?id=${idSimInvBtc}`;
        (consologuearProceso) ? console.log(`${metodoHandler}, (url)-> ${url}`) : null;  
    } else {
        (consologuearProceso) ? console.log(`{ msg: "${metodoHandler}, El id es obligatorio en el parametro lista de valores"}`) : null;
        contenido = `{"msg": "El id es obligatorio en el parametro lista de valores"}`;
        responder(contenido);
        return;    
    };

    try {
        (consologuearProceso) ? console.log(`${metodoHandler}, Consultando por axios.delete a la ruta: ${url}`) : null;
        //contenido = await axios.get(encodeURI(url) , { timeout: 10000 });
        contenido = await axios.delete(url, { timeout: 10000 });    
    } catch (error) { 
        (consologuearErrorAxios) ? console.log(`${metodoHandler}, -> Error, Axios no pudo eliminar los datos en la ruta ${url}`,error) : null; 
        (!contenido)
            ? contenido = {msg: `Axios no pudo eliminar los datos en la ruta: ${url}`}
            : null;
    };

    (consologuearValorRetornado && contenido) 
        ? console.log(`${metodoHandler}, -> (contenido): `, contenido)
        : null;

    responder(contenido);
    return;
}; 
*/


/** 
 * Eliminar un simInvBtc (por body) 
 * /api/eliminar
 * Probado Funcionando ok.
 */
const eliminarSimInvBtcPorBody = async ( body, srvUri=mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'eliminarSimInvBtcPorBody';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    let url = `${srvUri}/api/simInvBtc/eliminar/registro`;
    (consologuearProceso) ? console.log(`${metodoHandler} (url)-> ${url}`) : null;

    let myBody ={}
    myBody = decodeURIComponent(body);      // Reemplazo caracteres %x de la url por caracteres equivalentes
    myBody = JSON.parse(myBody);            // parseo el string como objeto Json
    (consologuearProceso) ? console.log(`${metodoHandler} (body)-> ${myBody}`) : null;
    (consologuearProceso) ? console.log(`${metodoHandler} (body-Objeto):`, myBody) : null;

         
    const {_id} = myBody;                   // Destructuro el id
    myBody = {data:{ _id: `${_id}` }};           // Construyo el parametro del body
    (consologuearProceso) ? console.log(`${metodoHandler} (body-Objeto final):`, myBody) : null; 
    

    let contenido;
    try {
        //contenido = await axios.delete(url, myBody, { timeout: 10000 });
        contenido = await axios.delete(url, myBody);    
    } catch (error) {
        (consologuearErrorAxios) ? console.log(`${metodoHandler}  -> Axios, error al eliminar un registro de la coleccion.`,error) : null; 
        (!contenido)
            ? contenido = {msg: "Axios, error al eliminar un registro de la coleccion"}
            : null  
    };

    (consologuearValorRetornado && contenido) 
        ? console.log(`${metodoHandler} -> (contenido.data): `, contenido.data)
        : null;

    responder(contenido);
    return;
};



module.exports = 
                {
                    verSimInvBtcPorBody,
                    crearSimInvBtcPorBody,
                    editarSimInvBtcPorBody,
                    eliminarSimInvBtcPorBody
                }

//Lista de todos los metodos proyectados:
                /* {
                    verSimInvBtcPorParams,
                    verSimInvBtcPorQry,
                    verSimInvBtcPorBody,
                    crearSimInvBtcPorBody,
                    editarSimInvBtcPorBody,
                    eliminarSimInvBtcPorParams,
                    eliminarSimInvBtcPorQry,
                    eliminarSimInvBtcPorBody
                } */


