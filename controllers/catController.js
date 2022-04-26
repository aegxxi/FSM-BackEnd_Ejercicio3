const {Cat} = require('../models/model');
const { validationResult } = require('express-validator');
//const {responder} =require('../consultas/catsCrudResponse')

/* const vistaInicio = (req, res) => {
    res.render('index', { title: 'Express' });
} */

/**
 * Muestro api info
 */
const {catInfo} = require('../PaginasJs/cats');
const apiCatInfo = async (req, res) => {
    
    try {
        const contenido = catInfo();
        res.send(contenido);    
    } catch (error) {
        res.status(400).send({msg: 'Hubo un error',error});    
    };
};




/**
 * Muestro todos los gatitos
 */
const vistaGatitos = async (req, res) => {
    try {
        const gatitos = await Cat.find();
        res.status(200).json({gatitos});    
    } catch (error) {
        //console.log(gato)
        res.status(400).send({msg: 'Hubo un error al mostrar los gatitos',error});          
    };   
};


/**
 * Muestro un gatito
 */
const verUnGatito = async (req, res) => {
    //consologueo los valores recibidos
    console.log('verUnGatito (req.params) ->',req.params);
    console.log('verUnGatito (req.query) ->',req.query);
    console.log('verUnGatito (req.body) ->',req.body);

    // extraer id del body (es elidentificador unico)
    const { _id } = req.body;
    //console.log(`verUnGatito (req.body) -> ${_id}`);

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const valorClave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;  
    console.log(`verUnGatito (valorClave) -> ${valorClave}`);

    let gato;
    
    try {
        // Verificar si no se paso el id del gatito a bucar.
        if(!valorClave) {
            return res.status(400).json({ msg: 'El id es obligatorio' });
        };
        
        // Verificar si se paso el id en el body
        if (_id) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            console.log(errores);
            if( !errores.isEmpty() ) {
                return res.status(400).json({errores: errores.array() });
            };    
        }; 
        
        //Busco gatipo (por su id), si gato resulta vacio rompe por el catch
        gato = await Cat.findById(valorClave);
        
        res.status(200).json({msg: 'Gatito encontrado', gato}); 
        
    } catch (error) {
        //console.log(gato)
        res.status(400).send({msg: 'Hubo un error al buscar el gatito, o el gattito no se encuentra en la base',error});      
    };
};


/**
 * Creo un gatito nuevo
 */
const crearGatito = async (req, res) => {
    //consologueo los valores recibidos
    console.log('crearGatito (req.params) ->',req.params);
    console.log('crearGatito (req.query) ->',req.query);
    console.log('crearGatito (req.body) ->',req.body);

    // extraer name del body (es un identificador unico en este caso)
    const { name } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const nameGato = (name) 
        ? name 
        : (req.params.name)
            ? req.params.name
            : req.query.name
        ;  
    console.log(`crearGatito (nameGato) -> ${nameGato}`);

    try {
        // Verificar si no se paso el name del gatito a bucar.
        if(!nameGato) {
            return res.status(400).json({ msg: 'El nombre es obligatorio' });
        };
        
        // Verificar si se paso el name en el body
        if (name) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            //console.log(errores);
            if( !errores.isEmpty() ) {
                //console.log('entre en: !errores.isEmpty()')
                return res.status(400).json({errores: errores.array() });
            };    
        }; 
           
        // Revisar que el gatito registrado sea unico 
        let kitty = await Cat.findOne({ nameGato });

        if(kitty) {
            return res.json({ msg: 'El gattito ya existe' });
        }; 
        
        // Agrego gatito, si kitty resulta vacio rompe por el catch
        kitty = new Cat({ name: nameGato });
        const gato = await kitty.save();

        res.status(200).json({msg: 'Gatito agregado', gato}); 

    } catch (error) {
        //console.log({msg: 'Hubo un error al crear el gatito',error});
        res.status(400).send({msg: 'Hubo un error al crear el gatito',error});   
    };
};


/**
 * Modifico un gatito
 */
