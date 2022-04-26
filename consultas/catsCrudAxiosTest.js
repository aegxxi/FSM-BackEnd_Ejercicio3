const axios = require('axios');

// const entorno = require('../appSrvEntorno');
// const {fnMiServidor}= entorno;
// let {srvPuerto} = fnMiServidor();

// Establer el puerto de sevidor
let srvPuerto = '4001';

//Establecer la Uri del servidor
const mySrvUri = `http://localhost:${srvPuerto}`;

//Establecer si se muestran los errores de Axios
const consologuearErrores = false;

const nombreTest = {
    testVerGatitoPorParams: true,
    testVerGatitoPorQry: true,
    testVerGatitoPorBody: false,           //Creo el objeto body parseando el parametro(Tipo:Texto) pasado a la funcion
    testVerGatitoPorBody2: false,           //Creo el objeto body dentro de la llamada a Axios
    testCrearGatitoPorParams: false,
    testCrearGatitoPorQry: false,
    testCrearGatitoPorBody: false,
    testEditarGatitoPorParams: false,
    testEditarGatitoPorQry: false,
    testEditarGatitoPorBody: false,
    testEliminarGatitoPorParams: false,
    testEliminarGatitoPorQry:false,
    testEliminarGatitoPorBody: false
}

/** Ejecutar Test
 * --------------
 * Comando:
 *          node  ./consultas/catsCrudAxiosTest.js  
*/

test()



