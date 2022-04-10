const srvInfo = require('../PaginasJs/info');
const apisInfo = require('../PaginasJs/api');

function vistaInicio(req, res){
    res.render('index', { title: 'Express' });
}

function informacion(req, res){
    let contenido = '' + srvInfo.mostrarSrvInfo()

    // envio respuesta al servidor                
    res.send(contenido);
}

function apiInfo(req, res){
    let contenido = '' + apisInfo.Info()

    // envio respuesta al servidor                
    res.send(contenido);
}

module.exports = {
                    informacion,
                    vistaInicio,
                    apiInfo
                };