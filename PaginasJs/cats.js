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
                      <p><b>Proposito general:</b>${b} Crear y retornar nombres de gatitos.</p>
                       ${saltoLinea}
                      <h3>
                        Gatitos:
                      </h3>
                      <ul>
                        <li>
                            <p><b>Ver todos los gatitos </b></p>
                            <p>${tab}Proposito: retornar todos los nombres de gatitos.</p>
                            <p>${tab}Metodo: Get </p>
                            <p>${tab}Uri:${b}<i>"http://localhost:${srvPuerto}/api/cats/ver" </i>${b}
                                <a href="http://localhost:${srvPuerto}/api/cats/ver" target="_blank">Ver</a></p>
                        </li>
                        <li>
                            <p><b>Crear gatitos </b></p>
                            <p>${tab}Proposito: Crear un nombre de gatito.</p>
                            <p>${tab}Metodo: Post (por parametros) </p>
                            <p>${tab}Uri:${b}<i>"http://localhost:${srvPuerto}/api/cats/crear/<i class='destacar1'>[NobreGatito]</i>" </i></p>
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