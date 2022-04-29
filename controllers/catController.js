const {Cat} = require('../models/model');
const { validationResult } = require('express-validator');
//const {responder} =require('../consultas/catsCrudResponse')

/* const vistaInicio = (req, res) => {
    res.render('index', { title: 'Express' });
} */


//Defino que envio a la consola
const consologuearProceso = true;
const consologuearError = true;


// --------------------------------------
// Inicio - CRUD de la colleccion Gatitos
// --------------------------------------

/**
 * Muestro todos los gatitos
 */
const vistaGatitos = async (req, res) => {
    try {
        const gatitos = await Cat.find();
        res.status(200).json({gatitos});    
    } catch (error) {
        (consologuearError) ? console.log(`vistaGatitos, Error: ) -> `, error) : null;
        res.status(400).send({msg: 'Hubo un error al mostrar los gatitos',error});          
    };   
};


/**
 * Muestro un gatito
 */
const verUnGatito = async (req, res) => {
    //consologueo los valores recibidos
    (consologuearProceso) ? console.log('verUnGatito (req.params) ->',req.params) : null;
    (consologuearProceso) ? console.log('verUnGatito (req.query) ->',req.query) : null;
    (consologuearProceso) ? console.log('verUnGatito (req.body) ->',req.body) : null;

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
        (consologuearProceso) ? console.log(`verUnGatito (valorClave) -> ${valorClave}`) : null;

    // si no se recuperaron datos de la ruta termino el proceso
    if (!valorClave) {
        (consologuearProceso) ? console.log(`verUnGatito (valorClave) -> ${valorClave} . No se recuperaron datos de Params. Query, o Body`) : null;
        return res.status(400).json({ msg: 'No se recuperaron datos de Params. Query, o Body' });
    }

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
            (consologuearProceso) ? console.log(errores) : null;
            if( !errores.isEmpty() ) {
                return res.status(400).json({errores: errores.array() });
            };    
        }; 
        
        //Busco gatipo (por su id), si gato resulta vacio rompe por el catch
        gato = await Cat.findById(valorClave);
        (consologuearProceso) ? console.log(`verUnGatito (gato ${valorClave}) -> ${gato}`) : null;
        
        res.status(200).json({msg: 'Gatito encontrado', gato}); 
        
    } catch (error) {
        (consologuearError) ? console.log(`verUnGatito (gato ${valorClave}, Error: ) -> `, error) : null;
        res.status(400).send({msg: 'verUnGatito -> Hubo un error al buscar el gatito, o el gattito no se encuentra en la base',error});      
    };
};


/**
 * Creo un gatito nuevo
 */
const crearGatito = async (req, res) => {
    //consologueo los valores recibidos
    (consologuearProceso) ? console.log('crearGatito (req.params) ->',req.params) : null;
    (consologuearProceso) ? console.log('crearGatito (req.query) ->',req.query) : null;
    (consologuearProceso) ? console.log('crearGatito (req.body) ->',req.body) : null;

    // extraer name del body (es un identificador unico en este caso)
    const { name } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const nameGato = (name) 
        ? name 
        : (req.params.name)
            ? req.params.name
            : req.query.name
        ;  
    (consologuearProceso) ? console.log(`crearGatito (nameGato) -> ${nameGato}`) : null;

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
        (consologuearProceso) ? console.log(`crearGatito (Completando kitty si el gato '${nameGato}' existe):`) : null;
        let kitty = await Cat.findOne({ nameGato });
        (consologuearProceso) ? console.log('crearGatito (kitty) ->',kitty) : null;

        if(kitty && kitty==nameGato) {
            return res.json({ msg: 'El gattito ya existe' });
        }; 
        
        // Agrego gatito, si kitty resulta vacio rompe por el catch
        kitty = new Cat({ name: nameGato });
        const gato = await kitty.save();

        res.status(200).json({msg: 'Gatito agregado', gato}); 

    } catch (error) {
        (consologuearError) ? console.log(`crearGatito (gato ${nameGato}, Error: ) -> `, error) : null;
        res.status(400).send({msg: 'Hubo un error al crear el gatito',error});   
    };
};


