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
    const contenido = await axios.get(`${srvUri}/api/cats/ver/gato/${idGatito}`, { timeout: 10000 }).catch( (error) => {
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

    const contenido = await axios.get(`${srvUri}/api/cats/ver/gato?id=${idGatito}`, { timeout: 10000 }).catch( (error) => {
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
    // const {_id} ={body};
    // console.log('verGatitoPorBody ({_id)-> ',_id);
    let myBody ={}
    myBody=JSON.parse(body);
    //console.log()`verGatitoPorBody (body)-> ${myBody}`)
    
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    /* 
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
    try {
        const contenido = await axios.get(`${srvUri}/api/cats/ver/gato`, {myBody}, { timeout: 10000 })    
    } catch (error) {
        console.log('Error al recuperar los datos.',error); 
    }
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
const crearGatitoPorParams = async ( nombreGatito, srvUri=mySrvUri ) => {
    const contenido = await axios.post(`${srvUri}/api/cats/crear/${nombreGatito}`).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    return(contenido.data)
}


/** 
 * Crear un gatito (por query) 
 * /api/cats/crear
 */
const crearGatitoPorQry = async ( nombreGatito, srvUri=mySrvUri ) => {
    const contenido = await axios.post(`${srvUri}/api/cats/crear?id=${nombreGatito}`).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    return(contenido.data)
}


/** 
 * Crear un gatito (por body) 
 * /api/cats/crear
 * Body ejemplo:
 *  {
 *      "name": "Patroclo"
 *  }
 */
const crearGatitoPorBody = async ( body, srvUri=mySrvUri ) => {
    const contenido = await axios.post(`${srvUri}/api/cats/crear`, {body}).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    return(contenido.data)
}


// Metodos PUT (Modificar Gatito)
// ------------------------------


/** 
 * Editar un gatito (por params)
 * /api/editar 
*/
const editarGatitoPorParams = async ( idGatito, nombreGatito, srvUri=mySrvUri ) => {
    const contenido = await axios.put(`${srvUri}/api/editar/${idGatito}/${nombreGatito}`).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    return(contenido.data)
}


/** 
 * Editar un gatito (por query) 
 * /api/editar
 */
const editarGatitoPorQry = async ( idGatito, nombreGatito, srvUri=mySrvUri ) => {
    const contenido = await axios.put(`${srvUri}/api/editar?id=${idGatito}&name=${nombreGatito}`).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    return(contenido.data)
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
const editarGatitoPorBody = async ( body, srvUri=mySrvUri ) => {
    const contenido = await axios.put(`${srvUri}/api/editar`, {body}).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    return(contenido.data)
}


// Metodos DELETE (Eliminar Gatito)
// --------------------------------


/** 
 * Eliminar un gatito (por params)
 * /api/eliminar 
*/
const eliminarGatitoPorParams = async ( idGatito, srvUri=mySrvUri ) => {
    const contenido = await axios.delete(`${srvUri}/api/eliminar/${idGatito}`).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    return(contenido.data)
}


/** 
 * Eliminar un gatito (por query) 
 * /api/eliminar
 */
const eliminarGatitoPorQry = async ( idGatito, srvUri=mySrvUri ) => {
    const contenido = await axios.delete(`${srvUri}/api/eliminar?id=${idGatito}`).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    return(contenido.data)
}


/** 
 * Eliminar un gatito (por body) 
 * /api/eliminar
 * Body ejemplo:
 *  {
 *      "_id": "6258d21ba60416c73341165e"
 *  }
 */
const eliminarGatitoPorBody = async ( body, srvUri=mySrvUri ) => {
    const contenido = await axios.delete(`${srvUri}/api/eliminar`, {body}).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    return(contenido.data)
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


