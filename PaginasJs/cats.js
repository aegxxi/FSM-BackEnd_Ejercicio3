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
                    margin-left: 2rem;
                    line-height: 200%;
                    font-size:large;
                    border-radius: 30px;
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


function catInfo() {
  
  const contenido = `<head>
                      <title>ApisCat-Informacion</title>
                      ${estilos}
                     </head>
                     <body  class="fondo">
                      <h1>
                        Apis Cat - Informacion
                      </h1>
                      <h2>
                        Informacion para el uso de las api cats
                      </h2>
                      <p><b>Proposito general:</b>${b} CRUD de gatitos.</p>
                       ${saltoLinea}
                      <h3>
                        Gatitos:
                      </h3>
                      <ul>
                        <li>
                            <p class='crud'><b>Ver todos los gatitos </b></p>
                            <p>${tab}Proposito: retornar todos los nombres de gatitos.</p>
                            <p>${tab}Metodo: Get </p>
                            <p>${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/cats/ver " </i>${b}
                                <a href="http://localhost:${srvPuerto}/api/cats/ver" target="_blank">Ver</a></p>
                        </li>
                        <li>
                            <p class='crud'><b>Ver un gatito </b></p>
                            <p>${tab}Proposito: retornar un nombre de gatito.</p>
                            <p>${tab}<b>Metodo: Get (por params)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/ver/gato/<i class='destacar1'>[IdGatito]</i> </i> " </i>${b}</p>
                            <p>${tab}<b>Metodo: Get (por qry)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/ver/gato<i class='destacar2'><b>?</b></i><i class='destacar1'>id=[IdGatito]</i> " </i>${b}</p>
                            <p>${tab}<b>Metodo: Get (por body)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/ver/gato " </i>${b}</p>
                            <div class='Codigo'>
                                <code>
                                    ${tab}${tab}{${saltoLinea}    
                                    ${tab}${tab}"_id": "6258d21ba60416c73341165e"${saltoLinea}
                                    ${tab}${tab}}
                                </code>
                            </div>
                        </li>
                        <li>
                            <p class='crud'><b>Crear nombres de gatitos </b></p>
                            <p>${tab}Proposito: Crear un nombre de gatito.</p>
                            <p>${tab}Metodo: Post (por params) </p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/cats/crear/<i class='destacar1'>[NobreGatito]</i> " </i></p>
                            <p>${tab}Metodo: Post (por qry) </p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/cats/crear<i class='destacar2'><b>?</b></i><i class='destacar1'>name=[NobreGatito]</i> " </i></p>
                            <p>${tab}Metodo: Post (por body) </p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/cats/crear " </i></p>
                            <div class='Codigo'>
                                <code>
                                    ${tab}${tab}{${saltoLinea}    
                                    ${tab}${tab}"name": "Patroclo"${saltoLinea}
                                    ${tab}${tab}}
                                </code>
                            </div>
                        </li>
                        <li>
                            <p class='crud'><b>Modificar un gatito </b></p>
                            <p>${tab}Proposito: modificar un nombre de gatito.</p>
                            <p>${tab}<b>Metodo: Put (por params)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/editar/<i class='destacar1'>[IdGatito]</i>/<i class='destacar1'>[NombreGatito]</i> " </i>${b}</p>
                            <p>${tab}<b>Metodo: Put (por qry)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/editar<i class='destacar2'><b>?</b></i><i class='destacar1'>id=[IdGatito]<i class='destacar2'><b>&</b></i>name=[NombreGatito]</i> " </i>${b}</p>
                            <p>${tab}<b>Metodo: Put (por body)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/editar${b} "</p>
                            <div class='Codigo'>
                                <code>
                                    ${tab}${tab}{${saltoLinea}    
                                    ${tab}${tab}"_id": "6258d21ba60416c73341165e",${saltoLinea}
                                    ${tab}${tab}"name": "Patroclo"${saltoLinea}
                                    ${tab}${tab}}
                                </code>
                            </div>
                        </li>
                        <li>
                            <p class='crud'><b>Eliminar un gatito </b></p>
                            <p>${tab}Proposito: eliminar un nombre de gatito.</p>
                            <p>${tab}<b>Metodo: Delete (por params)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/eliminar/<i class='destacar1'>[IdGatito]</i> " </i>${b}</p>
                            <p>${tab}<b>Metodo: Delete (por qry)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/eliminar<i class='destacar2'><b>?</b></i><i class='destacar1'>id=[IdGatito]</i> " </i>${b}</p>
                            <p>${tab}<b>Metodo: Delete (por body)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/eliminar${b}"</p>
                            <div class='Codigo'>
                                <code>
                                    ${tab}${tab}{${saltoLinea}    
                                    ${tab}${tab}"_id": "6258d21ba60416c73341165e"${saltoLinea}
                                    ${tab}${tab}}
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
                    catInfo
                };                    