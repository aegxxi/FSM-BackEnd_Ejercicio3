const axios = require('axios');
const entorno = require('../appSrvEntorno');
//const qs = require('qs');

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
    
    let url = `${srvUri}/api/cats/ver/gato/${idGatito}`;

    let contenido;
    contenido = await axios.get(url , { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'verGatitoPorParams -> Error al obtener la ruta';
        throw error;
    });

    //console.log('verGatitoPorParams',contenido);
    responder(contenido);
    //return(contenido);
    return;
};


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

    let url = `${srvUri}/api/cats/ver/gato?id=${idGatito}`;

    let contenido;
    contenido = await axios.get(url, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'verGatitoPorQry -> Error al obtener la ruta';
        throw error;
    });

    responder(contenido);
    //return(contenido.data);
    return;
};


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
    
    //console.log(`verGatitoPorBody (body-qs.stringify): `, qs.stringify(myBody));

    //const qs = require('qs');
    //axios.post('/foo', qs.stringify({ 'bar': 123 }));
    
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
    
    let url = `${srvUri}/api/cats/ver/gato`;

    let myBody; 
    myBody = decodeURIComponent(body);      // Reemplazo caracteres %x de la url por caracteres equivalentes
    myBody = JSON.parse(myBody);            // parseo el string como objeto Json
    console.log(`crearGatitoPorBody (body)-> ${myBody}`);
    console.log(`crearGatitoPorBody (body-Objeto): `, myBody);
    const {_id} = myBody;                   // deconstruyo el objeto myBody y tomo el id
    myBody = { params: { id: `${_id}` } };  // armo el objeto para el parametro body de axios
    console.log(`crearGatitoPorBody (body Destructurado_&_Restructurado)-> ${myBody}`,myBody);
    // axios.get(
    //     '/bezkoder.com/tutorials',
    //     { params: { title: 'ios' }  }
    //   );


    const headers = {
        "Content-Type": "application/json"
        //{ timeout: 10000 }
    }
    
    let contenido;
    try {
        contenido = await axios.get(url ,myBody , { timeout: 10000 });    
    } catch (error) {
        console.log('verGatitoPorBody -> Error al recuperar los datos.',error); 
    };
    
    console.log(contenido);
    responder(contenido);
    //return(contenido.data);
    return;
};


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

    let url = `${srvUri}/api/cats/crear/${nombreGatito}`;
    let body = { name: nombreGatito };

    let contenido;
    contenido = await axios.post(url ,body ,{ timeout: 10000 } ).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'crearGatitoPorParams -> Error al obtener la ruta';
        throw error;
    });

    console.log(contenido);
    responder(contenido);
    //return(contenido.data);
    return;
};


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

    let url = `${srvUri}/api/cats/crear?id=${nombreGatito}`;
    let body = { name: nombreGatito };

    let contenido;
    contenido = await axios.post(url ,body ,{ timeout: 10000 } ).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'crearGatitoPorQry -> Error al obtener la ruta';
        throw error;
    });

    console.log(contenido);
    responder(contenido);
    //return(contenido.data);
    return;
};


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
    
    let url = `${srvUri}/api/cats/crear`;
    
    let myBody; 
    myBody = decodeURIComponent(body);      // Reemplazo caracteres %x de la url por caracteres equivalentes
    myBody = JSON.parse(myBody);            // parseo el string como objeto Json
    console.log(`crearGatitoPorBody (body)-> ${myBody}`);
    console.log(`crearGatitoPorBody (body-Objeto): `, myBody);
    // const {_id} = myBody;
    // myBody = { _id: `"${_id}"` };

    let contenido;
    try {
        contenido = await axios.post(url, myBody, { timeout: 10000 });    
    } catch (error) {
        console.log('crearGatitoPorBody -> Error al crear el gatito.',error);  
        (contenido)  
            ?contenido = contenido
            :contenido = 'crearGatitoPorBody -> Error al crear el gatito en la base de datos.'
    }

    console.log(contenido);
    responder(contenido);
    //return(contenido.data);
    return;
};


