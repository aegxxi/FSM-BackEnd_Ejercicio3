/** 
 * ----------------------------
 * Modulo: loguinAxiosAccion.js
 * ----------------------------
 * Parte de: Loguin de usuario, inicio y cierre de sesion.
 * 
 * Descripcion: Este modulo contiene los valores las acciones permitidas 
 *              en el parametro Accion de la ruta para determinar el metodo 
 *              Axios que sera llamado para la ejecucion de la consulta.
*/



// Acciones para las consultas de la Api Loguin via Axios 
const TYPES = {
    ingresarSession: "INGRESAR",       // En Prueba
    salirSession: "SALIR",             // En Prueba
    };

module.exports = {TYPES};
