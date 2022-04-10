const mongoose = require('mongoose');
//require('dotenv').config({ path: 'variables.env' });
require('dotenv').config();

const entorno = require('../appSrvEntorno');
const {fnMiServidor}= entorno
const { srvDbConection } = fnMiServidor()

console.log(`db.js => dotenv, DB_MONGO => ${process.env.DB_MONGO}`);

const myConection= (process.env.DB_MONGO) 
    ? process.env.DB_MONGO
    : srvDbConection;

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
        console.log(error);
        process.exit(1); // Detener la app
    }
}

module.exports = {conectarDB};

