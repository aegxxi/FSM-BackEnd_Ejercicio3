/** 
 * -----------------------------
 * Modulo: externaAxiosAccion.js
 * -----------------------------
 * Parte de: Consultas Axios a Apis externas.
 * 
 * Descripcion: Este modulo contiene los valores las acciones permitidas 
 *              en el parametro Accion de la ruta para determinar el metodo 
 *              Axios que sera llamado para la ejecucion de la llamada a una api externa. 
*/



// Acciones para las consultas de Apis externas 
const TYPES = {
    dolarOficialHoy: "DOLAR_OFICIAL_HOY",       // Implementado
    dolarBlueHoy: "DOLAR_BLUE_HOY",             // Implementado
    euroOficialHoy: "EURO_OFICIAL_HOY",         // Sin implementar
    euroBlueHoy: "EURO_BLUE_HOY",               // Sin implementar
    euroHoy: "EURO_HOY",                        // Implementado
    criptoHoy: "CRIPTO_HOY",                    // Imĺementado
    criptoListaMonedas: "CRIPTO_LISTA_MONEDAS", // Imlementado
    binanceHoy: "BINANCE_HOY",                  // 
    }

module.exports = {TYPES}