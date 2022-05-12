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
                  h2 {color:lawngreen;}
                  
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
                      <title>Apis-Informacion</title>
                      ${estilos}
                     </head>
                     <body  class="fondo">
                      <h1>
                        Apis - Informacion
                      </h1>
                      <h2>
                        informacion para el uso de las api disponibles
                      </h2>
                      <p><b>Descripcion general:</b>${b} Documentacion para uso de las api.</p>
                      ${saltoLinea} 
                      <h3>
                        Gatitos:
                      </h3>
                      <p><b>${tab}Proposito general:</b>${b} CRUD de nombres de gatitos.</p>
                      <ul>
                        <li>
                            <p><b>Documentacion de las Api de gatitos </b></p>
                            <p>${tab}Uri:${b}<i>"http://localhost:${srvPuerto}/api/cats" <i>${b}
                                <a href="http://localhost:${srvPuerto}/api/cats" target="_blank">Ver</a></p>
                        </li>
                      </ul> 

                      ${saltoLinea}
                      <h3>
                        Usuarios:
                      </h3>
                      <p><b>${tab}Proposito general:</b>${b} CRUD de usuarios.</p>
                      <ul>
                        <li>
                            <p><b>Documentacion de las Api de usuarios  </b></p>
                            <p>${tab}Uri:${b}<i>"http://localhost:${srvPuerto}/api/usuarios" </i>${b}
                                <a href="http://localhost:${srvPuerto}/api/usuarios" target="_blank">Ver</a></p>
                        </li>
                      </ul> 
                      ${saltoLinea}
                      
                      <h3>
                        Simulador de Inversion en Bitcoin (BTC):
                      </h3>
                      <p><b>${tab}Proposito general:</b>${b} CRUD del modelo de datos, y consultas por Axios.</p>
                      <ul>
                        <li>
                            <p><b>Documentacion de las Api del Simulador de inversion en BTC  </b></p>
                            <p>${tab}Uri:${b}<i>"http://localhost:${srvPuerto}/api/simInvBtc" </i>${b}
                                <a href="http://localhost:${srvPuerto}/api/simInvBtc" target="_blank">Ver</a></p>
                        </li>
                      </ul> 
                      ${saltoLinea}

                      <h3>
                        Consultas a api externas (axios):
                      </h3>
                      <p><b>${tab}Proposito general:</b>${b} Consultar apis externas y devolver valores especificos.</p>
                      <ul>
                        <li>
                            <p><b>Documentacion de las Api de consultas a apis externas  </b></p>
                            <p>${tab}Uri:${b}<i>"http://localhost:${srvPuerto}/api/externas" </i>${b}
                                <a href="http://localhost:${srvPuerto}/api/externas" target="_blank">Ver</a></p>
                        </li>
                      </ul> 
                      
                      ${saltoLinea}
                      <h3>
                        Loguin Inicio y cierre de sesion:
                      </h3>
                      <p><b>${tab}Proposito general:</b>${b} Prueba de inicio y cierre de sesion.</p>
                      <ul>
                        <li>
                            <p><b>Documentacion de las Api de las pruebas de inicio y cierre de sesion  </b></p>
                            <p>${tab}Uri:${b}<i>"http://localhost:${srvPuerto}/api/loguin" </i>${b}
                                <a href="http://localhost:${srvPuerto}/api/loguin" target="_blank">Ver</a></p>
                        </li>
                      </ul> 

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