/**
 * Modifico un gatito
 */
const editarGatito = async (req, res) => {
    //consologueo los valores recibidos
    (consologuearProceso) ? console.log('editarGatito (req.params) ->',req.params) : null;
    (consologuearProceso) ? console.log('editarGatito (req.query) ->',req.query) : null;
    (consologuearProceso) ? console.log('editarGatito (req.body) ->',req.body) : null;

    // extraer id del body (es elidentificador unico)
    const { _id, name } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const valorClave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;
    (consologuearProceso) ? console.log(`editarGatito (valorClave) -> ${valorClave}`) : null;

    // Almeceno el valor del name, si se paso por algun metodo (body, query, params)
    const valorNombre = (name) 
        ? name 
        : (req.params.name)
            ? req.params.name
            : req.query.name
        ;  
    (consologuearProceso) ? console.log(`editarGatito (valorNombre) -> ${valorNombre}`) : null;

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
            (consologuearProceso) ? console.log(errores) : null;
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
        (consologuearError) ? console.log(`editarGatito (gato ${valorClave}, Error: ) -> `, error) : null;
        res.status(400).send({msg: 'Hubo un error al buscar el gatito, o el gattito no se encuentra en la base',error});      
    };
};



/**
 * Elimino un gatito
 */
const elininarGatito = async (req, res) => {
    //consologueo los valores recibidos
    (consologuearProceso) ? console.log('elininarGatito (req.params) ->',req.params) : null;
    (consologuearProceso) ? console.log('elininarGatito (req.query) ->',req.query) : null;
    (consologuearProceso) ? console.log('elininarGatito (req.body) ->',req.body) : null;

    // extraer id del body (es elidentificador unico)
    const { _id, } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const valorclave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;    
    (consologuearProceso) ? console.log(`elininarGatito (valorclave) -> ${valorclave}`) : null;

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
        (consologuearProceso) ? console.log(`elininarGatito (Gatito Eliminado) -> `, gato) : null;
        
        res.status(200).json({msg: 'Gatito Eliminado', gato});   

    } catch (error) {
        (consologuearError) ? console.log(`elininarGatito (gato ${valorclave}, Error: ) -> `, error) : null;
        res.status(400).send({msg: 'Hubo un error al eliminar el gatito',error});
    };
};

// -----------------------------------
// Fin - CRUD de la colleccion Gatitos
// -----------------------------------




/**
 * Muestro informacion de la api:
 * Este controlador muestra una pagina con informacion de apoyo para el uso de las api de la coleccion Cats.
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
 * Muestro pagina para la prueba de la api con Axios:
 * - Este controlador muestra una pagina con instrucciones para probar las api de la coleccion Cats.
 *   - Se pueden probar los metodos GET, POST, PUT y DELETE 
 *   - Se le puede pasar los valores por Params, Query, o Body
 */
 const {catPrueba} = require('../PaginasJs/catsPrueba');
 const apiCatPrueba = async (req, res) => {
     
     try {
         const contenido = catPrueba();
         res.send(contenido);    
     } catch (error) {
        (consologuearError) ? console.log(`apiCatPrueba, Error: ) -> `, error) : null;
        res.status(400).send({msg: 'Hubo un error',error});    
     };
 };
 


