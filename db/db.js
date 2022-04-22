// Importo dependencias
const mongoose = require('mongoose');
require('dotenv').config();                     //require('dotenv').config({ path: 'variables.env' });

const entorno = require('../appSrvEntorno');
const {fnMiServidor}= entorno
const { srvDbConection } = fnMiServidor()

/* 
// Consologeo el valor de DotEnv para la cadena de conexion
console.log(`db.js => dotenv, DB_MONGO => ${process.env.DB_MONGO}`); 
*/

// Obtengo la cadena de conexion a la DB
//console.log({DbConeccion: process.env.DB_MONGO});
const myConection= (process.env.DB_MONGO) 
    ? process.env.DB_MONGO
    : srvDbConection;

// funcion para conectar la DB    
const conectarDB = async () => {
    try {
        //await mongoose.connect(process.env.DB_MONGO, {
        await mongoose.connect(myConection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false
        });
        console.log('DB Conectada');
    } catch (error) {
        console.log('hubo un error al conectar la DB')
        //console.log(error);   //No recomendado, ensusia la consola
        process.exit(1); // Detener la app
    }
}

// Exporto la funcion para conectar la DB 
module.exports = {conectarDB};

