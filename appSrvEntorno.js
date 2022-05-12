// Importo dependencias
require('dotenv').config();         //require('dotenv').config({ path: 'variables.env' });
//const aplicacion = require('./app');
/* 
// Consologeo el valor de DotEnv para la cadena de conexion ala Db
console.log(`appSrvEntorno.js => dotenv, DB_MONGO => ${process.env.DB_MONGO}`); 
*/

// Establezco string de conexion a la DB
// Fuerzo la cadena de conexion si dotenv no funciona
const myConection= (process.env.DB_MONGO) 
    ? process.env.DB_MONGO
    : 'mongodb+srv://<Usuario>:<Password>@cluster0.7g1lp.mongodb.net/test'; // Reemplazar <Usuario>, <Password> por los valores que correspondan.
    

// Establezco el Puerto
const cAppPuerto = (process.env.PORT)
    ? process.env.PORT
    :'4001';

// Establezco el Nombre del Servidor
//const aplicacion = require('./app');
//const {name} = aplicacion                 // No pude obtener el nombre del servidor.
const name = 'App.js'                       // Lo declaro a mano hasta tener tiempo de investigar.
const cAppName =  (name)
    ?`${name}`
    :'Desconocido';                         // app.name.toLocaleUpperCase(); Prueba fallida, para revisar luego


// Creo el objeto con los datos de funcionamiento del servidor    
const miServidor = {
    srvPuerto: cAppPuerto,
    srvNombre: cAppName,
    srvDbConection: myConection
};

// La funcion retorna el objeto con los datos de funcionamiento del servidor
function fnMiServidor(){
    return(miServidor);
};



// Retorno String con el nombre del servidor 
function fnAppObtenerNombre() {
    const resultado = `${cAppName}`;
    return(resultado);
  };

  
// Retorno String con el puerto del servidor
function fnAppObtenerPuerto() {
    const resultado = `${cAppPuerto}`;
    return(resultado);
  };


// Retorno String con la cadena de conexion a la DB
function fnAppObtenerDbConexion() {
    const resultado = `${myConection}`;
    return(resultado);
  };


// Exporto las funciones
module.exports = {
                    fnMiServidor,
                    fnAppObtenerNombre,
                    fnAppObtenerPuerto
                };