const editarGatito = async (req, res) => {
    //consologueo los valores recibidos
    console.log('editarGatito (req.params) ->',req.params);
    console.log('editarGatito (req.query) ->',req.query);
    console.log('editarGatito (req.body) ->',req.body);

    // extraer id del body (es elidentificador unico)
    const { _id, name } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const valorClave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;
        console.log(`editarGatito (valorClave) -> ${valorClave}`);

        // Almeceno el valor del name, si se paso por algun metodo (body, query, params)
        const valorNombre = (name) 
        ? name 
        : (req.params.name)
            ? req.params.name
            : req.query.name
        ;  
        console.log(`editarGatito (valorNombre) -> ${valorNombre}`);

        let gato;
        let editarGato;

    try {
        // Verificar si no se paso el id del gatito a bucar.
        if(!valorClave) {
            return res.status(400).json({ msg: 'El id es obligatorio' });
        };
        
        // Verificar si no se paso el nuevo nombre del gatito a bucar.
        if(!valorNombre) {
            return res.status(400).json({ msg: 'El nuevo nombre es obligatorio' });
        };

        // Verificar si se paso el nombre en el body (si no usara params o qry en las rutas (_id || name))
        if ( name) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            console.log(errores);
            if( !errores.isEmpty() ) {
                return res.status(400).json({errores: errores.array() });
            };    
        }; 
        
        // Armo el objeto Modificado (para modificar el gatito).
        editarGato = {
            _id: valorClave,
            name: valorNombre
        };

        // Modifico el gatito, si gato resulta vacio rompe por el catch
        gato = await Cat.findByIdAndUpdate( valorClave, editarGato );
        
        res.status(200).json({msg: `Gatito editado, nuevo nombre:${valorNombre}`, gato}); 
        
    } catch (error) {
        //console.log(gato)
        res.status(400).send({msg: 'Hubo un error al buscar el gatito, o el gattito no se encuentra en la base',error});      
    };
};



/**
 * Elimino un gatito
 */
const elininarGatito = async (req, res) => {
    //consologueo los valores recibidos
    console.log('elininarGatito (req.params) ->',req.params);
    console.log('elininarGatito (req.query) ->',req.query);
    console.log('elininarGatito (req.body) ->',req.body);

    // extraer id del body (es elidentificador unico)
    const { _id, } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const valorclave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;    
        console.log(`elininarGatito (valorclave) -> ${valorclave}`);

    try {
    
        // Verificar si no se paso el id del gatito a eliminar.
        if(!valorclave) {
            return res.status(400).json({ msg: 'No existen parametros validos para esta operacion' });
        };
        
        // Verificar si se paso el id en el body
        if (_id) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            if( !errores.isEmpty() ) {
                return res.status(400).json({errores: errores.array() });
            };    
        }; 
        
        // Eliminar un gatito por su id, si gato resulta vacio rompe por el catch
        const gato = await Cat.findByIdAndDelete( valorclave );
        
        res.status(200).json({msg: 'Gatito Eliminado', gato});   

    } catch (error) {
        //console.log(error);
        res.status(400).send({msg: 'Hubo un error al eliminar el gatito',error});
    };
};



/**
 * Muestro pagina de prueba de la api
 */
 const {catPrueba} = require('../PaginasJs/catsPrueba');
 const apiCatPrueba = async (req, res) => {
     
     try {
         const contenido = catPrueba();
         res.send(contenido);    
     } catch (error) {
         res.status(400).send({msg: 'Hubo un error',error});    
     };
 };
 

/**
 * Muestro pagina con el resultado de la prueba de la api
 */
