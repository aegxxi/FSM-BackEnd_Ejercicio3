//Funciones auxiliares
//--------------------
const app = require('../app');
const entorno = require('../appSrvEntorno');

//const [name, port, Port, PORT] = app
//console.log(`name: ${app.name},puerto: ${app.puerto}, Port:${app.Port}, PORT:${app.PORT}`)

const { fnMiServidor } = entorno
const { srvPuerto, srvNombre } = fnMiServidor()

const { version } = require("process");

const myhandler = {
    
    // Obtengo la version de Express.js
    //  uso el archivo package.json para obtener la versión Express.
    obtenerExpressVersion : () => {
        const fs = require('fs');
        const package = fs.readFileSync('package.json');
        const packageParse = JSON.parse(package);
        const expressVersion = `v${packageParse.dependencies.express.slice(1)}`;
        const info =`${expressVersion}`;  
        return(info);
    },


    // Obtengo la version de Mongoose
    //  uso el archivo package.json para obtener la versión Mongoose.
    obtenerMongooseVersion : () => {
      //const db = require('../db/db');
      const fs = require('fs');
      const package = fs.readFileSync('package.json');
      const packageParse = JSON.parse(package);
      //const mongooseVersion = `v${packageParse.dependencies.mongoose.slice(1)}`;
      const mongooseVersion = `v${packageParse.dependencies.mongoose.slice(1)}`;
      const info =`${mongooseVersion}`;  
      return(info);
  },


    // Obtengo la version de Node.js
    obtenerNodeVersion : () => {
      return(version);
    },

    
      // Obtengo el nombre del servidor
      obtenerAppNombre : () => {
        const nombreServidor = (srvNombre) ? srvNombre : 'Nombre';  //`????` //app.name
        return(nombreServidor);
      },

      
      // Obtengo el puerto 
      obtenerAppPuerto : () => {
        //const addr = app.port; //server.address()
        const puerto = srvPuerto;  //`????`  //app.get('port') //`${addr.port}`
        return(puerto);
      },


  // Obtener la fecha y hora de arranque
  obtenerMomentoDeArranque : () => {
    const momento = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
    return(`${momento}`);  
  },
  

  //Obtengo las direcciones de IP V4
  obtenerIpLocal : () =>{
    const os = require('os');
    const ifaces = os.networkInterfaces();
    let resultado =  "| "
    
    for ( dev in ifaces) {
      let alias = 0;
  
      ifaces[dev].forEach(function(details){
        if (details.family == 'IPv4') {
          resultado = resultado.concat( dev + ': ' + (alias ?' :'+alias:' '),details.address  + '  | ' );
          //console.log( dev+(alias?':'+alias:''),details.address );
          ++alias;
        }
      });
    }
    return(resultado);
  }

}

module.exports = myhandler;

