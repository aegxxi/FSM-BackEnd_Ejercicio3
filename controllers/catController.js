const MgObjectId = require('mongoose').Types.ObjectId;;
const {Cat} = require('../models/model');
const { validationResult } = require('express-validator');
//const {responder} =require('../consultas/catsCrudResponse')


// Defino que envio a la consola (Global)
let consologuearProcesos = true;
let consologuearErrores = true;
// (Local), en cada controlador se puede usar el valor global, o definir el valor 
    // const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos
    // const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores




// --------------------------------------
// Inicio - CRUD de la colleccion Gatitos
// --------------------------------------

/**
 * Muestro todos los gatitos
 */
const vistaGatitos = async (req, res) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
    // Defino y consologueo el controlador en uso
    const controladorEnUso= 'vistaGatitos';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;

    //consologueo los valores recibidos
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.params) ->`,req.params) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.query) ->`,req.query) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.body) ->`,req.body) : null;

    try {
        (consologuearProceso) ? console.log(`${controladorEnUso} Busco todos los gatitos (con find)...`) : null;
        
        const gatitos = await Cat.find();   // Busco todos los gatitos

        // Verifico si encotre gatitos y consologueo resultado si corresponde
        if (gatitos) {
            (consologuearProceso) ? console.log(`${controladorEnUso} ${gatitos.length} gatitos encontrados`) : null;
        } else {
            (consologuearProceso) ? console.log(`${controladorEnUso} No se encontraron gatitos`) : null;
        };

        res.status(200).json({gatitos});    // Devuelvo todos los gatitos encontrados
    } catch (error) {
        (consologuearError) ? console.log(`${controladorEnUso}, Error: ) -> `, error) : null;
        res.status(400).send({msg: 'Hubo un error al mostrar los gatitos'});          
    };   
};


/**
 * Muestro un gatito
 */
const verUnGatito = async (req, res) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
    // Defino y consologueo el controlador en uso
    const controladorEnUso= 'verUnGatito';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;

    //consologueo los valores recibidos
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.params) ->`,req.params) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.query) ->`,req.query) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.body) ->`,req.body) : null;

    // extraer id del body (es elidentificador unico)
    const { _id } = req.body;
    //console.log(`verUnGatito (req.body) -> ${_id}`);

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    let valorClave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;  
    (consologuearProceso) ? console.log(`${controladorEnUso} (valorClave) -> ${valorClave}`) : null;

    // si no se recuperaron datos de la ruta termino el proceso
    if (!valorClave) {
        (consologuearProceso) ? console.log(`${controladorEnUso} (valorClave) -> ${valorClave} . No se recuperaron datos de Params. Query, o Body`) : null;
        res.status(400).json({ msg: 'No se recuperaron datos de Params. Query, o Body' });
        return;
    };    

    // Por si el dato del _id viene por params o qry,
    // - Verifico que la cadena sea un objeto id valido para mongoose.
    if (!MgObjectId.isValid(valorClave)) {
        (consologuearProceso) ? console.log(`${controladorEnUso}, La cadena (valorClave) no es un ObjetoId valido para Mongoose -> ${valorClave} `) : null;
        res.status(400).json({ msg: 'La cadena (valorClave) no es un ObjetoId valido para Mongoose.' });
        return;
    };
    
    let gato;
    
    try {
        // Verificar si no se paso el id del gatito a bucar.
        if(!valorClave) {
            res.status(400).json({ msg: 'El id es obligatorio' });
            return;
        };
        
        // Verificar si se paso el id en el body
        if (_id ) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            (consologuearProceso) ? console.log(errores) : null;
            if( !errores.isEmpty() ) {
                res.status(400).json({errores: errores.array() });
                return;
            };    
        }; 
        
        //Busco gatipo (por su id), si gato resulta vacio rompe por el catch
        gato = await Cat.findById(valorClave);
        (consologuearProceso) ? console.log(`${controladorEnUso} (gato ${valorClave}) -> ${gato}`) : null;
        
        res.status(200).json({msg: 'Gatito encontrado', gato}); 
        
    } catch (error) {
        (consologuearError) ? console.log(`${controladorEnUso} (gato ${valorClave}, Error: ) -> `, error) : null;
        res.status(400).send({msg: `Hubo un error al buscar el gatito, o el gattito no se encuentra en la base`});
        return;      
    };
    return;
};


/**
 * Creo un gatito nuevo
 */
