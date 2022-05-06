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

                  .destacar3{
                    color:lawngreen;
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
                    border-radius: 30px;
                    box-shadow: 5px 5px #888888;
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

                        <ul>
                            <li>
                                <p class='crud'><b>Construccion de la Uri de consulta a una api externa: </b></p>
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

                        <h4>
                            Cotizacion del dolar hoy:
                        </h4>
                        <p><b>${tab}Proposito general:</b>${b} Obtener las cotizaciones del Dolar y el Euro hoy en Argentina.</p>
                        <ul>
                            <li>
                                <p><i>${tab}Fuente Url de las Api DolarHoy  </i></p>
                                <p>${tab}${tab}Uri:${b}<i>"https://api.bluelytics.com.ar/v2/latest" </i>${b}
                                    <a href="https://api.bluelytics.com.ar/v2/latest" target="_blank">Ver</a></p>
                            </li>
                            <li>
                                <p class='pSbTt1'><b>Consulta por valores del Dolar Oficial </b></p>
                                <p>${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/externas/resultado/<b class='destacar1'>DOLAR_OFICIAL_HOY</b> " </i>${b}
                                    <a href="http://localhost:${srvPuerto}/api/externas/resultado/DOLAR_OFICIAL_HOY" target="_blank"><i class='destacar3'>Consultar</i></a></p>
                                <details>
                                    <summary>Instrucciones</summary>
                                    <article>
                                        <p class="textoComentario"> - El parametro <i class='Destacar2'>${b}Accion${b}</i> es obigatorio.</p>
                                        <p class="textoComentario"> - El parametro Accion debe ser<i class='Destacar1'>${b}DOLAR_OFICIAL_HOY${b}</i>.</p>
                                        <p class="textoComentario"> - El parametro <i class='Destacar2'>${b}ListaDeValores${b}</i> se omite,</p>
                                        <p class="textoComentario">${tab} ya que no se requieren valores adicionales al consultar esta api.</p>
                                        <p class="textoComentario">___</p>
                                    </article>
                                </details> 
                            </li>
                            <li>
                                <p class='pSbTt1'><b>Consulta por valores del Dolar Blue </b></p>
                                <p>${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/externas/resultado/<b class='destacar1'>DOLAR_BLUE_HOY</b> " </i>${b}
                                    <a href="http://localhost:${srvPuerto}/api/externas/resultado/DOLAR_BLUE_HOY" target="_blank"><i class='destacar3'>Consultar</i></a></p>
                                    <details> 
                                        <summary>Instrucciones</summary>
                                        <article>
                                            <p class="textoComentario"> - El parametro <i class='Destacar2'>${b}Accion${b}</i> es obigatorio.</p>
                                            <p class="textoComentario"> - El parametro Accion debe ser<i class='Destacar1'>${b}DOLAR_BLUE_HOY${b}</i>.</p>
                                            <p class="textoComentario"> - El parametro <i class='Destacar2'>${b}ListaDeValores${b}</i> se omite,</p>
                                            <p class="textoComentario">${tab} ya que no se requieren valores adicionales al consultar esta api.</p>
                                            <p class="textoComentario">___</p>
                                        </article>
                                    </details> 
                            </li>
                            <li>
                                <p class='pSbTt1'><b>Consulta por valores del Euro </b></p>
                                <p>${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/externas/resultado/<b class='destacar1'>EURO_HOY</b>" </i>${b}
                                    <a href="http://localhost:${srvPuerto}/api/externas/resultado/EURO_HOY" target="_blank"><i class='destacar3'>Consultar</i></a></p>
                                    <details> 
                                        <summary>Instrucciones</summary>
                                        <article>
                                            <p class="textoComentario"> - El parametro <i class='Destacar2'>${b}Accion${b}</i> es obigatorio.</p>
                                            <p class="textoComentario"> - El parametro Accion debe ser<i class='Destacar1'>${b}EURO_HOY${b}</i>.</p>
                                            <p class="textoComentario"> - El parametro <i class='Destacar2'>${b}ListaDeValores${b}</i> se omite,</p>
                                            <p class="textoComentario">${tab} ya que no se requieren valores adicionales al consultar esta api.</p>
                                            <p class="textoComentario">___</p>
                                        </article>  
                                    </details> 
                        </li>
                        </ul> 
                        ${saltoLinea}

                        <h4>
                            Cotizacion de las pricipales Criptomonedas hoy (desde cryptocompare.com):
                        </h4>
                        <p><b>${tab}Proposito general:</b>${b} Obtener las cotizaciones de las principales Criptomonedas hoy.</p>
                        <ul>
                            <li>
                                <p><i>Fuentes Url de las Api CriptoHoy (cryptocompare.com)  </i></p>
                                <p>${tab}Listado de criptomonedas</p>
                                <p>${tab}${tab}Uri:${b}<i>"https://min-api.cryptocompare.com/data/top/mktcapfull<b class='destacar2'>?</b>limit=<b class='destacar1'>10</b><b class='destacar2'>&</b>tsym=<b class='destacar1'>USD</b>" </i>${b}
                                    <a href="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD" target="_blank">Ver</a></p>
                                <p>${tab}Cotizacion de criptomonedas</p>
                                <p>${tab}${tab}Uri:${b}<i>"https://min-api.cryptocompare.com/data/pricemultifull<b class='destacar2'>?</b>fsyms=<b class='destacar1'>BTC</b><b class='destacar2'>&</b>tsyms=<b class='destacar1'>USD</b>" </i>${b}
                                    <a href="https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD" target="_blank">Ver</a></p>    
                            </li>
                            <li>
                                <p class='pSbTt1'><b>Lista de las Criptomonedas disponibles  </b></p>
                                <p><i>En esta lista pruedes ver el token de cada cripto junto a su nombre.  </i></p>
                                <p>${tab}Uri:${b}<i>"${b} http://localhost:${srvPuerto}/api/externas/resultado/<b class='destacar1'>CRIPTO_LISTA_MONEDAS</b>${b} " </i>${b}
                                    <a href="http://localhost:${srvPuerto}/api/externas/resultado/CRIPTO_LISTA_MONEDAS" target="_blank"><i class='destacar3'>Consultar</i></a></p>
                                    <details> 
                                        <summary>Instrucciones</summary>
                                        <article>
                                            <p class="textoComentario"> - El parametro <i class='Destacar2'>${b}Accion${b}</i> es obigatorio.</p>
                                            <p class="textoComentario"> - El parametro Accion debe ser<i class='Destacar1'>${b}CRIPTO_LISTA_MONEDAS${b}</i>.</p>
                                            <p class="textoComentario"> - El parametro <i class='Destacar2'>${b}ListaDeValores${b}</i> se omite,</p>
                                            <p class="textoComentario">${tab} ya que no se requieren valores adicionales al consultar esta api.</p>
                                            <p class="textoComentario">___</p>
                                        </article>  
                                    </details> 
                            </li>
                            <li>
                                <p class='pSbTt1'><b>Cotizacion de Criptomoneda  </b></p>
                                <p>${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/externas/resultado/<b class='destacar1'>CRIPTO_HOY</b>/<b class='destacar1'>{"token": "BTC", "moneda": "USD"}</b> " </i>${b}
                                    <a href="${encodeURI(`http://localhost:${srvPuerto}/api/externas/resultado/CRIPTO_HOY/{"token": "BTC", "moneda": "USD"} `)}" target="_blank"><i class='destacar3'>Consultar</i></a></p>
                                <details>
                                    <summary>Instrucciones</summary>
                                    <article>
                                        <p class="textoComentario"> - El parametro <i class='Destacar2'>Accion</i> debe ser <b class='destacar1'>CRIPTO_HOY</b>.</p>
                                        <p class="textoComentario"> - El parametro <i class='Destacar2'>ListaDeValores</i> es obligatorio para esta consulta.</p>
                                        <p class="textoComentario">${tab} Este parametro siempre debe pasarse en formato Json y tiene dos propiedades.</p>
                                        <p class="textoComentario">${tab} <b class='destacar1'>{"token": "BTC", "moneda": "USD"}</b> .</p>
                                        <p class="textoComentario">${tab} <b class='destacar1'>"token"</b>, es el nombre corto que represeta a la cripto.</p>
                                        <p class="textoComentario">${tab}${tab} Puedes ver la lista de criptos didponibles en el punto anterior,</p>
                                        <p class="textoComentario">${tab}${tab} o haz click ${b} 
                                            <a href="http://localhost:${srvPuerto}/api/externas/resultado/CRIPTO_LISTA_MONEDAS" target="_blank"><i class='destacar3'>Aqui</i></a>
                                            ${b}para consultar las 100 mas relevantes.
                                        </p>
                                        <p class="textoComentario">${tab} <b class='destacar1'>"moneda"</b>, es el codigo (tres caracteres) que representa en que moneda se desea la cotizacion.</p>
                                        <p class="textoComentario">${tab}${tab} Ejemplos:.</p>
                                        <p class="textoComentario">${tab}${tab}${tab} codigo: 'USD', 'Dolar de Estados Unidos'.</p>
                                        <p class="textoComentario">${tab}${tab}${tab} codigo: 'ARS', 'Peso Argentino'.</p>
                                        <p class="textoComentario">${tab}${tab}${tab} codigo: 'MXN', 'Peso Mexicano'.</p>
                                        <p class="textoComentario">${tab}${tab}${tab} codigo: 'EUR', 'Euro'.</p>
                                        <p class="textoComentario">${tab}${tab}${tab} codigo: 'GBP', 'Libra Esterlina'.</p>
                                        <p class="textoComentario">___</p>
                                    </article>
                                </details> 
                            </li>
                        </ul> 
                        ${saltoLinea}

                        <h4>
                            Cotizacion de las pricipales Criptomonedas hoy (desde binance.com):
                        </h4>
                        <ul>
                            <li>
                                <p><i>${tab}Fuente Url de las Api Binance  </i></p>
                                <p>${tab}${tab}Uri:${b}<i>"https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT" </i>${b}
                                    <a href="https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT" target="_blank">Ver</a></p>
                            </li>
                            <li>
                                <p class='pSbTt1'><b>Consulta por valores de las cripto en Binance </b></p>
                                <p>${tab}Uri:${b}<i>" http://localhost:${srvPuerto}/api/externas/resultado/<b class='destacar1'>BINANCE_HOY</b>/<b class='destacar1'>{"par": "BTCUSDT"}</b> " </i>${b}
                                <a href="${encodeURI(`http://localhost:${srvPuerto}/api/externas/resultado/BINANCE_HOY/{"par": "BTCUSDT"} `)}" target="_blank"><i class='destacar3'>Consultar</i></a></p>
                                <details>
                                    <summary>Instrucciones</summary>
                                    <article>
                                        <p class="textoComentario"> - El parametro <i class='Destacar2'>Accion</i> debe ser <b class='destacar1'>BINANCE_HOY</b>.</p>
                                        <p class="textoComentario"> - El parametro <i class='Destacar2'>ListaDeValores</i> es obligatorio para esta consulta.</p>
                                        <p class="textoComentario">${tab} Este parametro siempre debe pasarse en formato Json y tiene solo una propiedad.</p>
                                        <p class="textoComentario">${tab} <b class='destacar1'>{"par": "BTCUSDT"}</b> .</p>
                                        <p class="textoComentario">${tab} <b class='destacar1'>"par"</b>, el valor de esta propiedad esta formado por dos partes. Ejemplo:</p>
                                        <p class="textoComentario">${tab}${tab} - "<b>BTC</b>" es el nombre corto de la cripto de la cual se desea saber su valor,</p>
                                        <p class="textoComentario">${tab}${tab} - "<b>USDT</b>" es la moneda de referencia en la que se devolvera el valor de la cripto.</p>
                                        <p class="textoComentario">${tab}${tab} De esta manera el par quedaria formado por "BTCUSDT".</p>
                                        <p class="textoComentario">${tab} Binance no nos da la cotizacion en dolares USD, Pero podemos usar como moneda de referencia:</p>
                                        <p class="textoComentario">${tab} "USDT", o "DAI" que tienen paridad equivalente al dolar,</p>

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