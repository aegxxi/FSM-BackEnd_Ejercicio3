/** 
 * -------------------------------
 * Modulo: simInvBtcCrudAccion.js
 * -------------------------------
 * Parte de: Proyecto Simulador de inversiones en Bitcon (BTC).
 * 
 * Descripcion: Este modulo contiene los valores las acciones permitidas 
 *              en el parametro Accion de la ruta para determinar el metodo 
 *              Axios que sera llamado para la ejecucion del del CRUD de la coleccion, 
 *              del "Simulador de Inversiones en Bitcoin" (BTC).
*/


// Constante que contiene las acciones permitidas en el parametro Accion de la ruta
const TYPES = {
    //verPorParams: "VER_POR_PARAMS",
    //verPorQry: "VER_POR_QRY",
    verPorBody: "VER_POR_BODY",
    crearPorBody: "CREAR_POR_BODY",
    editarPorBody: "EDITAR_POR_BODY",
    //eliminarPorParams: "ELIMINAR_POR_PARAMS",
    //eliminarPorQry: "ELIMINAR_POR_QRY",
    eliminarPorBody: "ELIMINAR_POR_BODY",
    }

module.exports = {TYPES}