// ------------------------------
// Metodos PUT (Modificar Gatito)
// ------------------------------

/** 
 * Editar un gatito (por params)
 * /api/editar 
*/
const editarGatitoPorParams = async ( body, srvUri=mySrvUri, responder ) => {
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    let myBody = {}
    myBody = JSON.parse(body);
    console.log(`editarGatitoPorBody (body)-> ${myBody}`);
    console.log(`editaratitoPorBody (body-Objeto): `, myBody);
    const {_id, name} = myBody;
    myBody = { _id: _id,
                name: name
            };
    console.log(`editaratitoPorBody (body Destructurado_&_Restructurado)-> ${myBody}`,myBody);

    url = `${srvUri}/api/cats/editar/${_id}/${name}`;

    let contenido
    contenido = await axios.put(url, myBody, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'editarGatitoPorParams -> Error al obtener la ruta';
        throw error;
    });

    console.log(contenido);
    responder(contenido);
    //return(contenido.data);
    return;
};


/** 
 * Editar un gatito (por query) 
 * /api/editar
 */
const editarGatitoPorQry = async ( body, srvUri=mySrvUri, responder ) => {
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    let myBody ={}
    myBody = JSON.parse(body);
    console.log(`editarGatitoPorBody (body)-> ${myBody}`);
    console.log(`editaratitoPorBody (body-Objeto): `, myBody);
    const {_id, name} = myBody;
    myBody = { _id: _id,
                name: name
            };
    console.log(`editaratitoPorBody (body Destructurado_&_Restructurado)-> ${myBody}`,myBody);
    
    let url = `${srvUri}/api/cats/editar?id=${_id}&name=${name}`;

    let contenido;
    contenido = await axios.put(url, myBody, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'editarGatitoPorQry -> Error al obtener la ruta';
        throw error;
    });

    console.log(contenido);
    responder(contenido);
    //return(contenido.data);
    return;
};


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
    let url = `${srvUri}/api/cats/editar`;
    
    let myBody ={}
    myBody = JSON.parse(body);
    console.log(`editarGatitoPorBody (body)-> ${myBody}`);
    console.log(`editaratitoPorBody (body-Objeto): `, myBody);
    const {_id, name} = myBody;
    myBody = { _id: _id,
                name: name
            };
    console.log(`editaratitoPorBody (body Destructurado_&_Restructurado)-> ${myBody}`,myBody);

    let contenido;
    contenido = await axios.put(url, myBody, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'editarGatitoPorBody -> Error al obtener la ruta';
        throw error;
    });

    console.log(contenido);
    responder(contenido);
    //return(contenido.data);
    return;
};



// --------------------------------
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

    let url = `${srvUri}/api/cats/eliminar/${idGatito}`;

    let contenido;
    contenido = await axios.delete(url, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'eliminarGatitoPorParams -> Error al obtener la ruta';
        throw error;
    });

    console.log(contenido);
    responder(contenido);
    //return(contenido.data);
    return;
};


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

    let url = `${srvUri}/api/cats/eliminar/?id=${idGatito}`;

    let contenido;
    contenido = await axios.delete(url, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'eliminarGatitoPorQry -> Error al obtener la ruta';
        throw error;
    });

    console.log(contenido);
    responder(contenido);
    //return(contenido.data);
    return;
};


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

    let url = `${srvUri}/api/cats/eliminar/`;

    let myBody; 
    myBody = decodeURIComponent(body);      // Reemplazo caracteres %x de la url por caracteres equivalentes
    myBody = JSON.parse(myBody);            // parseo el string como objeto Json
    console.log(`eliminarGatitoPorBody (body)-> ${myBody}`);
    console.log(`eliminarGatitoPorBody (body-Objeto): `, myBody);
    const {_id} = myBody;                   // Destructuro el id
    myBody = { _id: `"${_id}"` };           // Construyo el parametro del body

    let contenido;
    contenido = await axios.delete(url, {myBody}, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'eliminarGatitoPorBody ->Error al obtener la ruta';
        throw error;
    });

    console.log(contenido);
    responder(contenido);
    //return(contenido.data);
    return;
};



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


