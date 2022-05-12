/** 
 * -------------------------
 * Modulo: catsCrudAccion.js
 * -------------------------
 * Parte de: Cats, ejemplo de Coleccion, CRUD, y Axios.
 * 
 * Descripcion: Este modulo contiene los valores las acciones permitidas 
 *              en el parametro Accion de la ruta para determinar el metodo 
 *              Axios que sera llamado para la ejecucion del del CRUD de la coleccion Cats. 
*/

// Constante que contiene las acciones permitidas en el parametro Accion de la ruta
const TYPES = {
    verPorParams: "VER_POR_PARAMS",
    verPorQry: "VER_POR_QRY",
    verPorBody: "VER_POR_BODY",
    creaPorParams: "CREAR_POR_PARAMS",
    crearPorQry: "CREAR_POR_QRY",
    crearPorBody: "CREAR_POR_BODY",
    editarPorParams: "EDITAR_POR_PARAMS",
    editarPorQry: "EDITAR_POR_QRY",
    editarPorBody: "EDITAR_POR_BODY",
    eliminarPorParams: "ELIMINAR_POR_PARAMS",
    eliminarPorQry: "ELIMINAR_POR_QRY",
    eliminarPorBody: "ELIMINAR_POR_BODY",
    }

module.exports = {TYPES}

