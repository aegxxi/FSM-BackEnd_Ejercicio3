/**
 * Proposito: Esta coleccion recopila los datos necesarios para el simulador de inversion en BTC (Bitcoin)
 * Descripcion: la idea es registrar los datos como si el usuario hiciera una compra mensual recurrente de BTC
 *              sobre la base de comprar Usd 50 cada ultimo viernes de cada mes 
 *              (momento en que vencen los contratos de opciones, y su valor tiende a estar mas bajo o estable)
 * Objetivo del simulador: Mostrar los resultados de los rendimientos, 
 *                         suguiriendo que esto se haga a partir del 6to mes del inicio de las inversiones.
 * */

const mongoose = require('mongoose');

const SmldrInvrsBtcsSchema = mongoose.Schema({
    
    // Año de la inversion
    compraAño: {
        type: Number,
        required: true,
    },
    
    // Mes de la inversion
    compraMes: {
        type: Number,
        required: true,
    },
    
    // Dia de la inversion
    compraDia: {
        type: Number,
        required: true,
    },
    
    //Valor en dolares de Btc en el momento de la compra
    precioEntradaUsd: {
        type: Number,
        required: true,
    },

    // Importe en dolares invertido (para la compra de Btc)
    importeInicialUsd: {
        type: Number,
        required: true,
    },
    
    // Valor del dolar en $ Argentinos al momento de la compra
    compraCotizacionUsd: {
        type: Number,
        required: true,
    },
    
    // Cantidad de Btc Comprados (Adquiridos)
    importeCriptoComprado: {
        type: Number,
        required: true,
    },    

    // Importe inicial en $ Argentinos invertido
    importeArsInvertido: {
        type: Number,
        required: true,
    }, 

    // Mail del Inversor
    inversorEmail: {
        type: String,
        required: true,
        trim: true, 
    },

    // Comentario del Inversor
    InversorComentario: {
        type: String,
        trim: true
    },

    // Token (Nombre corto) de la criptomoneda Bitcoin = BTC
    token: {
        type: String,
        default: 'BTC'
    },

    registro: {
        type: Date,
        default: Date.now()
    }
});




//module.exports = mongoose.model('SmldrInvrsBtc', SmldrInvrsBtcsSchema);

const SmldrInvrsBtc = mongoose.model('SmldrInvrsBtc', SmldrInvrsBtcsSchema);

module.exports = {SmldrInvrsBtc}

