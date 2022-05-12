/** 
 * ----------------------------
 * Modulo: catsCrudAxiosTest.js
 * ----------------------------
 * Parte de: Cats, ejemplo de Coleccion, CRUD, y Axios .
 * 
 * Descripcion: Este modulo contiene los metodos (Funciones) que utilice para hacer comprobaciones
 *              (Test) del funcionamiento de las llamadas a Axios en sus diferentes metodos 
 *              (Get, Post, Put, Delete), e ir consologueando proceso y resultados para cada
 *              accion programada en las rutas del CRUD de la coleccion de ejemplo Cats.
*/


// Importo las dependencias.
const axios = require('axios');

/** Ejecutar Test
 * --------------
 * Comando:
 *      node  ./consultas/catsCrudAxiosTest.js 
 * 
 * Script:
 *      npm run testCatsAxios 
*/




// const entorno = require('../appSrvEntorno');
// const {fnMiServidor}= entorno;
// let {srvPuerto} = fnMiServidor();



// Establer el puerto de sevidor
let srvPuerto = '4001';

//Establecer la Uri del servidor
const mySrvUri = `http://localhost:${srvPuerto}`;

//Establecer si se muestran los errores de Axios
const consologuearErroresAxios = false;

// Definir que test seran corridos
const nombreTest = {
    testVerGatitoPorParams: false,
    testVerGatitoPorQry: false,
    testVerGatitoPorBody: false,             
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

// Establecer los valores para los test que seran corridos
const testValores = {
    id: "6269ae7c71de5bd7eb580ad2",                 // name: "Pericles", _id: 6258d21ba60416c73341165e
    name: "Tormento",
    newName: "Salvaje"
}


// Llamo a la funcion test(), la cual correra los test seleccionados con los valores asignados previamente
test()



function test() {
    let testFunction;
    let testResultado;

    console.log();
    console.log('* Recuerda que debes seleccionar los test a ejecutar y los valores para el mismo:');
    console.log('   - Debes asignar el valor true o false a cada test en el objeto "nombreTest",');
    console.log('   - Debes asignar los valores que utilizaran los test en el objeto "testValores",');
    console.log('  Pudes hacerlo en el archivo ./consultas/catsCrudAxiosTest.js'  );
    console.log();
    console.log('-----------------------------------------------------');
    console.log('Iniciando el test de Axios para el CRUD de gatitos...');
    console.log();

    // inicio la ejecucion de los Test que se hayan seleccionado en el objeto nombreTest

    if (nombreTest.testVerGatitoPorParams) {
        //testVerGatitoPorParams
        testFunction = 'testVerGatitoPorParams';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testVerGatitoPorParams( testValores.id );       // name: "Pericles", _id: 6258d21ba60416c73341165e
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }
    
    //TestVerGatitoPorQry
    if (nombreTest.testVerGatitoPorQry) {
        
        testFunction = 'TestVerGatitoPorQry';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testVerGatitoPorQry( testValores.id );
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();
    };

    //testVerGatitoPorBody
    if (nombreTest.testVerGatitoPorBody) {
        testFunction = 'testVerGatitoPorBody';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testVerGatitoPorBody(`{"_id": ${testValores.id}}`);
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();
    }

    //testCrearGatitoPorParams
    if (nombreTest.testCrearGatitoPorParams) {
        testFunction = 'testCrearGatitoPorParams';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testCrearGatitoPorParams( testValores.name );
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

     //testCrearGatitoPorQry
     if (nombreTest.testCrearGatitoPorQry) {
        testFunction = 'testCrearGatitoPorQry';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testCrearGatitoPorQry( testValores.name );
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

    //testCrearGatitoPorBody
    if (nombreTest.testEditarGatitoPorBody) {
        testFunction = 'testCrearGatitoPorBody';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testCrearGatitoPorBody(`{"name": ${testValores.name}}`);
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

    //testEditarGatitoPorParams
    if (nombreTest.testEditarGatitoPorParams) {
        testFunction = 'testEditarGatitoPorParams';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testEditarGatitoPorParams(`{_id": ${testValores.id}","name": ${testValores.name}}`);
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

    //testEditarGatitoPorQry
    if (nombreTest.testEditarGatitoPorQry) {
        testFunction = 'testEditarGatitoPorQry';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testEditarGatitoPorQry(`{_id": ${testValores.id}","name": ${testValores.name}}`);
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

    //testEditarGatitoPorBody
    if (nombreTest.testEditarGatitoPorBody) {
        testFunction = 'testEditarGatitoPorBody';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testEditarGatitoPorBody( `{_id": ${testValores.id}","name": ${testValores.name}}` );
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

    //testEliminarGatitoPorParams
    if (nombreTest.testEliminarGatitoPorParams) {
        testFunction = 'testEliminarGatitoPorParams';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testEliminarGatitoPorParams( testValores.id );
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

    //testEliminarGatitoPorQry
    if (nombreTest.testEliminarGatitoPorQry) {
        testFunction = 'testEliminarGatitoPorQry';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testEliminarGatitoPorQry( testValores.id );
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

    //testEliminarGatitoPorBody
    if (nombreTest.testEliminarGatitoPorBody) {
        testFunction = 'testEliminarGatitoPorBody';
        console.log(`Llamando a ${testFunction}:`);
        testResultado = testEliminarGatitoPorBody(`{_id": ${testValores.id}}`);
        console.log(`${testFunction} -> Valor devuelto en variable testResultado:`,testResultado);
        console.log();    
    }

    console.log('Finalizado el test de Axios para el CRUD de gatitos.');
    console.log('----------------------------------------------------');
    console.log();

}





// ------------------------
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
    
    let url = `${srvUri}/api/cats/ver/gato/${idGatito}`;

    let contenido;
    contenido = await axios.get(url , { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErroresAxios) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'verGatitoPorParams -> Error al obtener la ruta';
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

    let url = `${srvUri}/api/cats/ver/gato?id=${idGatito}`;

    let contenido;
    contenido = await axios.get(url, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErroresAxios) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'verGatitoPorQry -> Error al obtener la ruta';
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
    console.log(`TestVerGatitoPorBody (body)-> ${myBody}`);
    console.log(`TestVerGatitoPorBody (body-Objeto): `, myBody);
    const {_id} = myBody;                   // deconstruyo el objeto myBody y tomo el id
    myBody = { params: { id: `${_id}` } };  // armo el objeto para el parametro body de axios
    console.log(`TestVerGatitoPorBody (body Destructurado_&_Restructurado)-> ${myBody}`,myBody);

    let contenido;
    try {
        contenido = await axios.get(url ,myBody , { timeout: 10000 });    
    } catch (error) {
        console.log('TestVerGatitoPorBody -> Error al recuperar los datos.',error); 
    };
    
    console.log('TestVerGatitoPorBody -> Gatito encontrado: ',contenido.data);
    return(contenido.data);
}



// ---------------------------
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

    let url = `${srvUri}/api/cats/crear/${nombreGatito}`;
    let body = { name: nombreGatito };

    let contenido;
    contenido = await axios.post(url ,body ,{ timeout: 10000 } ).catch( (error) => {
        if (error.response && consologuearErroresAxios) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'crearGatitoPorParams -> Error al obtener la ruta';
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

    let url = `${srvUri}/api/cats/crear?id=${nombreGatito}`;
    let body = { name: nombreGatito };

    let contenido;
    contenido = await axios.post(url ,body ,{ timeout: 10000 } ).catch( (error) => {
        if (error.response && consologuearErroresAxios) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'testCrearGatitoPorQry -> Error al obtener la ruta';
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
    console.log(`testCrearGatitoPorBody (body)-> ${myBody}`);
    console.log(`testCrearGatitoPorBody (body-Objeto): `, myBody);
    // const {_id} = myBody;
    // myBody = { _id: `"${_id}"` };

    let contenido;
    try {
        contenido = await axios.post(url, myBody, { timeout: 10000 });    
    } catch (error) {
        console.log('testCrearGatitoPorBody -> Error al crear el gatito.',error);  
        (contenido)  
            ?contenido = contenido
            :contenido = 'testCrearGatitoPorBody -> Error al crear el gatito en la base de datos.'
    }

    console.log('testCrearGatitoPorBody -> Gatito creado: ',contenido.data);
    return(contenido.data);
}



// ------------------------------
// Metodos PUT (Modificar Gatito)
// ------------------------------

/** 
 * Editar un gatito (por params)
 * /api/editar 
*/
async function testEditarGatitoPorParams( body , srvUri=mySrvUri ) {
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    let myBody = {}
    myBody = JSON.parse(body);
    console.log(`testEditarGatitoPorParams (body)-> ${myBody}`);
    console.log(`testEditarGatitoPorParams (body-Objeto): `, myBody);
    const {_id, name} = myBody;
    myBody = { _id: _id,
                name: name
            };
    console.log(`testEditarGatitoPorParams (body Destructurado_&_Restructurado)-> ${myBody}`,myBody);

    url = `${srvUri}/api/cats/editar/${_id}/${name}`;

    let contenido
    contenido = await axios.put(url, myBody, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErroresAxios) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'testEditarGatitoPorParams -> Error al obtener la ruta';
        throw error;
    });

    console.log('testEditarGatitoPorParams -> Gatito modificado: ',contenido.data);
    return(contenido.data);
}


/** 
 * Editar un gatito (por query) 
 * /api/editar
 */
async function testEditarGatitoPorQry( body, srvUri=mySrvUri ) {
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    let myBody ={}
    myBody = JSON.parse(body);
    console.log(`testEditarGatitoPorQry (body)-> ${myBody}`);
    console.log(`testEditarGatitoPorQry (body-Objeto): `, myBody);
    const {_id, name} = myBody;
    myBody = { _id: _id,
                name: name
            };
    console.log(`testEditarGatitoPorQry (body Destructurado_&_Restructurado)-> ${myBody}`,myBody);
    
    let url = `${srvUri}/api/cats/editar?id=${_id}&name=${name}`;

    let contenido;
    contenido = await axios.put(url, myBody, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErroresAxios) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'testEditarGatitoPorQry -> Error al obtener la ruta';
        throw error;
    });

    console.log('testEditarGatitoPorQry -> Gatito modificado: ',contenido.data);
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
    let url = `${srvUri}/api/cats/editar`;
    
    let myBody ={}
    myBody = JSON.parse(body);
    console.log(`testEditarGatitoPorBody (body)-> ${myBody}`);
    console.log(`testEditarGatitoPorBody (body-Objeto): `, myBody);
    const {_id, name} = myBody;
    myBody = { _id: _id,
                name: name
            };
    console.log(`testEditarGatitoPorBody (body Destructurado_&_Restructurado)-> ${myBody}`,myBody);

    let contenido;
    contenido = await axios.put(url, myBody, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErroresAxios) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'testEditarGatitoPorBody -> Error al obtener la ruta';
        throw error;
    });

    console.log('testEditarGatitoPorBody -> Gatito modificado: ',contenido.data);
    return(contenido.data);
}



// --------------------------------
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

    let url = `${srvUri}/api/cats/eliminar/${idGatito}`;

    let contenido;
    contenido = await axios.delete(url, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErroresAxios) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'testEliminarGatitoPorParams -> Error al obtener la ruta';
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

    let url = `${srvUri}/api/cats/eliminar/?id=${idGatito}`;

    let contenido;
    contenido = await axios.delete(url, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErroresAxios) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'eliminarGatitoPorQry -> Error al obtener la ruta';
        throw error;
    });

    console.log('testEliminarGatitoPorQry -> Gatito eliminado: ',contenido.data);
    return(contenido.data);
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

    let url = `${srvUri}/api/cats/eliminar/`;

    let myBody; 
    myBody = decodeURIComponent(body);      // Reemplazo caracteres %x de la url por caracteres equivalentes
    myBody = JSON.parse(myBody);            // parseo el string como objeto Json
    console.log(`testEliminarGatitoPorBody (body)-> ${myBody}`);
    console.log(`testEliminarGatitoPorBody (body-Objeto): `, myBody);
    const {_id} = myBody;                   // Destructuro el id
    myBody = { _id: `"${_id}"` };           // Construyo el parametro del body

    let contenido;
    contenido = await axios.delete(url, {myBody}, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErroresAxios) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = 'testEliminarGatitoPorBody ->Error al obtener la ruta';
        throw error;
    });

    console.log('testEliminarGatitoPorBody -> Gatito eliminado: ',contenido.data);
    return(contenido.data);
}





