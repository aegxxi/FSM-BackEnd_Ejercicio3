const axios = require('axios');
const entorno = require('../appSrvEntorno');
//const qs = require('qs');

const {fnMiServidor}= entorno;
let {srvPuerto} = fnMiServidor();
const mySrvUri = `http://localhost:${srvPuerto}`;

const consologuearErroresAxios = true;
const consologuearValoresRetornados = false;
const consologuearProcesos = true;


/** 
 * dolarHoy,
 * euroHoy,
 * criptoHoy,
 * criptoListaMonedas
 * */

/** 
 * Funcion: consultaBlueLytics
 * Obtener los valores del Dolar y el Euro desde la api:
 * https://api.bluelytics.com.ar/v2/latest
 */
 const consultaBlueLytics = async (srvUri = mySrvUri) => {
    
    const consologuearValorRetornado = consologuearValoresRetornados;
    const consologuearErrorAxios = consologuearErroresAxios;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    let url = `https://api.bluelytics.com.ar/v2/latest`;

    let contenido;

    try {
        contenido = await axios.get(url, { timeout: 10000 } );    
    } catch (error) {
        (consologuearErrorAxios) ? console.log('consultaBlueLytics -> Error al recuperar los datos.',error) : null; 
        (!contenido)
            ? contenido = {msg: "Axios no pudo recuperar los datos"}
            : null
    };
    
    (consologuearValorRetornado) 
        ? console.log('consultaBlueLytics -> (contenido): ', contenido.data) 
        : null;

    return (contenido.data);
}


