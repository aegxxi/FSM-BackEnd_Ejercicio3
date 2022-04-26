const axios = require('axios');
const entorno = require('../appSrvEntorno');

const {fnMiServidor}= entorno
let {srvPuerto} = fnMiServidor()
const mySrvUri = `http://localhost:${srvPuerto}`

const consologuearErrores = false


/* 
//ejemplo
const x = axios.get('/user?ID=12345').catch( (error) => {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    };
    error.origin = 'Error al obtener la ruta';
    throw error;
}); 
*/



// Metodos GET (Ver Gatito)
// ------------------------


/** 
 * Ver un gatito (por params)
 * api/ver/gato 
*/
const verGatitoPorParams = async ( idGatito, srvUri = mySrvUri, responder ) => {
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    //console.log('verGatitoPorParams -> param(srvUri):',srvUri)
    
    let contenido;
    contenido = await axios.get(`${srvUri}/api/cats/ver/gato/${idGatito}`, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    //console.log('verGatitoPorParams',contenido);
    responder(contenido);
    //return(contenido);
    return;
}


/** 
 * Ver un gatito (por query) 
 * api/ver/gato
 */
const verGatitoPorQry = async ( idGatito, srvUri=mySrvUri, responder ) => {
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    let contenido
    contenido = await axios.get(`${srvUri}/api/cats/ver/gato?id=${idGatito}`, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    responder(contenido);
    //return(contenido.data)
    return;
}


/** 
 * Ver un gatito (por body) 
 * api/ver/gato
 */
const verGatitoPorBody = async ( body, srvUri = mySrvUri, responder ) => {

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    let myBody; 
    myBody = decodeURIComponent(body);
    myBody = JSON.parse(myBody);
    console.log(`verGatitoPorBody (body)-> ${myBody}`);
    console.log(`verGatitoPorBody (body-Objeto): `, myBody);
    
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
    
    let contenido
    try {
        contenido = await axios.get(`${srvUri}/api/cats/ver/gato`, {myBody}, { timeout: 10000 })    
    } catch (error) {
        console.log('Error al recuperar los datos.',error); 
    };
    
    console.log(contenido);
    responder(contenido);
    //return(contenido.data)
    return;
}


// Metodos POST (Crear Gatito)
// ---------------------------


/** 
 * Crear un gatito (por params)
 * /api/cats/crear 
*/
const crearGatitoPorParams = async ( nombreGatito, srvUri=mySrvUri, responder ) => {   
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    let contenido
    contenido = await axios.post(`${srvUri}/api/cats/crear/${nombreGatito}`, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    console.log(contenido);
    responder(contenido);
    //return(contenido.data)
    return;
}


/** 
 * Crear un gatito (por query) 
 * /api/cats/crear
 */
const crearGatitoPorQry = async ( nombreGatito, srvUri=mySrvUri, responder ) => {
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    const contenido = await axios.post(`${srvUri}/api/cats/crear?id=${nombreGatito}`, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    console.log(contenido);
    responder(contenido);
    //return(contenido.data)
    return;
}


/** 
 * Crear un gatito (por body) 
 * /api/cats/crear
 * Body ejemplo:
 *  {
 *      "name": "Patroclo"
 *  }
 */
const crearGatitoPorBody = async ( body, srvUri=mySrvUri, responder ) => {
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    let myBody; 
    myBody = decodeURIComponent(body);
    myBody = JSON.parse(myBody);
    //const decodedComponent = decodeURIComponent(component);
    console.log(`crearGatitoPorBody (body)-> ${myBody}`);
    console.log(`crearGatitoPorBody (body-Objeto): `, myBody);

   /* 
   // este codigo genera error:
   // (Nodo: 13240) ADVERTENCIA DE REEMPLAZO DE PROMISIÓN UNHANDLED: ADVERTENCIA DE PROMISIÓN UNHANGLED. 
   //   Este error se originó, lanzando dentro de una función de ASYNC sin un bloque de captura, o rechazando una promesa que no se manejó con .catch (). Para rescindir el proceso de nodo en el rechazo de la promesa sin controlar, use la bandera de CLI `- Redondeled-rechace = estrict` (ver https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (ID de rechazo: 2)
   // (Nodo: 13240) [DEP0018] ADVERTENCIA DE DESPECACIÓN: Las rejecciones de promesa no controladas están en desuso. En el futuro, las rejillas prometedoras que no se manejan terminarán el proceso de nodo.js con un código de salida que no se encuentra.   
   
   const contenido = await axios.post(`${srvUri}/api/cats/crear`, {myBody}, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    }); 
    */

    let contenido;
    try {
        contenido = await axios.post(`${srvUri}/api/cats/crear`, {myBody}, { timeout: 10000 })    
    } catch (error) {
        console.log('Error al crear el gatito.',error);  
        (contenido)  
            ?contenido = contenido
            :contenido = 'Error al crear el gatito en la base de datos.'
    }

    console.log(contenido);
    responder(contenido);
    //return(contenido.data)
    return;
}


// Metodos PUT (Modificar Gatito)
// ------------------------------


/** 
 * Editar un gatito (por params)
 * /api/editar 
*/
const editarGatitoPorParams = async ( idGatito, nombreGatito, srvUri=mySrvUri, responder ) => {
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    const contenido = await axios.put(`${srvUri}/api/cats/editar/${idGatito}/${nombreGatito}`, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    console.log(contenido);
    responder(contenido);
    //return(contenido.data)
    return;
}


/** 
 * Editar un gatito (por query) 
 * /api/editar
 */
const editarGatitoPorQry = async ( idGatito, nombreGatito, srvUri=mySrvUri, responder ) => {
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    const contenido = await axios.put(`${srvUri}/api/cats/editar?id=${idGatito}&name=${nombreGatito}`, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    console.log(contenido);
    responder(contenido);
    //return(contenido.data)
    return;
}


/** 
 * Editar un gatito (por body) 
 * /api/editar
 * Body ejemplo:
 *  {
 *      "_id": "6258d21ba60416c73341165e",
 *      "name": "Patroclo"
 *  }
 */
const editarGatitoPorBody = async ( body, srvUri=mySrvUri, responder ) => {
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    let myBody ={}
    myBody = JSON.parse(body);
    console.log(`editarGatitoPorBody (body)-> ${myBody}`);

    const contenido = await axios.put(`${srvUri}/api/cats/editar`, {myBody}, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    console.log(contenido);
    responder(contenido);
    //return(contenido.data)
    return;
}


// Metodos DELETE (Eliminar Gatito)
// --------------------------------


/** 
 * Eliminar un gatito (por params)
 * /api/eliminar 
*/
const eliminarGatitoPorParams = async ( idGatito, srvUri=mySrvUri, responder ) => {
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

     contenido = await axios.delete(`${srvUri}/api/cats/eliminar/${idGatito}`, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    console.log(contenido);
    responder(contenido);
    //return(contenido.data)
    return;
}


/** 
 * Eliminar un gatito (por query) 
 * /api/eliminar
 */
const eliminarGatitoPorQry = async ( idGatito, srvUri=mySrvUri, responder ) => {
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    const contenido = await axios.delete(`${srvUri}/api/cats/eliminar/?id=${idGatito}`, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    console.log(contenido);
    responder(contenido);
    //return(contenido.data)
    return;
}


/** 
 * Eliminar un gatito (por body) 
 * /api/eliminar
 * Body ejemplo:
 *  {
 *      "_id": "6258d21ba60416c73341165e"
 *  }
 */
const eliminarGatitoPorBody = async ( body, srvUri=mySrvUri, responder ) => {
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    let myBody ={}
    myBody = JSON.parse(body);
    console.log(`eliminarGatitoPorBody (body)-> ${myBody}`);

    const contenido = await axios.delete(`${srvUri}/api/cats/eliminar/`, {myBody}, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    console.log(contenido);
    responder(contenido);
    //return(contenido.data)
    return;
}



module.exports = 
                {
                    verGatitoPorParams,
                    verGatitoPorQry,
                    verGatitoPorBody,
                    crearGatitoPorParams,
                    crearGatitoPorQry,
                    crearGatitoPorBody,
                    editarGatitoPorParams,
                    editarGatitoPorQry,
                    editarGatitoPorBody,
                    eliminarGatitoPorParams,
                    eliminarGatitoPorQry,
                    eliminarGatitoPorBody
                }


