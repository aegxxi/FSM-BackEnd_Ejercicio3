
const consologuearProceso = true
const consologuearError = true

const saltoLinea =  '<Br/>';  //'\n' en Java, <Br/> en Html
const b = '&nbsp';              //Espacio en blanco
const tab = `${b}${b}${b}`;     //Tabulacion de tres espacios
const dA = '&#174;'             // Derechos de Autor

/**
 * Muestro informacion de la api:
 * Este controlador muestra una pagina con informacion de apoyo para el uso de las api.
 */
 const { Info } = require('../PaginasJs/apisExternas');
 const apiExternasInfo = async (req, res) => {
     
     try {
         const contenido = Info();
         res.send(contenido);    
     } catch (error) {
         console.log('apiExternasInfo -> Hubo un error',error)
         res.status(400).send({msg: 'Hubo un error',error});    
     };
 };


/**
 * Muestro pagina con el resultado de la prueba de la api por Axios.
 * - Este controlador:
 *      - Recibe la ruta con los datos de prueba para axios
 *      - En la ruta hay dos parametros:
 *          Accion: valores fijos que indican como se ejecutara axios
 *          ListaDeValores: son los valores que utilizara axios para la prueba
 *      - Con el valor del parametro Accion determina a travz de un swicht el metodo a ejecutar
 *  - Este controlador devuelve a la ruta el resultado del metodo ejecutado 
 */
 function extResultado(req, res){
    //const myAction = req.params.accion;
    //const myValues = req.params.listaDeValores;
    
    const { accion, listaDeValores } = req.body;

    const myAction = (accion) 
        ? accion 
        : (req.params.accion)
            ? req.params.accion
            : req.query.accion
        ;    
    (consologuearProceso) ? console.log('extResultado -> (accion): ',myAction) : null;

        const myValues = (listaDeValores) 
        ? listaDeValores 
        : (req.params.listaDeValores)
            ? req.params.listaDeValores
            : req.query.listaDeValores
        ;  
    
    (consologuearProceso) ? console.log('extResultado -> (listaDeValores): ',myValues) : null;  

    // Valido el parametro lista de valores.
    if (myValues && !IsJsonString(myValues)) {
        res.send({msg: "Los valores pasados en el parametro 'listaDeValores' no son validos. "} );
        return;    
    };

    const {TYPES} = require('../consultas/externaAxiosAccion');
    const { 
            dolarOficialHoy,
            dolarBlueHoy,
            euroHoy,
            criptoHoy,
            criptoListaMonedas,
            binanceHoy
        } = require('../consultas/consultasAxiosExternasHandler');
    
    let contenido = {};
    let respuesta = '';

    // envio respuesta al servidor
    try {
        //console.log(TYPES)
        switch (myAction) {
            case TYPES.dolarOficialHoy:
                //console.log(TYPES.verPorParams);
                (consologuearProceso) ? console.log('extResultado -> Buscando el contenido: ',TYPES.dolarOficialHoy) : null;
                contenido = dolarOficialHoy( 
                                        '', 
                                        responder = async (contenido) => { 
                                                                            try {
                                                                                let respuesta = '';                        
                                                                                console.log('callback-Responder,data -> ',contenido.oficial);
                                                                                /* respuesta = await `OficialComprador: ${contenido.oficial.value_buy}, OficialVendedor: ${contenido.oficial.value_sell}`; */
                                                                                respuesta = await `Dolar Oficial: ${saltoLinea}${saltoLinea} ${tab}Comprador: ${contenido.oficial.value_buy},${saltoLinea} ${tab}Vendedor: ${contenido.oficial.value_sell}`;
                                                                                res.send(respuesta);
                                                                                return;    
                                                                            } catch (error) {
                                                                                (consologuearError) ? console.log('extResultado (responder) -> Error al recuperar los datos.',error) : null;
                                                                                res.send('Error al recuperar los datos.');
                                                                            };
                                                                            return;
                                                                        }
                                    );
                //console.log(contenido)
                //respuesta =`Id: ${contenido.data._id}, Nombre: ${contenido.data.name}`
                //respuesta =`Nombre: ${contenido.data.name}`
                //console.log(respuesta)
                return;

            case TYPES.dolarBlueHoy:
                //console.log(TYPES.verPorParams);
                (consologuearProceso) ? console.log('extResultado -> Buscando el contenido: ',TYPES.dolarBlueHoy) : null;
                contenido = dolarBlueHoy( 
                                        '', 
                                        responder = async (contenido) => { 
                                                                            try {
                                                                                let respuesta = '';                        
                                                                                console.log('callback-Responder,data -> ',contenido.blue);
                                                                                /* respuesta = await `BlueComprador: ${contenido.blue.value_buy}, BlueVendedor: ${contenido.blue.value_sell}`; */
                                                                                respuesta = await `Dolar Blue: ${saltoLinea}${saltoLinea} ${tab}Comprador: ${contenido.blue.value_buy}, ${saltoLinea} ${tab}Vendedor: ${contenido.blue.value_sell}`;
                                                                                res.send(respuesta);
                                                                                return;    
                                                                            } catch (error) {
                                                                                (consologuearError) ? console.log('extResultado (responder) -> Error al recuperar los datos.',error) : null;
                                                                                res.send('Error al recuperar los datos.');
                                                                            };
                                                                            return;
                                                                        }
                                    );
                //console.log(contenido)
                //respuesta =`Id: ${contenido.data._id}, Nombre: ${contenido.data.name}`
                //respuesta =`Nombre: ${contenido.data.name}`
                //console.log(respuesta)
                return;

            case TYPES.euroHoy:
                (consologuearProceso) ? console.log('extResultado -> Buscando el contenido por Qry: ',TYPES.euroHoy) : null;
                contenido = euroHoy(
                                    '', 
                                            responder = async (contenido) => { 
                                                        try {
                                                            let respuesta = '';                        
                                                            //console.log('callback-Responder,data -> ',contenido.data);
                                                            /* respuesta = await `"Euro":{{"Tipo":"Oficial","OficialComprador":${contenido.oficial_euro.value_buy},"OficialVendedor":${contenido.oficial_euro.value_sell}},` +
                                                                                     `{"Tipo":"Blue","BlueComprador":${contenido.blue_euro.value_buy},"BlueVendedor":${contenido.blue_euro.value_sell}}` +
                                                                                     `}`; */
                                                            respuesta = await `Euro: ${saltoLinea}${saltoLinea} ${tab}Oficial: ${saltoLinea} ${tab}${tab}Comprador: ${contenido.oficial_euro.value_buy}, ${saltoLinea} ${tab}${tab}Vendedor: ${contenido.oficial_euro.value_sell}, ${saltoLinea}${saltoLinea}` +
                                                                              `${tab}Blue: ${saltoLinea} ${tab}${tab}Comprador: ${contenido.blue_euro.value_buy}, ${saltoLinea} ${tab}${tab}Vendedor: ${contenido.blue_euro.value_sell}` +
                                                                              ``;
                                                            //respuesta = JSON.parse(respuesta);
                                                            res.send(respuesta);
                                                            return;    
                                                        } catch (error) {
                                                            (consologuearError) ? console.log('extResultado (responder) -> Error al recuperar los datos.',error) : null;
                                                            res.send('Error al recuperar los datos.');
                                                        };
                                                        return;
                                                        }
                                    );
                return;                
            
            case TYPES.criptoListaMonedas:
                (consologuearProceso) ? console.log('extResultado -> Buscando el contenido: ',TYPES.criptoListaMonedas) : null;
                contenido = criptoListaMonedas( 
                                                '', 
                                                responder = async (contenido) => { 
                                                            try {
                                                                let respuesta = {};                        
                                                                //console.log('callback-Responder,data -> ',contenido.data);
                                                                                                                            /** 
                                                                 * key = contenido.Data.CoinInfo.Id 
                                                                 * Token = contenido.Data.CoinInfo.Name
                                                                 * Nombre = contenido.Data.CoinInfo.FullName 
                                                                 * */

                                                                //console.log('extResultado (callback-Responder) -> ',contenido)

                                                                //respuesta = await `Moneda: ${saltoLinea}${saltoLinea} ${tab}key: ${contenido.Data[1].CoinInfo.Id}, Token: ${contenido.Data[1].CoinInfo.Name}, Nombre: ${contenido.Data[1].CoinInfo.FullName }${saltoLinea}`   
                                                                respuesta = await contenido.Data.map(moneda => ((moneda.CoinInfo.Name).padEnd(10,'.') + '->   ' + moneda.CoinInfo.FullName));

                                                                //console.log('callback-Responder, id -> ',contenido.data.gato._id);
                                                                //console.log('callback-Responder, name -> ',contenido.data.gato.name);
                                                                
                                                                //res.send(respuesta);                  // la salida es un array que puede ser visualizado como Json.
                                                                res.send(respuesta.join(saltoLinea));   // la salida es texto que es renderizado por el navegador.
                                                                return;    
                                                            } catch (error) {
                                                                (consologuearError) ? console.log('extResultado (responder) -> Error al recuperar los datos.',error) : null;
                                                                res.send('Error al recuperar los datos.');
                                                            };
                                                            return;
                                                            }
                                                );
                return;
            
            case TYPES.criptoHoy:
                (consologuearProceso) ? console.log('extResultado -> Buscando el contenido por Body: ',TYPES.criptoHoy) : null;
                contenido = criptoHoy(myValues, 
                                            '', 
                                            responder = async (contenido) => { 
                                                        try {
                                                            let respuesta = '';
                                                            console.log('extResultado (callback-Responder) -> ',contenido)                        

                                                            /** 
                                                             * key = contenido.CoinInfo.Id 
                                                             * Token = contenido.CoinInfo.Name
                                                             * Nombre = contenido.CoinInfo.FullName 
                                                             * */
                                                            respuesta = await `Cotizacion: ${saltoLinea}${saltoLinea}` +
                                                                                `${tab}El precio es: ${contenido.PRICE} ${saltoLinea}` +
                                                                                `${tab}Precio más alto del día: ${contenido.HIGHDAY} ${saltoLinea}` + 
                                                                                `${tab}Precio más bajo del día: ${contenido.LOWDAY} ${saltoLinea}`  +
                                                                                `${tab}Variación últimas 24 horas: ${contenido.CHANGEPCT24HOUR} ${saltoLinea}` +
                                                                                `${tab}Última Actualización: ${contenido.LASTUPDATE} ${saltoLinea}`

                                                            //console.log('callback-Responder, id -> ',contenido.data.gato._id);
                                                            //console.log('callback-Responder, name -> ',contenido.data.gato.name);
                                                            res.send(respuesta);
                                                            return;    
                                                        } catch (error) {
                                                            (consologuearError) ? console.log('extResultado (responder) -> Error al recuperar los datos.',error) : null;
                                                            res.send('Error al recuperar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.binanceHoy:
                //console.log(TYPES.verPorParams);
                (consologuearProceso) ? console.log('extResultado -> Buscando el contenido: ',TYPES.binanceHoy) : null;
                contenido = binanceHoy(myValues, 
                                        '', 
                                        responder = async (contenido) => { 
                                                                            try {
                                                                                let respuesta = '';                        
                                                                                console.log('callback-Responder,data -> ',contenido.blue);
                                                                                /* respuesta = await `BlueComprador: ${contenido.blue.value_buy}, BlueVendedor: ${contenido.blue.value_sell}`; */
                                                                                respuesta = await `Binance: ${saltoLinea}${saltoLinea} ${tab}Par de Monedas: ${contenido.symbol}, ${tab}Precio: ${contenido.price}`;
                                                                                res.send(respuesta);
                                                                                return;    
                                                                            } catch (error) {
                                                                                (consologuearError) ? console.log('extResultado (responder) -> Error al recuperar los datos.',error) : null;
                                                                                res.send('Error al recuperar los datos.');
                                                                            };
                                                                            return;
                                                                        }
                                    );
    
                return;            
            
            default:
                contenido='Accion desconocida.'
                (consologuearProceso) ? console.log('extResultado -> switch default: ',contenido) : null;
                return res.send(contenido);    
        };
        return;
    } catch (error) {
        (consologuearError) ? console.log({msg: 'Hubo un error en el manejador (extResultado) en la rura /resultado...',error}) : null;
        res.status(400).send({msg: 'Hubo un error en el manejador (extResultado) en la rura /resultado...',error}); 
    };
};



//---------------------------------------------------
// Inicio - Funciones Auxiliares para la validaciones
//---------------------------------------------------

function IsJsonString(str) {
    try {
      var json = JSON.parse(str);
      return (typeof json === 'object');
    } catch (e) {
      return false;
    };
  };

//------------------------------------------------
// Fin - Funciones Auxiliares para la validaciones
//------------------------------------------------



 /**
 * Exporto las funciones del contrlador
 */
module.exports = {
                    apiExternasInfo,
                    extResultado
                };
