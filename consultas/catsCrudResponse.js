/** 
 * ---------------------------
 * Modulo: catsCrudResponse.js
 * ---------------------------
 * Parte de: Cats, ejemplo de Coleccion, CRUD, y Axios.
 * 
 * Descripcion: En DESARROLLO, su prposito es Normalizar (estandarizar) 
 *              las respuestas en los response de catsCrudHandler. 
*/


//async await
function responder(err, req, res, contenido) { 
    try {
        let respuesta = '';                        
        console.log('callback-Responder,data -> ',contenido.data);

        respuesta =  `Id: ${contenido.data.gato._id}, Nombre: ${contenido.data.gato.name}`;

        console.log('callback-Responder, id -> ',contenido.data.gato._id);
        console.log('callback-Responder, name -> ',contenido.data.gato.name);
        res.send(respuesta);
        return;    
    } catch (error) {
        console.log('Error al recuperar los datos.',error);
        res.send('Error al recuperar los datos.');
    };
    return;
}


module.exports = {responder}