const crearGatito = async (req, res) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
    // Defino y consologueo el controlador en uso
    const controladorEnUso= 'crearGatito';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;
    
    //consologueo los valores recibidos
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.params) ->`,req.params) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.query) ->`,req.query) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.body) ->`,req.body) : null;

    // extraer name del body (es un identificador unico en este caso)
    const { name } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const nameGato = (name) 
        ? name 
        : (req.params.name)
            ? req.params.name
            : req.query.name
        ;  
    (consologuearProceso) ? console.log(`${controladorEnUso} (nameGato) -> ${nameGato}`) : null;

    try {
        // Verificar si no se paso el name del gatito a bucar.
        if(!nameGato) {
            return res.status(400).json({ msg: 'El nombre es obligatorio' });
        };
        
        // Verificar si se paso el name en el body
        //  - Comprobar si hay errores de Express-Validator con validationResult
        if (name) {
            (consologuearProceso) ? console.log(`${controladorEnUso} Comprobando con Express-Validator si se paso por body...`) : null;
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            //console.log(errores);
            if( !errores.isEmpty() ) {
                //console.log('entre en: !errores.isEmpty()')
                return res.status(400).json({errores: errores.array() });
            };    
        }; 
        
        let kitty  // Defino la variable que contendra al gatito
        
        //-- Si el gatito lo pasaron por params o query
        //   Revisar que el gatito registrado sea unico 
        if (!name) {
            // Revisar que el gatito registrado sea unico 
            (consologuearProceso) ? console.log(`${controladorEnUso} Comprobando si el gato existe si se paso por Params o Query...`) : null;
            (consologuearProceso) ? console.log(`${controladorEnUso} (Buscando si el gato '${nameGato}' existe y llenando resultado en kitty ):`) : null;
            
            kitty = await Cat.findOne({ name: nameGato });  //Busco el gatito
            
            if (consologuearProceso) {
                if (kitty) {
                    console.log(`${controladorEnUso} (gato buscado'${nameGato}', Gato encontrado '${kitty.name}')`);
                    console.log(`${controladorEnUso} (objeto kitty):`,kitty);
                } else {
                    console.log(`${controladorEnUso} (kitty), el ojeto no se ha creado, gatito no encontrado:`,kitty);
                };
            };
           
            // Compruebo el el objeto kitty se haya creado, 
            // Tambien compruebo que su valor (el valor hallado),
            // sea igual al gatino buscado (esto ultimo no es necesario, pero ...)
            if(kitty && kitty.name==nameGato) {
                (consologuearProceso) ? console.log(`${controladorEnUso} (Devuelvo "Estado 200" El gatito ya existe . Buscado '${nameGato}' = Encontrado '${kitty.name}')`) : null;
                return res.status(200).json({ msg: 'El gattito ya existe' });
            };
        }; 
        //--

        // Agrego gatito, si kitty resulta vacio rompe por el catch
        (consologuearProceso) ? console.log(`${controladorEnUso} Creando el gatito...`) : null;
        (consologuearProceso) ? console.log(`${controladorEnUso} (objeto kitty) ->`,kitty) : null;
        
        kitty = new Cat({ name: nameGato });    // Creo el nuevo gatito, segun el modelo.
        const gato = await kitty.save();        // Agrego el gatito a la coleccion.
        
        (consologuearProceso) ? console.log(`${controladorEnUso} (objeto kitty) ->`,kitty) : null;

        res.status(201).json({msg: 'Gatito agregado', gato}); 

    } catch (error) {
        (consologuearError) ? console.log(`${controladorEnUso} (gato ${nameGato}, Error: ) -> `, error) : null;
        res.status(400).send({msg: 'Hubo un error al crear el gatito'});   
    };
};


/**
 * Modifico un gatito
 */
const editarGatito = async (req, res) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
    // Defino y consologueo el controlador en uso
    const controladorEnUso= 'editarGatito';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;

    //consologueo los valores recibidos
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.params) ->`,req.params) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.query) ->`,req.query) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.body) ->`,req.body) : null;

    // extraer id del body (es elidentificador unico)
    const { _id, name } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const valorClave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;
    (consologuearProceso) ? console.log(`${controladorEnUso} (valorClave) -> ${valorClave}`) : null;

    // Almeceno el valor del name, si se paso por algun metodo (body, query, params)
    const valorNombre = (name) 
        ? name 
        : (req.params.name)
            ? req.params.name
            : req.query.name
        ;  
    (consologuearProceso) ? console.log(`${controladorEnUso} (valorNombre) -> ${valorNombre}`) : null;

    let gato;
    let editarGato;

    try {
        // Verificar si no se paso el id del gatito a bucar.
        if(!valorClave) {
            return res.status(400).json({ msg: 'El id es obligatorio' });
        };
        
        // Por si el dato del _id viene por params o qry,
        // - Verifico que la cadena sea un objeto id valido para mongoose.
        if (!MgObjectId.isValid(valorClave)) {
            (consologuearProceso) ? console.log(`${controladorEnUso}, La cadena (valorClave) no es un ObjetoId valido para Mongoose -> ${valorClave} `) : null;
            res.status(400).json({ msg: 'La cadena (valorClave) no es un ObjetoId valido para Mongoose.' });
            return;
        };
        
        // Verificar si no se paso el nuevo nombre del gatito a bucar.
        if(!valorNombre) {
            return res.status(400).json({ msg: 'El nuevo nombre es obligatorio' });
        };

        // Verificar si se paso el nombre en el body (si no usara params o qry en las rutas (_id || name))
        //  - Comprobar si hay errores de Express-Validator con validationResult
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
        (consologuearError) ? console.log(`${controladorEnUso} (gato ${valorClave}, Error: ) -> `, error) : null;
        res.status(400).send({msg: 'Hubo un error al buscar el gatito, o el gattito no se encuentra en la base'});      
    };
};


