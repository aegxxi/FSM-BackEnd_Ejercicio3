const myhandler = require('../handlers/handler');
const entorno = require('../appSrvEntorno');

const { fnMiServidor } =entorno
const { srvPuerto, srvNombre } = fnMiServidor()

const saltoLinea =  '<Br/>';  //'\n' en Java, <Br/> en Html
const b = '&nbsp';              //Espacio en blanco
const tab = `${b}${b}${b}`;     //Tabulacion de tres espacios
const dA = '&#174;'             // Derechos de Autor

const estilos=`<style>
                  h1 {
                        color:aquamarine;
                        text-shadow: 1px 2px;
                    }

                  h2 {
                        color:lawngreen;
                        font-size:large;
                    }
                    
                  h3 {
                      color:lawngreen;
                      font-size:large;
                    }
                
                  h4 {
                      color:lawngreen;
                      font-size:large;
                    }

                  p {
                      color:aquamarine;
                      font-size:large;
                    }

                  a {color:aliceblue}
                  summary {color:aliceblue}
                  article {color:aliceblue}
                  
                  .interlineado { line-height: 150%;}

                  .fondo {
                    color:aquamarine;
                    background-color: black;
                    margin: 2rem;
                  }

                  .textoComentario{
                    color:aliceblue
                  }

                  .destacar1{
                    color:brown;
                    font-size:large;
                  }

                  .destacar2{
                    color:blueviolet;
                    font-size:large;
                  }

                  .codigo {
                    border-image: initial;
                    border: 1px solid blue;
                    color:white;
                    background-color: darkslategray;
                    margin-right: 64rem;
                    margin-left: 1rem;
                    line-height: 200%;
                    font-size:large;
                  }

                  .firma {
                    color:aquamarine;
                    height: 64rem;
                    text-align: right;
                    margin-right: 32rem;
                    }
                </style>
                `
                ;


function Info() {
  
  const contenido = `<head>
                      <title>Apis Externas-Informacion</title>
                      ${estilos}
                     </head>
                     <body  class="fondo">
                      <h1>
                        Consultas a Apis Externas (Axios) - Informacion
                      </h1>
                      <h2>
                        informacion para el uso de las api externas disponibles
                      </h2>
                      <p><b>Descripcion general:</b>${b} Documentacion para uso de las api externas.</p>
                      ${saltoLinea} 
                      <h3>
                        Apis externas:
                      </h3>
                      <p><b>${tab}Proposito general:</b>${b} consulta de informacion a apis externas.</p>
                      
                      ${saltoLinea}
                      
                      <h4>
                        Cotizacion del dolar hoy:
                      </h4>
                      <p><b>${tab}Proposito general:</b>${b} Obtener las cotizaciones del Dolar y el Euro hoy en Argentina.</p>
                      <ul>
                        <li>
                            <p><b>Fuente Url de las Api DolarHoy  </b></p>
                            <p>${tab}Uri:${b}<i>"https://api.bluelytics.com.ar/v2/latest" </i>${b}
                                <a href="https://api.bluelytics.com.ar/v2/latest" target="_blank">Ver</a></p>
                        </li>
                        <li>
                            <p><b>Consulta por valores del Dolar Oficial </b></p>
                            <p>${tab}Uri:${b}<i>""http://localhost:${srvPuerto}/api/externas/resultado/DOLAR_OFICIAL_HOY" </i>${b}
                                <a href="http://localhost:${srvPuerto}/api/externas/resultado/DOLAR_OFICIAL_HOY" target="_blank">Consultar</a></p>
                        </li>
                        <li>
                            <p><b>Consulta por valores del Dolar Blue </b></p>
                            <p>${tab}Uri:${b}<i>""http://localhost:${srvPuerto}/api/externas/resultado/DOLAR_BLUE_HOY" </i>${b}
                                <a href="http://localhost:${srvPuerto}/api/externas/resultado/DOLAR_BLUE_HOY" target="_blank">Consultar</a></p>
                        </li>
                        <li>
                            <p><b>Consulta por valores del Euro </b></p>
                            <p>${tab}Uri:${b}<i>""http://localhost:${srvPuerto}/api/externas/resultado/EURO_HOY" </i>${b}
                                <a href="http://localhost:${srvPuerto}/api/externas/resultado/EURO_HOY" target="_blank">Consultar</a></p>
                        </li>
                      </ul> 
                      <h4>
                        Cotizacion de las pricipales Criptomonedas hoy:
                      </h4>
                      <p><b>${tab}Proposito general:</b>${b} Obtener las cotizaciones de las principales Criptomonedas hoy.</p>
                      <ul>
                        <li>
                            <p><b>Ejemplo Url de las Api CriptosHoy  </b></p>
                            <p>${tab}Uri:${b}<i>"https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD" </i>${b}
                                <a href="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD " target="_blank">Ver</a></p>
                        </li>
                      </ul> 
                      ${saltoLinea}
                      ${saltoLinea}
                      ${saltoLinea} 
                      <p class="firma">
                      ${dA}Ejercicio realizado por: <b>Andres Eduardo Garcia </b>
                      </p>
                    </body>

                    `
                    ;
    return(contenido);
};


module.exports = {
                    Info
                };                    