/** 
 * Funcion: consultaCryptocompareMonedas
 * Obtener los valores del Dolar y el Euro desde la api:
 * https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD
 */
 const consultaCryptocompareMonedas = async (srvUri = mySrvUri, cantidad = 100) => {
    
    const consologuearValorRetornado = consologuearValoresRetornados;
    const consologuearErrorAxios = consologuearErroresAxios;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    let url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=${cantidad}&tsym=USD`;

    let contenido;

    try {
        //contenido = await axios.get(url ,myBody , { timeout: 10000 } );
        contenido = await axios.get(url, { timeout: 10000 } );    
    } catch (error) {
        (consologuearErrorAxios) ? console.log('consultaCryptocompareMonedas -> Error al recuperar los datos.',error) : null; 
        (!contenido)
            ? contenido = {msg: "Axios no pudo recuperar los datos"}
            : null
    };
    
    /** 
     * key = contenido.data.Data.CoinInfo.Id 
     * Token = contenido.data.Data.CoinInfo.Name
     * Nombre = contenido.data.Data.CoinInfo.FullName 
     * */

    (consologuearValorRetornado) 
        ? console.log('consultaCryptocompareMonedas -> (contenido): ', contenido.data) 
        : null;
    //responder(contenido.data);
    //return(contenido.data);
    return (contenido.data);
}


/** 
 * Funcion: consultaCryptocompareCotizacion
 * Obtener los valores del Dolar y el Euro desde la api:
 * https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD
 */
 const consultaCryptocompareCotizacion = async (srvUri = mySrvUri, criptomoneda = "BTC", moneda = "USD") => {

    const consologuearValorRetornado = consologuearValoresRetornados;
    const consologuearErrorAxios = consologuearErroresAxios;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    let contenido;

    try {
        //contenido = await axios.get(url ,myBody , { timeout: 10000 } );
        contenido = await axios.get(url, { timeout: 10000 } );    
    } catch (error) {
        (consologuearErrorAxios) ? console.log('consultaCryptocompareCotizacion -> Error al recuperar los datos.',error) : null; 
        (!contenido)
            ? contenido = {msg: "Axios no pudo recuperar los datos"}
            : null
    };
    
    /** 
     * key = contenido.data.Data.CoinInfo.Id 
     * Token = contenido.data.Data.CoinInfo.Name
     * Nombre = contenido.data.Data.CoinInfo.FullName 
     * */

    (consologuearValorRetornado) 
        ? console.log('consultaCryptocompareCotizacion -> (contenido): ', contenido.data.DISPLAY) 
        : null;    
    
    //responder(contenido.data);
    //return(contenido.data);
    return (contenido.data.DISPLAY);
}



//------------------------------------------------------------
// Inicio - Funciones llamadas por funcion controladora:
//          "extResultado" en el modulo "externasControler.js"
//------------------------------------------------------------

/** 
 * Obtener el valor del dolar Oficial
 * api/externas
 * Dependencias (Funciones): consultaBlueLytics
 */
 const dolarOficialHoy = async (srvUri = mySrvUri, responder ) => {

    const consologuearValorRetornado = consologuearValoresRetornados;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    const contenido = await consultaBlueLytics();
    
    (consologuearValorRetornado) 
        ? console.log('dolarOficialHoy -> (contenido): ', contenido) 
        : null;

    responder(contenido);

    return;
}

/** 
 * Obtener el valor del dolar Blue
 * api/externas
 * Dependencias (Funciones): consultaBlueLytics
 */
 const dolarBlueHoy = async (srvUri = mySrvUri, responder ) => {

    const consologuearValorRetornado = consologuearValoresRetornados;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    const contenido = await consultaBlueLytics();

    (consologuearValorRetornado) 
        ? console.log('dolarBluelHoy -> (contenido): ', contenido) 
        : null;

    responder(contenido);
    //return(contenido.data);
    return;
}

/** 
 * Obtener el valor del Euro Oficial y Blue
 * api/externas
 * Dependencias (Funciones): consultaBlueLytics
 */
 const euroHoy = async (srvUri = mySrvUri, responder ) => {

    const consologuearValorRetornado = consologuearValoresRetornados;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;

    const contenido = await consultaBlueLytics();
    
    (consologuearValorRetornado) 
        ? console.log('euroHoy -> (contenido): ', contenido) 
        : null;   

    responder(contenido);
    //return(contenido.data);
    return;
}

/** 
 * Obtener la lista de monedas de Cryptocompare
 * api/externas
 * Dependencias (Funciones): consultaCryptocompareMonedas
 */
 const criptoListaMonedas = async (srvUri = mySrvUri, responder ) => {

    const consologuearValorRetornado = consologuearValoresRetornados;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    const contenido = await consultaCryptocompareMonedas();

    (consologuearValorRetornado) 
        ? console.log('criptoListaMonedas -> (contenido): ', contenido) 
        : null; 

    responder(contenido);

    return;
}

/** 
 * Obtener la lista de monedas de Cryptocompare
 * api/externas
 * Dependencias (Funciones): consultaCryptocompareMonedas
 */
 const criptoHoy = async (listaValores, srvUri = mySrvUri, responder ) => {

    const consologuearValorRetornado = false //consologuearValoresRetornados;
    const consologuearProceso = consologuearProcesos;

    (srvUri) 
    ? (srvUri.length<9)
        ? srvUri=mySrvUri
        :  srvUri= srvUri
    : srvUri=mySrvUri
    ;
    
    let mylistaValores; 
    mylistaValores = decodeURIComponent(listaValores);                  // Reemplazo caracteres %x de la url por caracteres equivalentes
    mylistaValores = JSON.parse(mylistaValores);                        // parseo el string como objeto Json
    (consologuearProceso) ? console.log(`criptoHoy (listaValores)-> ${mylistaValores}`) : null;
    (consologuearProceso) ? console.log(`criptoHoy (listaValores-Objeto): `, mylistaValores) : null;

    const criptoToken = mylistaValores.token;
    (consologuearProceso) ? console.log(`criptoHoy (criptoToken): `, criptoToken) : null;
    
    const moneda = mylistaValores.moneda;
    (consologuearProceso) ? console.log(`criptoHoy (moneda): `, moneda) : null;

    const contenido = await consultaCryptocompareCotizacion('', criptoToken, moneda);
    //const contenido = await consultaCryptocompareCotizacion('');
    

    (consologuearValorRetornado) 
        ? console.log('criptoListaMonedas -> (contenido): ', contenido[criptoToken][moneda]) 
        : null; 

    responder(contenido[criptoToken][moneda]);
    //responder(contenido);
    return;
}

//------------------------------------------------------------
// Fin - Funciones llamadas por funcion controladora:
//          "extResultado" en el modulo "externasControler.js"
//------------------------------------------------------------



module.exports = 
                {
                    dolarOficialHoy,
                    dolarBlueHoy,
                    euroHoy,
                    criptoListaMonedas,
                    criptoHoy
                }



