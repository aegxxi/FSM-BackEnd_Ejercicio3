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

                  .pSbTt1 {
                    font-size:large;
                    line-height: 200%;
                  }
                  
                  pSbTt1:before {
                    content: "\a ";
                    white-space: pre;
                  }

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
                        <title>Apis-Loguin</title>
                        ${estilos}
                    </head>
                    <body  class="fondo">
                        <h1>
                        Api - Loguin (Inicio y Cierre de sesion)
                        </h1>
                        <h2>
                        informacion para las pruebas de inicio y cierre de sesion.
                        </h2>
                        <p><b>Descripcion general:</b>${b} Documentacion para uso de la api de loguin.</p>
                        ${saltoLinea}
                        <h3>
                        Probar usando Axios:
                        </h3>
                        <ul>
                            <li>
                                <p class='crud'><b>Construccion de la Uri para probar con Axios el inicio/cierre se session: </b></p>
                                <div class='Codigo'>
                                    <code>
                                        ${tab}${tab}[ <mark><b>http://localhost:${srvPuerto}/api/externas/resultado/<i class='Destacar1'>[Accion]</i>/<i class='Destacar1'>[listaDeValores]</i></b></mark> ]${saltoLinea}    
                                    </code>
                                </div>
                                ${saltoLinea}
                                <details>
                                    <summary>Comentarios</summary>
                                    <article>
                                        <p class="textoComentario"> - El parametro <i class='Destacar1'>${b}Accion${b}</i> es obigatorio.</p>
                                        <p class="textoComentario"> - El parametro <i class='Destacar1'>${b}ListaDeValores${b}</i> puede omitirse si la api no requiere valores adicionales.</p>
                                        <p class="textoComentario">${tab} Este parametro siempre debe pasarse en formato Json.</p>
                                        <p class="textoComentario">${tab} Su contenido dependera de los valores adicionales que la api requiera para realizar la consulta.</p>
                                        <p class="textoComentario">___</p>
                                    </article>
                                </details> 
                            </li>
                        </ul>
                        ${saltoLinea} 
                        <h3>
                        Ingresar:
                        </h3>
                        <p><b>${tab}Proposito general:</b>${b}Probar el Inicio de sesion.</p>
                        <ul>
                            <li>
                                <p class='pSbTt1'><b>Probar iniciar sesion:  </b></p>
                                <p>${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/loguin/resultado/<b class='destacar1'>INGRESAR</b>/<b class='destacar1'>{"email": "sebi@correo.com", "password": "234567"}</b> " </i>${b}
                                    <a href="${encodeURI(`http://localhost:${srvPuerto}/api/loguin/resultado/INGRESAR/{"email": "sebi@correo.com", "password": "234567"} `)}" target="_blank"><i class='destacar3'>Ingresar</i></a></p>
                                <details>
                                    <summary>Instrucciones</summary>
                                    <article>
                                        <p class="textoComentario"> - El parametro <i class='Destacar2'>Accion</i> debe ser <b class='destacar1'> INGRESAR </b>.</p>
                                        <p class="textoComentario"> - El parametro <i class='Destacar2'>ListaDeValores</i> es obligatorio para esta accion.</p>
                                        <p class="textoComentario">${tab} Este parametro siempre debe pasarse en formato Json y tiene dos propiedades.</p>
                                        <p class="textoComentario">${tab} Ejemplo:${b} <b class='destacar1'>{"email": "usuario@correo.com", "password": "123456"}</b> .</p>
                                        <p class="textoComentario">${tab} <b class='destacar1'>"email"</b>, es mail del usuario.</p>
                                        <p class="textoComentario">${tab} <b class='destacar1'>"password"</b>, es la contraseña del usuario.</p>
                                        <p class="textoComentario">___</p>
                                    </article>
                                </details> 
                            </li>
                        </ul> 
                        ${saltoLinea}
                        <h3>
                        Salir:
                        </h3>
                        <p><b>${tab}Proposito general:</b>${b} Probar el Cierre de sesion.</p>
                        <ul>
                            <li>
                                <p class='pSbTt1'><b>Probar cerrar sesion:  </b></p>
                                <p>${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/loguin/resultado/<b class='destacar1'>SALIR</b> " </i>${b}
                                    <a href="${encodeURI(`http://localhost:${srvPuerto}/api/loguin/resultado/SALIR`)}" target="_blank"><i class='destacar3'>Salir</i></a></p>
                                <details>
                                    <summary>Instrucciones</summary>
                                    <article>
                                        <p class="textoComentario"> - El parametro <i class='Destacar2'>Accion</i> debe ser <b class='destacar1'> SALIR </b>.</p>
                                        <p class="textoComentario"> - El parametro <i class='Destacar2'>ListaDeValores</i> se omite para esta accion.</p>
                                        <p class="textoComentario">${tab} Este parametro no es necesario para esta accion.</p>
                                        <p class="textoComentario">___</p>
                                    </article>
                                </details> 
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