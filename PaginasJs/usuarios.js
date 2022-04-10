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
                      <p><b>Proposito general:</b>${b} Crear y retornar usuarios.</p>  
                      ${saltoLinea}
                      
                      <h3>
                        Usuarios:
                      </h3>
                      <ul>
                        <li>
                            <p><b>Ver todos los Usuarios </b></p>
                            <p>${tab}Proposito: retornar todos los usuarios.</p>
                            <p>${tab}Metodo: Get </p>
                            <p>${tab}Uri:${b}<i>"http://localhost:${srvPuerto}/api/usuarios/ver" </i>${b}
                                <a href="http://localhost:${srvPuerto}/api/usuarios/ver" target="_blank">Ver</a></p>
                        </li>
                        <li>
                            <p><b>Crear Usuarios </b></p>
                            <p>${tab}Proposito: crear un usuario.</p>
                            <p>${tab}Metodo: Post (por body)</p>
                            <p>${tab}<i>Uri:${b}"http://localhost:${srvPuerto}/api/usuarios/crear" </i></p>
                            <p>${tab}Estructura: (ejemplo del body para el post)</p>
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