function catResultado(req, res){
    //const myAction = req.params.accion;
    //const myValues = req.params.listaDeValores;
    
    const { accion, listaDeValores } = req.body;

    const myAction = (accion) 
        ? accion 
        : (req.params.accion)
            ? req.params.accion
            : req.query.accion
        ;    
    console.log('catResultado -> (accion): ',myAction);

        const myValues = (listaDeValores) 
        ? listaDeValores 
        : (req.params.listaDeValores)
            ? req.params.listaDeValores
            : req.query.listaDeValores
        ;  
    console.log('catResultado -> (listaDeValores): ',myValues);  

    const {TYPES} = require('../consultas/catsCrudAccion');
    const { verGatitoPorParams,
            verGatitoPorQry,
            verGatitoPorBody,
            crearGatitoPorParams,
            crearGatitoPorQry,
            crearGatitoPorBody,
            editarGatitoPorParams,
            editarGatitoPorQry,
            editarGatitoPorBody,
            eliminarGatitoPorParams,
            eliminarGatitoPorQry,
            eliminarGatitoPorBody} = require('../consultas/catsCrudHandler');
    let contenido = {};
    let respuesta = '';

    // envio respuesta al servidor
    try {
        //console.log(TYPES)
        switch (myAction) {
            case TYPES.verPorParams:
                //console.log(TYPES.verPorParams);
                console.log('catResultado -> Buscando el contenido por Params:',TYPES.verPorParams)
                contenido = verGatitoPorParams( myValues, 
                                                '', 
                                                responder = async (contenido) => { 
                                                                                    try {
                                                                                        let respuesta = '';                        
                                                                                        //console.log('callback-Responder,data -> ',contenido.data);
                                                                                        respuesta = await `Id: ${contenido.data.gato._id}, Nombre: ${contenido.data.gato.name}`;
                                                                                        //console.log('callback-Responder, id -> ',contenido.data.gato._id);
                                                                                        //console.log('callback-Responder, name -> ',contenido.data.gato.name);
                                                                                        res.send(respuesta);
                                                                                        return;    
                                                                                    } catch (error) {
                                                                                        console.log('Error al recuperar los datos.',error);
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

            case TYPES.verPorQry:
                console.log('catResultado -> Buscando el contenido por Qry):',TYPES.verPorQry)
                contenido = verGatitoPorQry(myValues, 
                                            '', 
                                            responder = async (contenido) => { 
                                                        try {
                                                            let respuesta = '';                        
                                                            //console.log('callback-Responder,data -> ',contenido.data);
                                                            respuesta = await `Id: ${contenido.data.gato._id}, Nombre: ${contenido.data.gato.name}`;
                                                            //console.log('callback-Responder, id -> ',contenido.data.gato._id);
                                                            //console.log('callback-Responder, name -> ',contenido.data.gato.name);
                                                            res.send(respuesta);
                                                            return;    
                                                        } catch (error) {
                                                            console.log('Error al recuperar los datos.',error);
                                                            res.send('Error al recuperar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;                
            
            case TYPES.verPorBody:
                console.log('catResultado -> Buscando el contenido por Body):',TYPES.verPorBody)
                contenido = verGatitoPorBody(myValues, 
                                            '', 
                                            responder = async (contenido) => { 
                                                        try {
                                                            let respuesta = '';                        
                                                            //console.log('callback-Responder,data -> ',contenido.data);
                                                            respuesta = await `Id: ${contenido.data.gato._id}, Nombre: ${contenido.data.gato.name}`;
                                                            //console.log('callback-Responder, id -> ',contenido.data.gato._id);
                                                            //console.log('callback-Responder, name -> ',contenido.data.gato.name);
                                                            res.send(respuesta);
                                                            return;    
                                                        } catch (error) {
                                                            console.log('Error al recuperar los datos.',error);
                                                            res.send('Error al recuperar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.creaPorParams:
                console.log('catResultado -> Creando un nuevo gatito por Params):',TYPES.creaPorParams)
                contenido = crearGatitoPorParams(myValues, 
                                            '', 
                                            responder = async (contenido) => { 
                                                        try {
                                                            let respuesta = '';                        
                                                            //console.log('callback-Responder,data -> ',contenido.data);
                                                            respuesta = await `Id: ${contenido.data.gato._id}, Nombre: ${contenido.data.gato.name}`;
                                                            //console.log('callback-Responder, id -> ',contenido.data.gato._id);
                                                            //console.log('callback-Responder, name -> ',contenido.data.gato.name);
                                                            res.send(respuesta);
                                                            return;    
                                                        } catch (error) {
                                                            console.log('Error al crear los datos.',error);
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.crearPorQry:
                console.log('catResultado -> Creando un nuevo gatito por Qry):',TYPES.crearPorQry)
                contenido = crearGatitoPorQry(myValues, 
                                            '', 
                                            responder = async (contenido) => { 
                                                        try {
                                                            let respuesta = '';                        
                                                            //console.log('callback-Responder,data -> ',contenido.data);
                                                            respuesta = await `Id: ${contenido.data.gato._id}, Nombre: ${contenido.data.gato.name}`;
                                                            //console.log('callback-Responder, id -> ',contenido.data.gato._id);
                                                            //console.log('callback-Responder, name -> ',contenido.data.gato.name);
                                                            res.send(respuesta);
                                                            return;    
                                                        } catch (error) {
                                                            console.log('Error al crear los datos.',error);
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.crearPorBody:
                console.log('catResultado -> Creando un nuevo gatito por Body):',TYPES.crearPorBody)
                contenido = crearGatitoPorBody(myValues, 
                                            '', 
                                            responder = async (contenido) => { 
                                                        try {
                                                            let respuesta = '';                        
                                                            //console.log('callback-Responder,data -> ',contenido.data);
                                                            respuesta = await `Id: ${contenido.data.gato._id}, Nombre: ${contenido.data.gato.name}`;
                                                            //console.log('callback-Responder, id -> ',contenido.data.gato._id);
                                                            //console.log('callback-Responder, name -> ',contenido.data.gato.name);
                                                            res.send(respuesta);
                                                            return;    
                                                        } catch (error) {
                                                            console.log('Error al crear los datos.',error);
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.editarPorParams:
                console.log('catResultado -> Editando un gatito por Params):',TYPES.editarPorParams)
                contenido = editarGatitoPorParams(myValues, 
                                            '', 
                                            responder = async (contenido) => { 
                                                        try {
                                                            let respuesta = '';                        
                                                            //console.log('callback-Responder,data -> ',contenido.data);
                                                            respuesta = await `Id: ${contenido.data.gato._id}, Nombre: ${contenido.data.gato.name}`;
                                                            //console.log('callback-Responder, id -> ',contenido.data.gato._id);
                                                            //console.log('callback-Responder, name -> ',contenido.data.gato.name);
                                                            res.send(respuesta);
                                                            return;    
                                                        } catch (error) {
                                                            console.log('Error al crear los datos.',error);
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.editarPorQry:
                console.log('catResultado -> Editando un gatito por Qry):',TYPES.editarPorQry)
                contenido = editarGatitoPorQry(myValues, 
                                            '', 
                                            responder = async (contenido) => { 
                                                        try {
                                                            let respuesta = '';                        
                                                            //console.log('callback-Responder,data -> ',contenido.data);
                                                            respuesta = await `Id: ${contenido.data.gato._id}, Nombre: ${contenido.data.gato.name}`;
                                                            //console.log('callback-Responder, id -> ',contenido.data.gato._id);
                                                            //console.log('callback-Responder, name -> ',contenido.data.gato.name);
                                                            res.send(respuesta);
                                                            return;    
                                                        } catch (error) {
                                                            console.log('Error al crear los datos.',error);
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.editarPorBody:
                console.log('catResultado -> Editando un gatito por Body):',TYPES.editarPorBody)
                contenido = editarGatitoPorBody(myValues, 
                                            '', 
                                            responder = async (contenido) => { 
                                                        try {
                                                            let respuesta = '';                        
                                                            //console.log('callback-Responder,data -> ',contenido.data);
                                                            respuesta = await `Id: ${contenido.data.gato._id}, Nombre: ${contenido.data.gato.name}`;
                                                            //console.log('callback-Responder, id -> ',contenido.data.gato._id);
                                                            //console.log('callback-Responder, name -> ',contenido.data.gato.name);
                                                            res.send(respuesta);
                                                            return;    
                                                        } catch (error) {
                                                            console.log('Error al crear los datos.',error);
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.eliminarPorParams:
                console.log('catResultado -> Eliminando un gatito por Params):',TYPES.eliminarPorParams)
                contenido = eliminarGatitoPorParams(myValues, 
                                            '', 
                                            responder = async (contenido) => { 
                                                        try {
                                                            let respuesta = '';                        
                                                            //console.log('callback-Responder,data -> ',contenido.data);
                                                            respuesta = await `Id: ${contenido.data.gato._id}, Nombre: ${contenido.data.gato.name}`;
                                                            //console.log('callback-Responder, id -> ',contenido.data.gato._id);
                                                            //console.log('callback-Responder, name -> ',contenido.data.gato.name);
                                                            res.send(respuesta);
                                                            return;    
                                                        } catch (error) {
                                                            console.log('Error al crear los datos.',error);
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.eliminarPorQry:
                console.log('catResultado -> Eliminando un gatito por Qry):',TYPES.eliminarPorQry)
                contenido = eliminarGatitoPorQry(myValues, 
                                            '', 
                                            responder = async (contenido) => { 
                                                        try {
                                                            let respuesta = '';                        
                                                            //console.log('callback-Responder,data -> ',contenido.data);
                                                            respuesta = await `Id: ${contenido.data.gato._id}, Nombre: ${contenido.data.gato.name}`;
                                                            //console.log('callback-Responder, id -> ',contenido.data.gato._id);
                                                            //console.log('callback-Responder, name -> ',contenido.data.gato.name);
                                                            res.send(respuesta);
                                                            return;    
                                                        } catch (error) {
                                                            console.log('Error al crear los datos.',error);
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.eliminarPorBody:
                console.log('catResultado -> Eliminando un gatito por Body):',TYPES.eliminarPorBody)
                contenido = eliminarGatitoPorBody(myValues, 
                                            '', 
                                            responder = async (contenido) => { 
                                                        try {
                                                            let respuesta = '';                        
                                                            //console.log('callback-Responder,data -> ',contenido.data);
                                                            respuesta = await `Id: ${contenido.data.gato._id}, Nombre: ${contenido.data.gato.name}`;
                                                            //console.log('callback-Responder, id -> ',contenido.data.gato._id);
                                                            //console.log('callback-Responder, name -> ',contenido.data.gato.name);
                                                            res.send(respuesta);
                                                            return;    
                                                        } catch (error) {
                                                            console.log('Error al crear los datos.',error);
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            default:
                contenido='Accion desconocida.'
                return res.send(contenido);    
        };
        return
    } catch (error) {
        console.log({msg: 'Hubo un error en el manejador (catResultado) en la rura /resultado...',error})
        res.status(400).send({msg: 'Hubo un error en el manejador (catResultado) en la rura /resultado...',error}); 
    };
};





/**
 * Exporto las funciones del contrlador
 */
module.exports = {
                    apiCatInfo,
                    crearGatito,
                    editarGatito, 
                    vistaGatitos,
                    verUnGatito,
                    elininarGatito,
                    apiCatPrueba,
                    catResultado
                };
