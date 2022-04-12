// Importo dependencias
require('dotenv').config();         //require('dotenv').config({ path: 'variables.env' });
const aplicacion = require('./app');
/* 
// Consologeo el valor de DotEnv para la cadena de conexion ala Db
console.log(`appSrvEntorno.js => dotenv, DB_MONGO => ${process.env.DB_MONGO}`); 
*/

// Establezco string de conexion a la DB
const myConection= (process.env.DB_MONGO) 
    ? process.env.DB_MONGO
    : 'mongodb+srv://<Usuario>:<Password>@cluster0.7g1lp.mongodb.net/test';

// Establezco el Puerto
const cAppPuerto = (process.env.PORT)
    ? process.env.PORT
    :'4000';

// Establezco el Nombre del Servidor
//const aplicacion = require('./app');
const {name} = aplicacion
const cAppName =  (name)
    ?`${name}`
    :'Desconocido';  // app.name.toLocaleUpperCase();


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

