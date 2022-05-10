const myhandler = require('../handlers/handler');
const entorno = require('../appSrvEntorno');

const { fnMiServidor } =entorno
const { srvPuerto, srvNombre } = fnMiServidor()

const saltoLinea =  '<Br/>';  //'\n' en Java, <Br/> en Html
const b = '&nbsp';              //Espacio en blanco
const tab = `${b}${b}${b}`;     //Tabulacion de tres espacios
const dA = '&#174;'             // Derechos de Autor

const estilos=`<style>
                  h1 {color:aquamarine;}
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

                  .crud{
                    font-size:large;
                    line-height: 200%;
                    margin-top: 32px;
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
                    border-radius: 30px;
                    box-shadow: 3px 3px #888888;
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


function simInvBtcInfo() {
  
  const contenido = `<head>
                      <title>ApiSimInvBtc-Informacion</title>
                      ${estilos}
                     </head>
                     <body  class="fondo">
                      <h1>
                        Api simInvBtc - Informacion
                      </h1>
                      
                      <h2>
                        Informacion para el uso de las api de SimInvBtc (Simulador de Inversion en BitCoin)
                      </h2>                      
                      <p><b>Proposito general:</b>${b} CRUD de simInvBtc.</p>  
                      ${saltoLinea}
                       <p>${tab}Probar las api del Crud de SimInvBtc (Simulador de inversion en Bitcoin) con axios${b}
                       <a href="http://localhost:${srvPuerto}/api/SimInvBtc/prueba" target="_blank">Probar</a>
                       </p> 
                       ${saltoLinea}
                      
                      <h3>
                        simInvBtc:
                      </h3>
                      <ul>
                        <li>
                            <p class='crud'><b>Ver todos los registros de la coleccion simInvBtc </b></p>
                            <p>${tab}Proposito: retornar todos los registros de simInvBtc.</p>
                            <p>${tab}Metodo: Get </p>
                            <p>${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/simInvBtc/ver " </i>${b}
                                <a href="http://localhost:${srvPuerto}/api/simInvBtc/ver" target="_blank">Ver</a></p>
                        </li>
                        <li>
                            <p class='crud'><b>Ver un registro de la coleccion simInvBtc </b></p>
                            <p>${tab}Proposito: retornar los datos de un registro de la coleccion simInvBtc por su Id.</p>
                            <p>${tab}<b>Metodo: Get (por params)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>"${b} http://localhost:${srvPuerto}/api/simInvBtc/ver/registro/<i class='destacar1'>[Id]</i> </i> ${b}" </i>${b}</p>                        
                            <p>${tab}<b>Metodo: Get (por qry)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>"${b} http://localhost:${srvPuerto}/api/simInvBtc/ver/registro<i class='destacar2'><b>?</b></i><i class='destacar1'>id=[IdSimInvBtc]</i> ${b}" </i>${b}</p>
                            <p>${tab}<b>Metodo: Get (por body)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>"${b} http://localhost:${srvPuerto}/api/simInvBtc/ver/registro ${b}" </i>${b}</p>
                            <div class='Codigo'>
                              <code>
                              ${tab}${tab}{${saltoLinea} 
                              ${tab}${tab}"_id":"simInvBtc_Id"${saltoLinea}
                              ${tab}${tab}}
                            </code>
                            </div>
                        </li>
                        <li>
                            <p class='crud'><b>Crear regitro en la coleccion simInvBtc </b></p>
                            <p>${tab}Proposito: Ingresar datos y crear un nuevo registro en la coleccion simInvBtc nuevo.</p>
                            <p>${tab}Metodo: Post (por body) </p>
                            <p>${tab}${tab}Uri:${b}<i>"${b} http://localhost:${srvPuerto}/api/simInvBtc/cargar ${b}" </i></p>
                            <div class='Codigo'>
                                <code>
                                    ${tab}${tab}{${saltoLinea}    
                                    ${tab}${tab}"compraAño": 0000,${saltoLinea}
                                    ${tab}${tab}"compraMes": 00,${saltoLinea}
                                    ${tab}${tab}"compraDia": 00,${saltoLinea}
                                    ${tab}${tab}"precioEntradaUsd": 00,${saltoLinea}
                                    ${tab}${tab}"importeInicialUsd": 00,${saltoLinea}
                                    ${tab}${tab}"compraCotizacionUsd": 00,${saltoLinea}
                                    ${tab}${tab}"importeCriptoComprado": 00,${saltoLinea}
                                    ${tab}${tab}"importeArsInvertido": 00,${saltoLinea}
                                    ${tab}${tab}"inversorEmail": "inversor@mycorreo.com",${saltoLinea}
                                    ${tab}${tab}"InversorComentario":"Comentario del inversor",${saltoLinea}
                                    ${tab}${tab}}
                                </code>
                            </div>
                        </li>
                        <li>
                            <p class='crud'><b>Modificar un registro en la coleccion simInvBtc </b></p>
                            <p>${tab}Proposito: modificar un registro en la coleccion simInvBtc por su Id.</p>
                            <p>${tab}<b>Metodo: Put (por body)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>"${b} http://localhost:${srvPuerto}/api/simInvBtc/editar ${b}" </i></p>
                            <div class='Codigo'>
                                <code>
                                    ${tab}${tab}{${saltoLinea}    
                                    ${tab}${tab}"_id": "simInvBtc_Id",${saltoLinea} 
                                    ${tab}${tab}"compraAño": 0000,${saltoLinea}
                                    ${tab}${tab}"compraMes": 00,${saltoLinea}
                                    ${tab}${tab}"compraDia": 00,${saltoLinea}
                                    ${tab}${tab}"precioEntradaUsd": 00,${saltoLinea}
                                    ${tab}${tab}"importeInicialUsd": 00,${saltoLinea}
                                    ${tab}${tab}"compraCotizacionUsd": 00,${saltoLinea}
                                    ${tab}${tab}"importeCriptoComprado": 00,${saltoLinea}
                                    ${tab}${tab}"importeArsInvertido": 00,${saltoLinea}
                                    ${tab}${tab}"inversorEmail": "inversor@mycorreo.com",${saltoLinea}
                                    ${tab}${tab}"InversorComentario":"Comentario del inversor",${saltoLinea}
                                    ${tab}${tab}}
                                </code>
                            </div>
                        </li>
                        <li>
                            <p class='crud'><b>Eliminar un registro en la coleccion simInvBtc </b></p>
                            <p>${tab}Proposito: eliminar un registro en la coleccion simInvBtc por su Id.</p>
                            <p>${tab}<b>Metodo: Delete (por params)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>"${b} http://localhost:${srvPuerto}/api/simInvBtc/eliminar/registro/<i class='destacar1'>[IdSimInvBtc]</i> ${b}" </i>${b}</p>
                            <p>${tab}<b>Metodo: Delete (por qry)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>"${b} http://localhost:${srvPuerto}/api/simInvBtc/eliminar/registro<i class='destacar2'><b>?</b></i><i class='destacar1'>id=[IdSimInvBtc]</i> ${b}" </i>${b}</p>
                            <p>${tab}<b>Metodo: Delete (por body)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>"${b} http://localhost:${srvPuerto}/api/simInvBtc/eliminar/registro ${b}"</i></p>
                            <div class='Codigo'>
                                <code>
                                    ${tab}${tab}{${saltoLinea}    
                                    ${tab}${tab}"_id": "simInvBtc_Id"${saltoLinea}
                                    ${tab}${tab}}
                                </code>
                            </div>
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
                    simInvBtcInfo
                }; 

                