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


function usuariosInfo() {
  
  const contenido = `<head>
                      <title>ApiUsuarios-Informacion</title>
                      ${estilos}
                     </head>
                     <body  class="fondo">
                      <h1>
                        Api Usuarios - Informacion
                      </h1>
                      
                      <h2>
                        Informacion para el uso de las api de usuario
                      </h2>                      
                      <p><b>Proposito general:</b>${b} CRUD de usuarios.</p>  
                      ${saltoLinea}
                      
                      <h3>
                        Usuarios:
                      </h3>
                      <ul>
                        <li>
                            <p class='crud'><b>Ver todos los Usuarios </b></p>
                            <p>${tab}Proposito: retornar todos los usuarios.</p>
                            <p>${tab}Metodo: Get </p>
                            <p>${tab}Uri:${b}<i>"http://localhost:${srvPuerto}/api/usuarios/ver" </i>${b}
                                <a href="http://localhost:${srvPuerto}/api/usuarios/ver" target="_blank">Ver</a></p>
                        </li>
                        <li>
                            <p class='crud'><b>Ver un Usuario </b></p>
                            <p>${tab}Proposito: retornar los datos de un usuario por su Id.</p>
                            <p>${tab}<b>Metodo: Get (por params)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/usuarios/ver/usuario/<i class='destacar1'>[IdUsuario]</i> </i> " </i>${b}</p>
                            <p>${tab}<b>Metodo: Get (por qry)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/usuarios/ver/usuario<i class='destacar2'>?</i><i class='destacar1'>id=[IdUsuario]</i> " </i>${b}</p>
                            <p>${tab}<b>Metodo: Get (por body)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/usuarios/ver/usuario " </i>${b}</p>
                            <div class='Codigo'>
                              <code>
                              ${tab}${tab}{${saltoLinea}    
                              ${tab}${tab}"_id":"6251a723b972dfcf40c273c9"${saltoLinea}
                              ${tab}${tab}}
                            </code>
                            </div>
                        </li>
                        <li>
                            <p class='crud'><b>Crear usuarios </b></p>
                            <p>${tab}Proposito: Ingresar datos y crear un usuario nuevo.</p>
                            <p>${tab}Metodo: Post (por body) </p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/usuarios/crear " </i></p>
                            <div class='Codigo'>
                                <code>
                                    ${tab}${tab}{${saltoLinea}    
                                    ${tab}${tab}"nombre":	"Andres"${saltoLinea}
                                    ${tab}${tab}"email":	"Andres@correo.com"${saltoLinea}
                                    ${tab}${tab}"password":	"123456"${saltoLinea}
                                    ${tab}${tab}}
                                </code>
                            </div>
                        </li>
                        <li>
                            <p class='crud'><b>Modificar un usuario </b></p>
                            <p>${tab}Proposito: modificar un Usuario por su Id.</p>
                            <p>${tab}<b>Metodo: Put (por body)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/editar/usuario${b} " </i></p>
                            <div class='Codigo'>
                                <code>
                                    ${tab}${tab}{${saltoLinea}    
                                    ${tab}${tab}"_id": "6258d21ba60416c73341165e",${saltoLinea}
                                    ${tab}${tab}"nombre":	"Andres"${saltoLinea}
                                    ${tab}${tab}"email":	"Andres@correo.com"${saltoLinea}
                                    ${tab}${tab}"password":	"123456"${saltoLinea}
                                    ${tab}${tab}}
                                </code>
                            </div>
                        </li>
                        <li>
                            <p class='crud'><b>Eliminar un usuario </b></p>
                            <p>${tab}Proposito: eliminar un usuario por su Id.</p>
                            <p>${tab}<b>Metodo: Delete (por params)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/usuarios/eliminar/usuario/<i class='destacar1'>[IdUsuario]</i> " </i>${b}</p>
                            <p>${tab}<b>Metodo: Delete (por qry)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/usuarios/eliminar/usuario<i class='destacar2'>?</i><i class='destacar1'>id=[IdUsuario]</i> " </i>${b}</p>
                            <p>${tab}<b>Metodo: Delete (por body)</b></p>
                            <p>${tab}${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/usuarios/eliminar/usuario${b} "</i></p>
                            <div class='Codigo'>
                                <code>
                                    ${tab}${tab}{${saltoLinea}    
                                    ${tab}${tab}"_id": "6258d21ba60416c73341165e",${saltoLinea}
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
                    usuariosInfo
                };                    