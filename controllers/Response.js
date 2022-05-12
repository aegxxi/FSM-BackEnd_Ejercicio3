/** 
 * -------------------
 * Modulo: Response.js
 * -------------------
 * Parte de: En DESARROLLO
 * 
 * Descripcion: En DESARROLLO, su prposito es Normalizar (estandarizar) 
 *              las respuestas en los response. 
*/


// Funciones para asegurarme que el response siempre tiene el mismo formato.

exports.success = function (req, res, message, status) {
    res.status(status || 200).send({ 
        error: '',
        body: message
    });
}

exports.error = function (req, res, message, status, details) {
    console.error('[response error] ' + details);

    res.status(status || 500).send({ 
        error: message,
        body: '',
    });
}