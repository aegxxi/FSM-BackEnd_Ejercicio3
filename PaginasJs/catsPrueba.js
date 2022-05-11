const myhandler = require('../handlers/handler');
const myCatsCrudHandler =require('../consultas/catsCrudHandler')
const entorno = require('../appSrvEntorno');

const { fnMiServidor } = entorno
const { srvPuerto, srvNombre } = fnMiServidor()

const {verGatitoPorParams} = myCatsCrudHandler

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
                  details{margin-left: 2rem;}
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


function catPrueba() {
  
  const contenido = `<head>
                      <title>ProbarApiCats</title>
                      ${estilos}
                     </head>
                     <body  class="fondo">
                      <h1>
                        Apis Cat - Prueba axios
                      </h1>
                      <h2>
                        Informacion para las pruebas de las api cats, usando axios
                      </h2>
                      <p><b>Proposito general:</b>${b} Probar el CRUD de la coleccion cats, usando axios.</p>
                       ${saltoLinea}
                      <h3>
                        Coleccion Cast (Gatitos):
                      </h3>
                      <p><b>Descripcion:</b>${b} Este es un ejemplo simple de una coleccion para probar el CRUD.</p>
                      <ul>
                        <li>
                            <p class='crud'><b>Ejemplo de la estructura de la coleccion: </b></p>
                            <div class='Codigo'>
                                <code>
                                    ${tab}${tab}{${saltoLinea}    
                                    ${tab}${tab}"_id": "6258d21ba60416c73341165e",${saltoLinea}
                                    ${tab}${tab}"name": "Patroclo"${saltoLinea}
                                    ${tab}${tab}}
                                </code>
                            </div>
                            <p>${tab}${tab}Ver contenido de la coleccion:${b}<i>" http://localhost:${srvPuerto}/api/cats/ver " </i>${saltoLinea}
                              ${tab}${tab}<a href="http://localhost:${srvPuerto}/api/cats/ver" target="_blank">Ver todos los gatitos</a>
                            </p>
                        </li>
                        <li>
                            <p class='crud'><b>Construccion de la Uri de prueba: </b></p>
                            <div class='Codigo'>
                                <code>
                                    ${tab}${tab}[ <mark><b>http://localhost:${srvPuerto}/api/cats/resultado/<i class='Destacar1'>[Accion]</i>/<i class='Destacar1'>[listaDeValores]</i></b></mark> ]${saltoLinea}    
                                </code>
                            </div>
                            ${saltoLinea}
                            <details>
                                <summary>Comentarios</summary>
                                <article>
                                    <p class="textoComentario"> - El parametro <i class='Destacar1'>${b}Accion${b}</i> es obigatorio.</p>
                                    <p class="textoComentario"> - El parametro <i class='Destacar1'>${b}ListaDeValores${b}</i> es obligatorio.</p>
                                    <p class="textoComentario">${tab} Este parametro siempre debe pasarse en formato Json.</p>
                                    <p class="textoComentario">${tab} Su contenido dependera de los valores adicionales que la api requiera para realizar la consulta.</p>
                                    <p class="textoComentario">___</p>
                                </article>                            
                        </li>
                        <li>
                            <p class='crud'><b>Lista de Acciones diponibles: </b></p>
                            <div class='Codigo'>
                                <code>
                                    ${tab}${tab}VER_POR_PARAMS${saltoLinea}
                                    ${tab}${tab}VER_POR_QRY${saltoLinea}
                                    ${tab}${tab}VER_POR_BODY${saltoLinea}
                                    ${tab}${tab}CREAR_POR_PARAMS${saltoLinea}
                                    ${tab}${tab}CREAR_POR_QRY${saltoLinea}
                                    ${tab}${tab}CREAR_POR_BODY${saltoLinea}
                                    ${tab}${tab}EDITAR_POR_PARAMS${saltoLinea}
                                    ${tab}${tab}EDITAR_POR_QRY${saltoLinea}
                                    ${tab}${tab}EDITAR_POR_BODY${saltoLinea}
                                    ${tab}${tab}ELIMINAR_POR_PARAMS${saltoLinea}
                                    ${tab}${tab}ELIMINAR_POR_QRY${saltoLinea}
                                    ${tab}${tab}ELIMINAR_POR_BODY${saltoLinea}
                                </code>
                            </div>
                        </li>
                        <li>
                            <p class='crud'><b>Ejemplos de la construccion de la Uri de prueba: </b></p>
                            <div class='Codigo2'>
                                <code>
                                    ${tab}${tab}${b}Ver: ${saltoLinea}
                                    ${tab}${tab}${tab}http://localhost:${srvPuerto}/api/cats/resultado/VER_POR_PARAMS/{"_id": "IdDelGatitoAqui"}${saltoLinea}
                                    ${tab}${tab}${tab}http://localhost:${srvPuerto}/api/cats/resultado/VER_POR_QRY/{"_id": "IdDelGatitoAqui"}${saltoLinea}
                                    ${tab}${tab}${tab}http://localhost:${srvPuerto}/api/cats/resultado/VER_POR_BODY/{"_id": "IdDelGatitoAqui"}${saltoLinea}
                                    ${tab}${tab}${b}Crear: ${saltoLinea}
                                    ${tab}${tab}${tab}http://localhost:${srvPuerto}/api/cats/resultado/CREAR_POR_PARAMS/{"name": "NombreDelGatitoAqui"}${saltoLinea}
                                    ${tab}${tab}${tab}http://localhost:${srvPuerto}/api/cats/resultado/CREAR_POR_QRY/{"name": "NombreDelGatitoAqui"}${saltoLinea}
                                    ${tab}${tab}${tab}http://localhost:${srvPuerto}/api/cats/resultado/CREAR_POR_BODY/{"name": "NombreDelGatitoAqui"}${saltoLinea}
                                    ${tab}${tab}${b}Editar: ${saltoLinea}
                                    ${tab}${tab}${tab}http://localhost:${srvPuerto}/api/cats/resultado/EDITAR_POR_PARAMS/{"_id": "IdDelGatitoAqui", "name": "Diogenes"}${saltoLinea}
                                    ${tab}${tab}${tab}http://localhost:${srvPuerto}/api/cats/resultado/EDITAR_POR_QRY/{"_id": "IdDelGatitoAqui", "name": "Diogenes"}${saltoLinea}
                                    ${tab}${tab}${tab}http://localhost:${srvPuerto}/api/cats/resultado/EDITAR_POR_BODY/{"_id": "IdDelGatitoAqui", "name": "Diogenes"}${saltoLinea}
                                    ${tab}${tab}${b}Eliminar: ${saltoLinea}
                                    ${tab}${tab}${tab}http://localhost:${srvPuerto}/api/cats/resultado/ELIMINAR_POR_PARAMS/{"_id": "IdDelGatitoAqui"}${saltoLinea}
                                    ${tab}${tab}${tab}http://localhost:${srvPuerto}/api/cats/resultado/ELIMINAR_POR_QRY/{"_id": "IdDelGatitoAqui"}${saltoLinea}
                                    ${tab}${tab}${tab}http://localhost:${srvPuerto}/api/cats/resultado/ELIMINAR_POR_BODY/{"_id": "IdDelGatitoAqui"}${saltoLinea}

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
                    catPrueba
                };  
                
                