/**
 * Muestro pagina con el resultado de la prueba de la api por Axios.
 * - Este controlador:
 *      - Recibe la ruta con los datos de prueba para axios
 *      - En la ruta hay dos parametros:
 *          Accion: valores fijos que indican como se ejecutara axios
 *          ListaDeValores: son los valores que utilizara accios para la prueba
 *      - Con el valor del parametro Accion determina a travz de un swicht el metodo a ejecutar
 *  - Este controlador devuelve a la ruta el resultado del metodo ejecutado 
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
    (consologuearProceso) ? console.log('catResultado -> (accion): ',myAction) : null;

        const myValues = (listaDeValores) 
        ? listaDeValores 
        : (req.params.listaDeValores)
            ? req.params.listaDeValores
            : req.query.listaDeValores
        ;  
    (consologuearProceso) ? console.log('catResultado -> (listaDeValores): ',myValues) : null;  

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
                (consologuearProceso) ? console.log('catResultado -> Buscando el contenido por Params: ',TYPES.verPorParams) : null;
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
                                                                                        (consologuearError) ? console.log('catResultado (responder) -> Error al recuperar los datos.',error) : null;
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
                (consologuearProceso) ? console.log('catResultado -> Buscando el contenido por Qry: ',TYPES.verPorQry) : null;
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
                                                            (consologuearError) ? console.log('catResultado (responder) -> Error al recuperar los datos.',error) : null;
                                                            res.send('Error al recuperar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;                
            
            case TYPES.verPorBody:
                (consologuearProceso) ? console.log('catResultado -> Buscando el contenido por Body: ',TYPES.verPorBody) : null;
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
                                                            (consologuearError) ? console.log('catResultado (responder) -> Error al recuperar los datos.',error) : null;
                                                            res.send('Error al recuperar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.creaPorParams:
                (consologuearProceso) ? console.log('catResultado -> Creando un nuevo gatito por Params: ',TYPES.creaPorParams) : null;
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
                                                            (consologuearError) ? console.log('catResultado (responder) -> Error al crear los datos.',error) : null;
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.crearPorQry:
                (consologuearProceso) ? console.log('catResultado -> Creando un nuevo gatito por Qry: ',TYPES.crearPorQry) : null;
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
                                                            (consologuearError) ? console.log('catResultado (responder) -> Error al crear los datos.',error) : null;
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.crearPorBody:
                (consologuearProceso) ? console.log('catResultado -> Creando un nuevo gatito por Body: ',TYPES.crearPorBody) : null;
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
                                                            (consologuearError) ? console.log('catResultado (responder) -> Error al crear los datos.',error) : null;
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.editarPorParams:
                (consologuearProceso) ? console.log('catResultado -> Editando un gatito por Params: ',TYPES.editarPorParams) : null;
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
                                                            (consologuearError) ? console.log('catResultado (responder) -> Error al editar los datos.',error) : null;
                                                            res.send('Error al editar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.editarPorQry:
                (consologuearProceso) ? console.log('catResultado -> Editando un gatito por Qry: ',TYPES.editarPorQry) : null;
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
                                                            (consologuearError) ? console.log('catResultado (responder) -> Error al editar los datos.',error) : null;
                                                            res.send('Error al editar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.editarPorBody:
                (consologuearProceso) ? console.log('catResultado -> Editando un gatito por Body: ',TYPES.editarPorBody) : null;
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
                                                            (consologuearError) ? console.log('catResultado (responder) -> Error al editar los datos.',error) : null;
                                                            res.send('Error al editar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.eliminarPorParams:
                (consologuearProceso) ? console.log('catResultado -> Eliminando un gatito por Params: ',TYPES.eliminarPorParams) : null;
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
                                                            (consologuearError) ? console.log('catResultado (responder) -> Error al eliminar los datos.',error) : null;
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.eliminarPorQry:
                (consologuearProceso) ? console.log('catResultado -> Eliminando un gatito por Qry: ',TYPES.eliminarPorQry) : null;
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
                                                            (consologuearError) ? console.log('catResultado (responder) -> Error al eliminar los datos.',error) : null;
                                                            res.send('Error al eliminar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.eliminarPorBody:
                (consologuearProceso) ? console.log('catResultado -> Eliminando un gatito por Body: ',TYPES.eliminarPorBody) : null;
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
                                                            (consologuearError) ? console.log('catResultado (responder) -> Error al eliminar los datos.',error) : null;
                                                            res.send('Error al eliminar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            default:
                contenido='Accion desconocida.'
                (consologuearProceso) ? console.log('catResultado -> switch default: ',contenido) : null;
                return res.send(contenido);    
        };
        return;
    } catch (error) {
        (consologuearError) ? console.log({msg: 'Hubo un error en el manejador (catResultado) en la rura /resultado...',error}) : null;
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