function test() {
    let testFunction;
    let testResultado;

    console.log();
    console.log('* Recuerda que debes seleccionar los test a ejecutar:');
    console.log('  Debes asignar el valor true o false a cada test en el objeto "nombreTest",');
    console.log('  en el archivo ./consultas/catsCrudAxiosTest.js'  );
    console.log();
    console.log('-----------------------------------------------------')
    console.log('Iniciando el test de Axios para el CRUD de gatitos...');
    console.log();

    if (nombreTest.testVerGatitoPorParams) {
        //testVerGatitoPorParams
        testFunction = 'testVerGatitoPorParams';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testVerGatitoPorParams('6258d21ba60416c73341165e');
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }
    
    //TestVerGatitoPorQry
    if (nombreTest.testVerGatitoPorQry) {
        
        testFunction = 'TestVerGatitoPorQry';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testVerGatitoPorQry('6258d21ba60416c73341165e');
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log()
    };

    //testVerGatitoPorBody
    if (nombreTest.testVerGatitoPorBody) {
        testFunction = 'testVerGatitoPorBody';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testVerGatitoPorBody('{"_id": "6258d21ba60416c73341165e"}');
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log()
    }

    //testVerGatitoPorBody2 - Creo el objeto body dentro de la llamada a Axios
    if (nombreTest.testVerGatitoPorBody2) {
        testFunction = 'testVerGatitoPorBody2';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testVerGatitoPorBody2();
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log()
    }

    //testCrearGatitoPorParams
    if (nombreTest.testCrearGatitoPorParams) {
        testFunction = 'testCrearGatitoPorParams';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testCrearGatitoPorParams('Diogenes');
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

     //testCrearGatitoPorQry
     if (nombreTest.testCrearGatitoPorQry) {
        testFunction = 'testCrearGatitoPorQry';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testCrearGatitoPorQry('Diogenes');
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

    //testCrearGatitoPorBody
    if (nombreTest.testEditarGatitoPorBody) {
        testFunction = 'testCrearGatitoPorBody';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testCrearGatitoPorBody('{"name": "Diogenes"}');
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

    //testEditarGatitoPorParams
    if (nombreTest.testEditarGatitoPorParams) {
        testFunction = 'testEditarGatitoPorParams';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testEditarGatitoPorParams('{"_id": "6258d21ba60416c73341165e", "name": "Rodas"}');
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

    //testEditarGatitoPorQry
    if (nombreTest.testEditarGatitoPorQry) {
        testFunction = 'testEditarGatitoPorQry';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testEditarGatitoPorQry('{"_id": "6258d21ba60416c73341165e", "name": "Rodas"}');
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

    //testEditarGatitoPorBody
    if (nombreTest.testEditarGatitoPorBody) {
        testFunction = 'testEditarGatitoPorBody';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testEditarGatitoPorBody('{"_id": "6258d21ba60416c73341165e", "name": "Rodas"}');
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

    //testEliminarGatitoPorParams
    if (nombreTest.testEliminarGatitoPorParams) {
        testFunction = 'testEliminarGatitoPorParams';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testEliminarGatitoPorParams('{"_id": "6258d21ba60416c73341165e"}');
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

    //testEliminarGatitoPorQry
    if (nombreTest.testEliminarGatitoPorQry) {
        testFunction = 'testEliminarGatitoPorQry';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testEliminarGatitoPorQry('{"_id": "6258d21ba60416c73341165e"}');
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

    //testEliminarGatitoPorBody
    if (nombreTest.testEliminarGatitoPorBody) {
        testFunction = 'testEliminarGatitoPorBody';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testEliminarGatitoPorBody('{"_id": "6258d21ba60416c73341165e"}');
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

    console.log('Finalizado el test de Axios para el CRUD de gatitos.');
    console.log('----------------------------------------------------');
    console.log()

}






// Metodos GET (Ver Gatito)
// ------------------------


/** 
 * Ver un gatito (por params)
 * api/ver/gato 
*/
async function testVerGatitoPorParams( idGatito, srvUri = mySrvUri) {
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

    console.log('TestVerGatitoPorParams -> Gatito encontrado: ',contenido.data);
    return(contenido.data);
   
}


/** 
 * Ver un gatito (por query) 
 * api/ver/gato
 */
async function testVerGatitoPorQry( idGatito, srvUri=mySrvUri ) {
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

    console.log('TestVerGatitoPorQry -> Gatito encontrado: ',contenido.data);
    return(contenido.data);
}


/** 
 * Ver un gatito (por body) 
 * api/ver/gato
 */
async function testVerGatitoPorBody( body, srvUri = mySrvUri ) {

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
        return; 
    };
    
    console.log('TestVerGatitoPorBody -> Gatito encontrado: ',contenido.data);
    return(contenido.data);
}


/** 
 * Ver un gatito (por body) 
 * api/ver/gato
 */
 async function testVerGatitoPorBody2( srvUri = mySrvUri ) {

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ; 
    
    /* 
    // este codigo genera error:
    // (Nodo: 12964) ADVERTENCIA DE REEMPLAZO DE PROMISIÓN UNHANDLED: ADVERTENCIA DE PROMISIÓN UNHANGLED. 
    //   Este error se originó, lanzando dentro de una función de ASYNC sin un bloque de captura, o rechazando una promesa que no se manejó con .catch (). Para rescindir el proceso de nodo en el rechazo de la promesa sin controlar, use la bandera de CLI `- Redondeled-rechace = estrict` (ver https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (ID de rechazo: 2)
    // (Nodo: 12964) [DEP0018] ADVERTENCIA DE DESPECACIÓN: Las rejecciones de promesa no controladas están en desuso. En el futuro, las rejillas prometedoras que no se manejan terminarán el proceso de nodo.js con un código de salida que no se encuentra.   

    const contenido = await axios.get(
                                        `${srvUri}/api/cats/ver/gato`, 
                                        { _id: "6258d21ba60416c73341165e" }, 
                                        { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });
    console.log('TestVerGatitoPorBody -> Gatito encontrado: ',contenido.data);
    return(contenido.data);
    */
   
    /* 
    let myBody; 
    myBody = decodeURIComponent(body);
    myBody = JSON.parse(myBody);
    console.log(`verGatitoPorBody (body)-> ${myBody}`);
    console.log(`verGatitoPorBody (body-Objeto): `, myBody); 
     */
     
    let contenido
    try {
        contenido = await axios.get(
                                    `${srvUri}/api/cats/ver/gato`,
                                    { _id: "6258d21ba60416c73341165e" }, 
                                    { timeout: 10000 }
                                    )    
    } catch (error) {
        console.log('Error al recuperar los datos.',error);
        // console.log('Error al recuperar los datos (config) -> _id: ',error.config._id);
        // console.log('Error al recuperar los datos (config) -> method: ',error.config.method);
        // console.log('Error al recuperar los datos (config) -> url: ',error.config.url);
        // console.log('Error al recuperar los datos (config) -> data:',error.config.data);
        // console.log('Error al recuperar los datos (request) -> data:',error.request.data);

        return; 
    };
    
    console.log('TestVerGatitoPorBody2 -> Gatito encontrado: ',contenido.data);
    return(contenido.data);
};





// Metodos POST (Crear Gatito)
// ---------------------------


/** 
 * Crear un gatito (por params)
 * /api/cats/crear 
*/
async function testCrearGatitoPorParams( nombreGatito, srvUri=mySrvUri ) {   
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

    console.log('testCrearGatitoPorParams -> Gatito creado: ',contenido.data);
    return(contenido.data);
}


/** 
 * Crear un gatito (por query) 
 * /api/cats/crear
 */
async function testCrearGatitoPorQry( nombreGatito, srvUri=mySrvUri ) {
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

    console.log('testCrearGatitoPorQry -> Gatito creado: ',contenido.data);
    return(contenido.data);
}


/** 
 * Crear un gatito (por body) 
 * /api/cats/crear
 * Body ejemplo:
 *  {
 *      "name": "Patroclo"
 *  }
 */
async function testCrearGatitoPorBody ( body, srvUri=mySrvUri ) {
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

    console.log('testCrearGatitoPorBody -> Gatito creado: ',contenido.data);
    return(contenido.data);
}


// Metodos PUT (Modificar Gatito)
// ------------------------------


/** 
 * Editar un gatito (por params)
 * /api/editar 
*/
async function testEditarGatitoPorParams( idGatito, nombreGatito, srvUri=mySrvUri ) {
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

    console.log('testEditarGatitoPorParams -> Gatito modificado: ',contenido.data);
    return(contenido.data);
}


/** 
 * Editar un gatito (por query) 
 * /api/editar
 */
async function testEditarGatitoPorQry( idGatito, nombreGatito, srvUri=mySrvUri ) {
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

    console.log('editarGatitoPorQry -> Gatito modificado: ',contenido.data);
    return(contenido.data);
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
async function testEditarGatitoPorBody( body, srvUri=mySrvUri ) {
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    let myBody ={}
    myBody = JSON.parse(body);
    console.log(`testEditarGatitoPorBody (body)-> ${myBody}`);

    const contenido = await axios.put(`${srvUri}/api/cats/editar`, {myBody}, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    console.log('testEditarGatitoPorBody -> Gatito modificado: ',contenido.data);
    return(contenido.data);
}


// Metodos DELETE (Eliminar Gatito)
// --------------------------------


/** 
 * Eliminar un gatito (por params)
 * /api/eliminar 
*/
async function testEliminarGatitoPorParams( idGatito, srvUri=mySrvUri ) {
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

    console.log('testEliminarGatitoPorParams -> Gatito eliminado: ',contenido.data);
    return(contenido.data);
}


/** 
 * Eliminar un gatito (por query) 
 * /api/eliminar
 */
async function testEliminarGatitoPorQry( idGatito, srvUri=mySrvUri ) {
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

    console.log('testEliminarGatitoPorQry -> Gatito eliminado: ',contenido.data);
    return(contenido.data);
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
async function testEliminarGatitoPorBody( body, srvUri=mySrvUri ) {
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    let myBody ={}
    myBody = JSON.parse(body);
    console.log(`testEliminarGatitoPorBody (body)-> ${myBody}`);

    const contenido = await axios.delete(`${srvUri}/api/cats/eliminar/`, {myBody}, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'Error al obtener la ruta';
        throw error;
    });

    console.log('testEliminarGatitoPorBody -> Gatito eliminado: ',contenido.data);
    return(contenido.data);
}





