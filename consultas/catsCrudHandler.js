/** 
 * --------------------------
 * Modulo: catsCrudHandler.js
 * --------------------------
 * Parte de: Cat, ejemplo de Coleccion, CRUD, y Axios ..
 * 
 * Descripcion: Este modulo contiene los metodos (Funciones), que llaman a consultas Axios,
 *              que ejecutan una alguna de las acciones del CRUD de la coleccion,
 *              del "Cat".
 * 
 * Nota: Estas funciones son llamadas por el metodo (Funcion): "catResultado",
 *       desde el modulo, "controllers/catController.js".
 *       Este metodo es el controlador de la ruta:
 *       http://localhost:4001/api/cats/resultado/[Accion]/[listaDeValores]
 *       el cual determina por el contenido del parametro "Accion", cual de los metodos
 *       de este modulo sera llamado, y le entregara a dicho metodo los valores contenidos,
 *       en formato Json en el segundo parametro de esta ruta "listaDeValores".
 *       El metodo llamado procesara los datos recibidos del segundo parametro, y llamara,
 *       usando Axios, a alguno de los metodos del CRUD de la coleccion, segun la accion.
 *       Los valores resultantes de la consulta o su estado, seran pasados por medio de un
 *       callback al controlador de la ruta quien los procesara. 
*/


// Importo las dependencias.
const axios = require('axios');
const entorno = require('../appSrvEntorno');

