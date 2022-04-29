const axios = require('axios');
const entorno = require('../appSrvEntorno');
//const qs = require('qs');

const {fnMiServidor}= entorno
let {srvPuerto} = fnMiServidor()
const mySrvUri = `http://localhost:${srvPuerto}`

const consologuearErrores = false



/** 
 * dolarHoy,
 * euroHoy,
 * btcHoy 
 * */



/** 
 * Obtener el valor del dolar Oficial
 * api/externas
 */
 const dolarOficialHoy = async (srvUri = mySrvUri, responder ) => {

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    /* 
    // este codigo genera error:
    // (Nodo: 13240) ADVERTENCIA DE REEMPLAZO DE PROMISIÓN UNHANDLED: ADVERTENCIA DE PROMISIÓN UNHANGLED. 
    //   Este error se originó, lanzando dentro de una función de ASYNC sin un bloque de captura, o rechazando una promesa que no se manejó con .catch (). Para rescindir el proceso de nodo en el rechazo de la promesa sin controlar, use la bandera de CLI `- Redondeled-rechace = estrict` (ver https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (ID de rechazo: 2)
    // (Nodo: 13240) [DEP0018] ADVERTENCIA DE DESPECACIÓN: Las rejecciones de promesa no controladas están en desuso. En el futuro, las rejillas prometedoras que no se manejan terminarán el proceso de nodo.js con un código de salida que no se encuentra.   

    const contenido = await axios.get(`${srvUri}/api/cats/ver/gato`, {body}, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });
     */
    
    //let url = `${srvUri}/api/cats/ver/gato`;
    let url = `https://api.bluelytics.com.ar/v2/latest`;

    let contenido;

    try {
        //contenido = await axios.get(url ,myBody , { timeout: 10000 } );
        contenido = await axios.get(url, { timeout: 10000 } );    
    } catch (error) {
        console.log('dolarOficialHoy -> Error al recuperar los datos.',error); 
        (!contenido)
            ? contenido = {msg: "Axios no pudo recuperar los datos"}
            : null
    };
    
    console.log('dolarOficialHoy -> (contenido): ', contenido.data);
    responder(contenido.data);
    //return(contenido.data);
    return;
}


/** 
 * Obtener el valor del dolar Blue
 * api/externas
 */
 const dolarBlueHoy = async (srvUri = mySrvUri, responder ) => {

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    //let url = `${srvUri}/api/cats/ver/gato`;
    let url = `https://api.bluelytics.com.ar/v2/latest`;

    let contenido;

    try {
        //contenido = await axios.get(url ,myBody , { timeout: 10000 } );
        contenido = await axios.get(url, { timeout: 10000 } );    
    } catch (error) {
        console.log('dolarBluelHoy -> Error al recuperar los datos.',error); 
        (!contenido)
            ? contenido = {msg: "Axios no pudo recuperar los datos"}
            : null
    };
    
    console.log('dolarBluelHoy -> (contenido): ', contenido.data);
    responder(contenido.data);
    //return(contenido.data);
    return;
}

/** 
 * Obtener el valor del dolar Oficial y Blue
 * api/externas
 */
 const euroHoy = async (srvUri = mySrvUri, responder ) => {

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    //let url = `${srvUri}/api/cats/ver/gato`;
    let url = `https://api.bluelytics.com.ar/v2/latest`;

    let contenido;

    try {
        //contenido = await axios.get(url ,myBody , { timeout: 10000 } );
        contenido = await axios.get(url, { timeout: 10000 } );    
    } catch (error) {
        console.log('euroHoy -> Error al recuperar los datos.',error); 
        (!contenido)
            ? contenido = {msg: "Axios no pudo recuperar los datos"}
            : null
    };
    
    console.log('euroHoy -> (contenido): ', contenido.data);
    responder(contenido.data);
    //return(contenido.data);
    return;
}


module.exports = 
                {
                    dolarOficialHoy,
                    dolarBlueHoy,
                    euroHoy
                }



