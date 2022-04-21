const srvInfo = require('../PaginasJs/info');
const apisInfo = require('../PaginasJs/api');
const entorno = require('../appSrvEntorno');

const { fnMiServidor } =entorno
const { srvPuerto, srvNombre } = fnMiServidor()

function vistaInicio(req, res){
    /* 
    res.render('index', { 
                            title: 'Express', 
                            myPort: `${srvPuerto}` 
                        });
    */
    
    res.render('index', { title: 'Express' });      
                     
};

function informacion(req, res){
    let contenido = '' + srvInfo.mostrarSrvInfo()

    // envio respuesta al servidor                
    res.send(contenido);
};

function apiInfo(req, res){
    let contenido = '' + apisInfo.Info()

    // envio respuesta al servidor                
    res.send(contenido);
};

function resultado(req, res){
    const contenido = ''; 

    // envio respuesta al servidor
    /* 
    export function reponder(action) {
    switch (action.type) {
        case TYPES.incrementar:
            return res.send(contenido);
        case TYPES.incrementar2:
            return {contador: state.contador + action.payload};
        case TYPES.decrementar:
            return {contador: state.contador - 1};
        case TYPES.decrementar2:
            return {contador: state.contador - action.payload};
        case TYPES.resetear:
            return 
        default:
            return ;
    }
    }

    */
    
    res.send(contenido);
};


module.exports = {
                    informacion,
                    vistaInicio,
                    apiInfo,
                    resultado
                };

                