// Defino valores Globales
const {fnMiServidor}= entorno
let {srvPuerto} = fnMiServidor()
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
const verGatitoPorParams = async ( valores, srvUri = mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'verGatitoPorParams';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    let contenido;
    let url;
    const {_id} = JSON.parse(decodeURIComponent(valores));    
    const idGatito = _id;
    
    if ( _id ) {
        url = `${srvUri}/api/cats/ver/gato/${idGatito}`;
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


/** 
 * Ver un gatito (por query) 
 * api/ver/gato
 */
const verGatitoPorQry = async ( valores, srvUri=mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'verGatitoPorQry';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    //let url = `${srvUri}/api/cats/ver/gato?id=${idGatito}`;

    let contenido;
    let url;
    const {_id} = JSON.parse(decodeURIComponent(valores));    
    const idGatito = _id;
    
    if ( _id ) {
        url = `${srvUri}/api/cats/ver/gato?id=${idGatito}`;
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


/** 
 * Ver un gatito (por body) 
 * api/ver/gato
 */
const verGatitoPorBody = async ( body, srvUri = mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'verGatitoPorBody';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    let url = `${srvUri}/api/cats/ver/gato`;
    (consologuearProceso) ? console.log(`${metodoHandler} (url)-> ${url}`) : null;

    let myBody; 
    myBody = decodeURIComponent(body);      // Reemplazo caracteres %x de la url por caracteres equivalentes
    myBody = JSON.parse(myBody);            // parseo el string como objeto Json
    console.log(`crearGatitoPorBody (body)-> ${myBody}`);
    console.log(`crearGatitoPorBody (body-Objeto): `, myBody);
    const {_id} = myBody;                   // deconstruyo el objeto myBody y tomo el id
    //myBody = { params: { id: `${_id}` } };  // armo el objeto para el parametro body de axios ("params" lo toma en el query).
    myBody = { data: { _id: `${_id}` } };  // armo el objeto para el parametro body de axios ("data" lo toma en el body).
    console.log(`crearGatitoPorBody (body Destructurado_&_Restructurado)-> ${myBody}`,myBody);

    const headers = {
        "Content-Type": "application/json",
        "data": { "_id": `${_id}` },
        "timeout": 10000 
    };
    
    let contenido;
    try {
        //contenido = await axios.get(url ,myBody , { timeout: 10000 });
        //contenido = await axios.get(url ,myBody );
        contenido = await axios.get(url ,headers);   
    } catch (error) {
        console.log('verGatitoPorBody -> Error al recuperar los datos.',error); 
    };
    
    (consologuearValorRetornado && contenido) 
        ? console.log(`${metodoHandler} -> (contenido): `, contenido)
        : null;

    responder(contenido);
    return;
};



// Metodos POST (Crear Gatito)
// ---------------------------

/** 
 * Crear un gatito (por params)
 * /api/cats/crear 
*/
const crearGatitoPorParams = async ( valores, srvUri=mySrvUri, responder ) => {   
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'crearGatitoPorParams';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    //let url = `${srvUri}/api/cats/crear/${nombreGatito}`;
    //await axios.post(url ,body ,{ timeout: 10000 } )
    
    let contenido;
    let url;
    const { name } = JSON.parse(decodeURIComponent(valores));    
    const nombreGatito = name;
    
    if ( name ) {
        url = `${srvUri}/api/cats/crear/${nombreGatito}`;
        (consologuearProceso) ? console.log(`${metodoHandler}, (url)-> ${url}`) : null;  
    } else {
        (consologuearProceso) ? console.log(`{ msg: "${metodoHandler}, El nombre es obligatorio en el parametro lista de valores"}`) : null;
        contenido = `{"msg": "El nombre es obligatorio en el parametro lista de valores"}`;
        responder(contenido);
        return;    
    };

    let body = { name: nombreGatito };

    try {
        (consologuearProceso) ? console.log(`${metodoHandler}, Consultando por  axios.post a la ruta: ${url}`) : null;
        //contenido = await axios.get(encodeURI(url) , { timeout: 10000 });
        contenido = await axios.post(url ,body ,{ timeout: 10000 } );    
    } catch (error) { 
        (consologuearErrorAxios) ? console.log(`${metodoHandler}, -> Error, Axios no pudo crear los datos en la ruta ${url}`,error) : null; 
        (!contenido)
            ? contenido = {msg: `Axios no pudo crear los datos en la ruta: ${url}`}
            : null;
    };

    (consologuearValorRetornado && contenido) 
        ? console.log(`${metodoHandler}, -> (contenido): `, contenido)
        : null;

    responder(contenido);
    return;
};


/** 
 * Crear un gatito (por query) 
 * /api/cats/crear
 */
const crearGatitoPorQry = async ( valores, srvUri=mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'crearGatitoPorQry';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    // url = `${srvUri}/api/cats/crear?id=${nombreGatito}`;
    // axios.post(url ,body ,{ timeout: 10000 } )

    let contenido;
    let url;
    const { name } = JSON.parse(decodeURIComponent(valores));    
    const nombreGatito = name;
    
    if ( name ) {
        url = `${srvUri}/api/cats/crear?id=${nombreGatito}`;
        (consologuearProceso) ? console.log(`${metodoHandler}, (url)-> ${url}`) : null;  
    } else {
        (consologuearProceso) ? console.log(`{ msg: "${metodoHandler}, El nombre es obligatorio en el parametro lista de valores"}`) : null;
        contenido = `{"msg": "El nombre es obligatorio en el parametro lista de valores"}`;
        responder(contenido);
        return;    
    };

    let body = { name: nombreGatito };

    try {
        (consologuearProceso) ? console.log(`${metodoHandler}, Consultando por  axios.post a la ruta: ${url}`) : null;
        //contenido = await axios.get(encodeURI(url) , { timeout: 10000 });
        contenido = await axios.post(url ,body ,{ timeout: 10000 } );    
    } catch (error) { 
        (consologuearErrorAxios) ? console.log(`${metodoHandler}, -> Error, Axios no pudo crear los datos en la ruta ${url}`,error) : null; 
        (!contenido)
            ? contenido = {msg: `Axios no pudo crear los datos en la ruta: ${url}`}
            : null;
    };

    (consologuearValorRetornado && contenido) 
        ? console.log(`${metodoHandler}, -> (contenido): `, contenido)
        : null;

    responder(contenido);
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
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'crearGatitoPorBody';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    let url = `${srvUri}/api/cats/crear`;
    (consologuearProceso) ? console.log(`${metodoHandler} (url)-> ${url}`) : null;
    
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

    (consologuearValorRetornado && contenido) 
        ? console.log(`${metodoHandler} -> (contenido.data): `, contenido.data)
        : null;

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
const editarGatitoPorParams = async ( valores, srvUri=mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'editarGatitoPorParams';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    // url = `${srvUri}/api/cats/editar/${_id}/${name}`;

    let contenido;
    let url;
    const { _id } = JSON.parse(decodeURIComponent(valores));
    const { name } = JSON.parse(decodeURIComponent(valores));
    const idGatito = _id;
    
    if ( _id && name) {
        url = `${srvUri}/api/cats/editar/${_id}/${name}`;
        (consologuearProceso) ? console.log(`${metodoHandler}, (url)-> ${url}`) : null;  
    } else {
        (consologuearProceso) ? console.log(`{ msg: "${metodoHandler}, El id y el nombre son obligatorios en el parametro lista de valores"}`) : null;
        contenido = `{"msg": "El id y el nombre son obligatorios en el parametro lista de valores"}`;
        responder(contenido);
        return;    
    };

    myBody = {  _id: _id,
                name: name
            }; 
    try {
        (consologuearProceso) ? console.log(`${metodoHandler}, Consultando por axios.put a la ruta: ${url}`) : null;
        contenido = await axios.put(url, myBody, { timeout: 10000 });    
    } catch (error) { 
        (consologuearErrorAxios) ? console.log(`${metodoHandler}, -> Error, Axios no pudo modificar los datos en la ruta ${url}`,error) : null; 
        (!contenido)
            ? contenido = {msg: `Axios no pudo modificar los datos en la ruta: ${url}`}
            : null;
    };

    (consologuearValorRetornado && contenido) 
        ? console.log(`${metodoHandler}, -> (contenido): `, contenido)
        : null;

    responder(contenido);
    return;
};


/** 
 * Editar un gatito (por query) 
 * /api/editar
 */
const editarGatitoPorQry = async ( valores, srvUri=mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'editarGatitoPorQry';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    // url = `${srvUri}/api/cats/editar?id=${_id}&name=${name}`;

    let contenido;
    let url;
    const { _id } = JSON.parse(decodeURIComponent(valores));
    const { name } = JSON.parse(decodeURIComponent(valores));
    const idGatito = _id;
    
    if ( _id && name) {
        url = `${srvUri}/api/cats/editar?id=${_id}&name=${name}`;
        (consologuearProceso) ? console.log(`${metodoHandler}, (url)-> ${url}`) : null;  
    } else {
        (consologuearProceso) ? console.log(`{ msg: "${metodoHandler}, El id y el nombre son obligatorios en el parametro lista de valores"}`) : null;
        contenido = `{"msg": "El id y el nombre son obligatorios en el parametro lista de valores"}`;
        responder(contenido);
        return;    
    };

    myBody = {  _id: _id,
                name: name
            }; 
    try {
        (consologuearProceso) ? console.log(`${metodoHandler}, Consultando por axios.put a la ruta: ${url}`) : null;
        contenido = await axios.put(url, myBody, { timeout: 10000 });    
    } catch (error) { 
        (consologuearErrorAxios) ? console.log(`${metodoHandler}, -> Error, Axios no pudo modificar los datos en la ruta ${url}`,error) : null; 
        (!contenido)
            ? contenido = {msg: `Axios no pudo modificar los datos en la ruta: ${url}`}
            : null;
    };

    (consologuearValorRetornado && contenido) 
        ? console.log(`${metodoHandler}, -> (contenido): `, contenido)
        : null;

    responder(contenido);
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
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'editarGatitoPorBody';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    let url = `${srvUri}/api/cats/editar`;
    (consologuearProceso) ? console.log(`${metodoHandler} (url)-> ${url}`) : null;
    
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
    try {
        (consologuearProceso) ? console.log(`${metodoHandler}, Consultando por axios.put a la ruta: ${url}`) : null;
        contenido = await axios.put(url, myBody, { timeout: 10000 });    
    } catch (error) { 
        (consologuearErrorAxios) ? console.log(`${metodoHandler}, -> Error, Axios no pudo modificar los datos en la ruta ${url}`,error) : null; 
        (!contenido)
            ? contenido = {msg: `Axios no pudo modificar los datos en la ruta: ${url}`}
            : null;
    };

    (consologuearValorRetornado && contenido) 
        ? console.log(`${metodoHandler} -> (contenido.data): `, contenido.data)
        : null;

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
const eliminarGatitoPorParams = async ( valores, srvUri=mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'eliminarGatitoPorParams';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    // url = `${srvUri}/api/cats/eliminar/${idGatito}`;
    // axios.delete(url, { timeout: 10000 })

    let contenido;
    let url;
    const {_id} = JSON.parse(decodeURIComponent(valores));    
    const idGatito = _id;
    
    if ( _id ) {
        url = `${srvUri}/api/cats/eliminar/${idGatito}`;
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


/** 
 * Eliminar un gatito (por query) 
 * /api/eliminar
 */
const eliminarGatitoPorQry = async ( valores, srvUri=mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'eliminarGatitoPorQry';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    // url = `${srvUri}/api/cats/eliminar?id=${idGatito}`;
    // axios.delete(url, { timeout: 10000 })

    let contenido;
    let url;
    const {_id} = JSON.parse(decodeURIComponent(valores));    
    const idGatito = _id;
    
    if ( _id ) {
        url = `${srvUri}/api/cats/eliminar?id=${idGatito}`;
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


/** 
 * Eliminar un gatito (por body) 
 * /api/eliminar
 * Body ejemplo:
 *  {
 *      "_id": "6258d21ba60416c73341165e"
 *  }
 */
const eliminarGatitoPorBody = async ( body, srvUri=mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'eliminarGatitoPorBody';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;
    
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    let url = `${srvUri}/api/cats/eliminar/`;
    (consologuearProceso) ? console.log(`${metodoHandler} (url)-> ${url}`) : null;

    let myBody; 
    myBody = decodeURIComponent(body);      // Reemplazo caracteres %x de la url por caracteres equivalentes
    myBody = JSON.parse(myBody);            // parseo el string como objeto Json
    (consologuearProceso) ? console.log(`${metodoHandler} (body)-> ${myBody}`) : null;
    (consologuearProceso) ? console.log(`${metodoHandler} (body-Objeto): `, myBody) : null;
    /*     
    const {_id} = myBody;                   // Destructuro el id
    myBody = { _id: `"${_id}"` };           // Construyo el parametro del body
     */
    const {_id} = myBody;                   // Destructuro el id
    myBody = {data:{ _id: `${_id}` }};           // Construyo el parametro del body
    (consologuearProceso) ? console.log(`${metodoHandler} (body-Objeto final):`, myBody) : null; 

    let contenido;
    try {
        //contenido = await axios.delete(url, myBody, { timeout: 10000 });
        contenido = await axios.delete(url, myBody);    
    } catch (error) {
        (consologuearErrorAxios) ? console.log(`${metodoHandler}, -> Error, Axios no pudo eliminar los datos en la ruta ${url}`,error) : null; 
        (!contenido)
            ? contenido = {msg: "Axios, error al eliminar un registro de la coleccion"}
            : null  
    };

    (consologuearValorRetornado && contenido) 
        ? console.log(`${metodoHandler} -> (contenido): `, contenido)
        : null;
    
    responder(contenido);
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