/**
 * Elimino un gatito
 */
const elininarGatito = async (req, res) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
    // Defino y consologueo el controlador en uso
    const controladorEnUso= 'elininarGatito';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;

    //consologueo los valores recibidos
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.params) ->`,req.params) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.query) ->`,req.query) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.body) ->`,req.body) : null;

    // extraer id del body (es elidentificador unico)
    const { _id, } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const valorClave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;    
    (consologuearProceso) ? console.log(`elininarGatito (valorClave) -> ${valorClave}`) : null;

    try {
    
        // Verificar si no se paso el id del gatito a eliminar.
        if(!valorClave) {
            return res.status(400).json({ msg: 'No existen parametros validos para esta operacion' });
        };
        
        // Por si el dato del _id viene por params o qry,
        // - Verifico que la cadena sea un objeto id valido para mongoose.
        if (!MgObjectId.isValid(valorClave)) {
            (consologuearProceso) ? console.log(`${controladorEnUso}, La cadena (valorClave) no es un ObjetoId valido para Mongoose -> ${valorClave} `) : null;
            res.status(400).json({ msg: 'La cadena (valorClave) no es un ObjetoId valido para Mongoose.' });
            return;
        };
        
        // Verificar si se paso el id en el body
        //  - Comprobar si hay errores de Express-Validator con validationResult
        if (_id) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            if( !errores.isEmpty() ) {
                return res.status(400).json({errores: errores.array() });
            };    
        }; 
        
        // Eliminar un gatito por su id, si gato resulta vacio rompe por el catch
        const gato = await Cat.findByIdAndDelete( valorClave );
        (consologuearProceso) ? console.log(`${controladorEnUso} (Gatito Eliminado) -> `, gato) : null;
        
        res.status(200).json({msg: 'Gatito Eliminado', gato});   

    } catch (error) {
        (consologuearError) ? console.log(`${controladorEnUso} (gato ${valorClave}, Error: ) -> `, error) : null;
        res.status(400).send({msg: 'Hubo un error al eliminar el gatito'});
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
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
    // Defino y consologueo el controlador en uso
    const controladorEnUso= 'apiCatInfo';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;

     try {
         const contenido = catInfo();
         res.send(contenido);    
     } catch (error) {
        (consologuearError) ? console.log(`Error al mostrar la iformacion de la api, Error: ) -> `, error) : null
        res.status(400).send({msg: 'Hubo un error'});    
     };
 };




// -------------------------------------------------
// Inicio - Funciones para prueba del crud por Axios
// -------------------------------------------------

/**
 * Muestro pagina para la prueba de la api con Axios:
 * - Este controlador muestra una pagina con instrucciones para probar las api de la coleccion Cats.
 *   - Se pueden probar los metodos GET, POST, PUT y DELETE 
 *   - Se le puede pasar los valores por Params, Query, o Body
 */
 const {catPrueba} = require('../PaginasJs/catsPrueba');
 const apiCatPrueba = async (req, res) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
    // Defino y consologueo el controlador en uso
    const controladorEnUso= 'apiCatPrueba';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;

     try {
         const contenido = catPrueba();
         res.send(contenido);    
     } catch (error) {
        (consologuearError) ? console.log(`Error al mostrar la pagina de prueba (por Axios) de la api, Error: ) -> `, error) : null
        res.status(400).send({msg: 'Hubo un error al mostrar la pagina'});    
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
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
    // Defino y consologueo el controlador en uso
    const controladorEnUso= 'catResultado';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;

    //const myAction = req.params.accion;
    //const myValues = req.params.listaDeValores;
    
    const { accion, listaDeValores } = req.body;

    const myAction = (accion) 
        ? accion 
        : (req.params.accion)
            ? req.params.accion
            : req.query.accion
        ;    
    (consologuearProceso) ? console.log(`${controladorEnUso} -> (accion): `,myAction) : null;

        const myValues = (listaDeValores) 
        ? listaDeValores 
        : (req.params.listaDeValores)
            ? req.params.listaDeValores
            : req.query.listaDeValores
        ;  
    (consologuearProceso) ? console.log(`${controladorEnUso} -> (listaDeValores): `,myValues) : null;  

    // Valido el parametro lista de valores.
    if (myValues && !IsJsonString(myValues)) {
        res.send({msg: "Los valores pasados en el parametro 'listaDeValores' no son validos. "} );
        return;    
    };

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
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Buscando el contenido por Params: `,TYPES.verPorParams) : null;
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
                                                                                        (consologuearError) ? console.log(`${controladorEnUso} (responder) -> Error al recuperar los datos.`,error) : null;
                                                                                        res.send('Error al recuperar los datos.');
                                                                                    };
                                                                                    return;
                                                                                    }
                                                );
                return;

            case TYPES.verPorQry:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Buscando el contenido por Qry: `,TYPES.verPorQry) : null;
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
                                                            (consologuearError) ? console.log(`${controladorEnUso} (responder) -> Error al recuperar los datos.`,error) : null;
                                                            res.send('Error al recuperar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;                
            
            case TYPES.verPorBody:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Buscando el contenido por Body: `,TYPES.verPorBody) : null;
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
                                                            (consologuearError) ? console.log(`${controladorEnUso} (responder) -> Error al recuperar los datos.`,error) : null;
                                                            res.send('Error al recuperar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.creaPorParams:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Creando un nuevo gatito por Params: `,TYPES.creaPorParams) : null;
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
                                                            (consologuearError) ? console.log(`${controladorEnUso} (responder) -> Error al crear los datos.`,error) : null;
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.crearPorQry:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Creando un nuevo gatito por Qry: `,TYPES.crearPorQry) : null;
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
                                                            (consologuearError) ? console.log(`${controladorEnUso} (responder) -> Error al crear los datos.`,error) : null;
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.crearPorBody:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Creando un nuevo gatito por Body: `,TYPES.crearPorBody) : null;
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
                                                            (consologuearError) ? console.log(`${controladorEnUso} (responder) -> Error al crear los datos.`,error) : null;
                                                            res.send('Error al crear los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.editarPorParams:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Editando un gatito por Params: `,TYPES.editarPorParams) : null;
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
                                                            (consologuearError) ? console.log(`${controladorEnUso} (responder) -> Error al editar los datos.`,error) : null;
                                                            res.send('Error al editar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.editarPorQry:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Editando un gatito por Qry: `,TYPES.editarPorQry) : null;
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
                                                            (consologuearError) ? console.log(`${controladorEnUso} (responder) -> Error al editar los datos.`,error) : null;
                                                            res.send('Error al editar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.editarPorBody:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Editando un gatito por Body: `,TYPES.editarPorBody) : null;
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
                                                            (consologuearError) ? console.log(`${controladorEnUso} (responder) -> Error al editar los datos.`,error) : null;
                                                            res.send('Error al editar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.eliminarPorParams:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Eliminando un gatito por Params: `,TYPES.eliminarPorParams) : null;
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
                                                            (consologuearError) ? console.log(`${controladorEnUso} (responder) -> Error al eliminar los datos.`,error) : null;
                                                            res.send('Error al eliminar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.eliminarPorQry:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Eliminando un gatito por Qry: `,TYPES.eliminarPorQry) : null;
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
                                                            (consologuearError) ? console.log(`${controladorEnUso} (responder) -> Error al eliminar los datos.`,error) : null;
                                                            res.send('Error al eliminar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            case TYPES.eliminarPorBody:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Eliminando un gatito por Body: `,TYPES.eliminarPorBody) : null;
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
                                                            (consologuearError) ? console.log(`${controladorEnUso} (responder) -> Error al eliminar los datos.`,error) : null;
                                                            res.send('Error al eliminar los datos.');
                                                        };
                                                        return;
                                                        }
                                            );
                return;

            default:
                contenido='Accion desconocida.'
                (consologuearProceso) ? console.log(`${controladorEnUso} -> switch default: `,contenido) : null;
                return res.send(contenido);    
        };
        return;
    } catch (error) {
        (consologuearError) ? console.log({msg: `Hubo un error en el controlador (${controladorEnUso}) en la rura /resultado...`,error}) : null;
        res.status(400).send({msg: `Hubo un error en el controlador (${controladorEnUso}) en la rura /resultado...`,error});  
    };
};

// ----------------------------------------------
// Fin - Funciones para prueba del crud por Axios
// ----------------------------------------------



//---------------------------------------------------
// Inicio - Funciones Auxiliares para la validaciones
//---------------------------------------------------

function IsJsonString(str) {
    try {
      var json = JSON.parse(str);
      return (typeof json === 'object');
    } catch (e) {
      return false;
    };
  };

//------------------------------------------------
// Fin - Funciones Auxiliares para la validaciones
//------------------------------------------------



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
