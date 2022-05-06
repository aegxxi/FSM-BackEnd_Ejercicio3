const axios = require('axios');
const entorno = require('../appSrvEntorno');
//const qs = require('qs');

const {fnMiServidor}= entorno;
let {srvPuerto} = fnMiServidor();
const mySrvUri = `http://localhost:${srvPuerto}`;

// Defino que envio a la consola (Global)
let consologuearProcesos = true;
let consologuearErrores = false;
let consologuearErroresAxios = false;
let consologuearValoresRetornados = true;
// (Local), en cada controlador se puede usar el valor global, o definir el valor 
    // const consologuearProceso = consologuearProcesos;                    //Valores (true, false) PorDefecto = consologuearProcesos
    // const consologuearError = consologuearErrores;                       //Valores (true, false) PorDefecto = consologuearErrores
    // const consologuearErrorAxios = consologuearErroresAxios;             //Valores (true, false) PorDefecto = consologuearErroresAxios 
    // const consologuearValorRetornado = consologuearValoresRetornados;    //Valores (true, false) PorDefecto = consologuearValoresRetornados




/** 
 * Funcion: ingresarSession
 * Establecer la sesion de usuario:
 * /api/loguin
 */
 const ingresarSession = async ( listaValores, srvUri = mySrvUri, responder ) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
    const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
    const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
    // Defino y consologueo el controlador en uso
    const metodoHandler= 'ingresarSession';
    (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;
    
    // Defino la URI del Servidor 
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    // Defino la ruta de la api
    let url = `${srvUri}/api/loguin/ingresar`;
    (consologuearProceso) ? console.log(`${metodoHandler} (url)-> ${url}`) : null;

    // Transformo el objeto recibido en el parametro listaValores
    let mylistaValores;  // Defino la variable que contendra el objeto recibido en el parametro listaValores
    mylistaValores = decodeURIComponent(listaValores);      // Reemplazo caracteres %x de la url por caracteres equivalentes
    mylistaValores = JSON.parse(mylistaValores);            // Parseo el string como objeto Json
    (consologuearProceso) ? console.log(`${metodoHandler} (listaValores)-> ${mylistaValores}`) : null;
    (consologuearProceso) ? console.log(`${metodoHandler} (listaValores-Objeto): `, mylistaValores) : null;

    //Desestructuro el objeto mylistaValores
    const {email, password} = mylistaValores;
    const myEmail = email;
    (consologuearProceso) ? console.log(`${metodoHandler} (myEmail): `, myEmail) : null;
    const myPassword = password;
    (consologuearProceso) ? console.log(`${metodoHandler} (myPassword): `, myPassword) : null;

    // reconstruyo el objeto myBody
    myBody = {  
                email: myEmail || 'email@vacio.com',
                password: myPassword || 'ContraseñaVacia'
            }; 
    
    //----
    //responder(myBody);
    //return;
    //----

    // Llamada a Axios para ejecutar la accion de Inicio de Sesion.
    let contenido;  // Defino la variable que contentra el resultado de la llamada a Axios
    contenido = await axios.post(url, myBody, { timeout: 1000000 }).catch( (error) => {
        if (error.response && consologuearErrorAxios) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = `${metodoHandler} -> Error al obtener la ruta`;
        throw error;
    });

    

    (consologuearValorRetornado) ?console.log( `${metodoHandler} Valor devuelto: `,contenido.data ) : null;
    responder(contenido.data);
    return;
};


/** 
 * Cerrar Session 
 * /api/loguin
 */
 const salirSession = async ( srvUri=mySrvUri, responder ) => {
     // Defino que envio a la consola (Local)
     const consologuearProceso = consologuearProcesos;                   //Valores (true, false) PorDefecto = consologuearProcesos 
     const consologuearError = consologuearErrores;                      //Valores (true, false) PorDefecto = consologuearErrores
     const consologuearErrorAxios = consologuearErroresAxios;            //Valores (true, false) PorDefecto = consologuearErroresAxios 
     const consologuearValorRetornado = consologuearValoresRetornados;   //Valores (true, false) PorDefecto = consologuearValoresRetornados
     // Defino y consologueo el controlador en uso
     const metodoHandler= 'salirSession';
     (consologuearProceso) ? console.log(`* metodoHandler: ${metodoHandler}...`) : null;   
    
    // Defino la URI del Servidor 
    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    // Defino la ruta de la api
    let url = `${srvUri}/api/loguin/salir`;

    let contenido;
    contenido = await axios.delete(url, { timeout: 10000 }).catch( (error) => {
        if (error.response && consologuearErrores) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        };
        error.origin = `${metodoHandler} -> Error al obtener la ruta`;
        throw error;
    });

    (consologuearValorRetornado) ?console.log( `${metodoHandler} Valor devuelto: `,contenido.data ) : null;
    responder(contenido.data);
    return;
}

module.exports = 
                {
                    ingresarSession,
                    salirSession
                }