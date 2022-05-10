const myhandler = require('../handlers/handler');
const mysimInvBtcCrudHandler =require('../consultas/simInvBtcCrudHandler')
const entorno = require('../appSrvEntorno');

const { fnMiServidor } = entorno
const { srvPuerto, srvNombre } = fnMiServidor()

const {verGatitoPorParams} = mysimInvBtcCrudHandler

const saltoLinea =  '<Br/>';  //'\n' en Java, <Br/> en Html
const b = '&nbsp';              //Espacio en blanco
const tab = `${b}${b}${b}`;     //Tabulacion de tres espacios
const dA = '&#174;'             // Derechos de Autor

const myScripts =`
                  <script>
                  </script> 
                `

const estilos=`<style>
                  h1 {
                      color:aquamarine;
                      text-shadow: 1px 2px;
                    }

                  h2 {color:lawngreen;}
                  h3 {color:lawngreen;}
                  h4 {color:lawngreen;}
                  
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
                    margin-right: 48rem;
                    margin-left: 2rem;
                    line-height: 200%;
                    font-size:large;
                    border-radius: 30px;
                    box-shadow: 5px 5px #888888;
                  }

                  .codigo2 {
                    border-image: initial;
                    border: 1px solid blue;
                    color:white;
                    background-color: darkslategray;
                    margin-right: 32rem;
                    margin-left: 2rem;
                    line-height: 200%;
                    font-size:large;
                    border-radius: 30px;
                    box-shadow: 5px 5px red;
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


function simInvBtcPrueba() {
  
  const contenido = `<head>
                      <title>ProbarApisimInvBtc</title>
                      ${estilos}
                     </head>
                     <body  class="fondo">
                      <h1>
                        Api simInvBtc (Simulador de inversiones en Bitcoin) - Prueba axios
                      </h1>
                      <h2>
                        Informacion para el uso de las api simInvBtc
                      </h2>
                      <p><b>Proposito general:</b>${b} Probar el CRUD de la coleccion simInvBtc.</p>
                       ${saltoLinea}
                      <h3>
                        SimInvBtc:
                      </h3>
                      <ul>
                        <li>
                            <p class='crud'><b>Ejemplo de la estructura de la coleccion simInvBtc:</b></p>
                            <div class='Codigo'>
                                <code>
                                    ${tab}${tab}{${saltoLinea}    
                                    ${tab}${tab}"_id": "simInvBtc_Id",${saltoLinea} 
                                    ${tab}${tab}"compraAño": 2021,${saltoLinea}
                                    ${tab}${tab}"compraMes": 11,${saltoLinea}
                                    ${tab}${tab}"compraDia": 28,${saltoLinea}
                                    ${tab}${tab}"precioEntradaUsd": 37500,${saltoLinea}
                                    ${tab}${tab}"importeInicialUsd": 50,${saltoLinea}
                                    ${tab}${tab}"compraCotizacionUsd": 195,${saltoLinea}
                                    ${tab}${tab}"importeCriptoComprado": 0.078,${saltoLinea}
                                    ${tab}${tab}"importeArsInvertido": 7000,${saltoLinea}
                                    ${tab}${tab}"inversorEmail": "inversor@mycorreo.com",${saltoLinea}
                                    ${tab}${tab}"InversorComentario": "Primer compra",${saltoLinea}
                                    ${tab}${tab}}
                                </code>
                            </div>
                            <p>${tab}${tab}Ver contenido de la coleccion:${b}<i>" http://localhost:${srvPuerto}/api/simInvBtc/ver " </i>${b}
                                <a href="http://localhost:${srvPuerto}/api/simInvBtc/ver" target="_blank">Ver todos los registros</a></p>
                        </li>
                        <li>
                            <p class='crud'><b>Construccion de la Uri de prueba: </b></p>
                            <div class='Codigo'>
                                <code>
                                    ${tab}[ <mark><b>http://localhost:${srvPuerto}/api/simInvBtc/resultado/<i class='Destacar1'>[Accion]</i>/<i class='Destacar1'>[listaDeValores]</i></b></mark> ]${tab}   
                                </code>
                            </div>
                        </li>
                        <li>
                            <p class='crud'><b>Lista de Acciones diponibles: </b></p>
                            <div class='Codigo'>
                                <code>
                                    ${tab}${tab}VER_POR_BODY${saltoLinea}
                                    ${tab}${tab}CREAR_POR_BODY${saltoLinea}
                                    ${tab}${tab}EDITAR_POR_BODY${saltoLinea}
                                    ${tab}${tab}ELIMINAR_POR_BODY${saltoLinea}
                                </code>
                            </div>
                        </li>
                        <li>
                            <p class='crud'><b>Ejemplos de la construccion de la Uri de prueba diponibles: </b></p>
                            <div class='Codigo2'>
                                <code>
                                    ${tab}${tab}${b}<b> Ver un registro:</b> ${saltoLinea}
                                    ${tab}${tab}${tab}http://localhost:${srvPuerto}/api/simInvBtc/resultado/VER_POR_BODY/{"_id": "escribeElId"}${saltoLinea}
                                    ${tab}${tab}${b}<b> Crear un registro:</b> ${saltoLinea}
                                    ${tab}${tab}${tab}http://localhost:${srvPuerto}/api/simInvBtc/resultado/CREAR_POR_BODY/{ "compraAño":0000, "compraMes":00, "compraDia":00, "precioEntradaUsd":00,"importeInicialUsd":00, "compraCotizacionUsd":00,"importeCriptoComprado":00, "importeArsInvertido":00, "inversorEmail":"inversor@mycorreo.com", "InversorComentario":"Prueba" }${saltoLinea}
                                    ${tab}${tab}${b}<b> Editar un registro:</b> ${saltoLinea}
                                    ${tab}${tab}${tab}http://localhost:${srvPuerto}/api/simInvBtc/resultado/EDITAR_POR_BODY/{ "_id":"simInvBtc_Id", "compraAño":0000, "compraMes":00, "compraDia":00, "precioEntradaUsd":00,"importeInicialUsd":00, "compraCotizacionUsd":00,"importeCriptoComprado":00, "importeArsInvertido":00, "inversorEmail":"inversor@mycorreo.com", "InversorComentario":"Prueba" }${saltoLinea}
                                    ${tab}${tab}${b}<b> Eliminar un registro:</b> ${saltoLinea}
                                    ${tab}${tab}${tab}http://localhost:${srvPuerto}/api/simInvBtc/resultado/ELIMINAR_POR_BODY/{"_id": "escribeElId"}${saltoLinea}

                                </code>
                            </div>
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
                    simInvBtcPrueba
                };  
                
