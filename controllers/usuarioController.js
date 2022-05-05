/**
 *  Importo las dependencias.
 */  
const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const {usuariosInfo} = require('../PaginasJs/usuarios');


//Defino que envio a la consola
let consologuearProcesos = true;
let consologuearErrores = true;


// --------------------------------------
// Inicio - CRUD de la colleccion Usuarios
// --------------------------------------

/**  
 * Mostrar todos los usuarios 
 * */
 const mostrarUsuarios = async (req, res) => {
    const consologuearProceso = consologuearProcesos; //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;    //Valores (true, false) PorDefecto = consologuearErrores 
    (consologuearProceso) ? console.log('* Controlador: mostrarUsuarios...') : null;
    
    try {
        // cargar usuarios
        let usuario = await Usuario.find();

        res.status(200).json(usuario);

    } catch (error) {
        (consologuearProceso) ? console.log({msg: 'Hubo un error al leer los usuarios'},error) : null;
        res.status(400).send({msg: 'Hubo un error al leer los usuarios'},error);
    };
  };


/**  
 * Mostrar un usuario por id 
 * */
 const mostrarUnUsuario = async (req, res) => {
    const consologuearProceso = consologuearProcesos; //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;    //Valores (true, false) PorDefecto = consologuearErrores 
    const controladorEnUso= 'mostrarUnUsuario';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;

    //consologueo los valores recibidos
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.params) ->`,req.params) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.query) -> `,req.query) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.body) -> `,req.body) : null;

    // Extraer datos del body (_id, email son identificadores unico)
    const { _id, nombre, email, password } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const valorClave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;    
    (consologuearProceso) ? console.log(`${controladorEnUso} (valorClave) -> `,valorClave) : null;
    
    try {
        // Verificar si no se paso el id 
        if(!valorClave) {
            return res.status(400).json({ msg: 'El email es obligatorio' });
        };
        
        // Verificar si se paso el id en el body
        if (_id) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            if( !errores.isEmpty() ) {
                return res.status(400).json({errores: errores.array() });
            };    
        };

        // Buscar usuarios, si myUusuario resulta vacio rompe por el catch
        let myUusuario = await Usuario.findById( valorClave );

        res.status(200).json(myUusuario);

    } catch (error) {
        //console.log({msg: 'Hubo un error al leer los usuarios'},error);
        res.status(400).send({msg: 'Hubo un error al leer los usuarios'},error);
    };
  };


/** 
 * Crear Usuario Nuevo 
 */
const crearUsuario = async (req, res) => {
    const consologuearProceso = consologuearProcesos; //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;    //Valores (true, false) PorDefecto = consologuearErrores
    const controladorEnUso = 'crearUsuario';
    //console.log(`* Controlador: ${controladorEnUso}...`);
    //console.log('consologuearProceso -> ',consologuearProceso);
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;

    //consologueo los valores recibidos
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.params) ->`,req.params) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.query) -> `,req.query) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.body) -> `,req.body) : null;

    // Extraer datos del body (email es un identificador unico)
    const { _id, nombre, email, password } = req.body;

    // Almeceno el valor del email, si se paso por algun metodo (body, query, params)
    const emailUsuario = (email) 
                        ? email 
                        : (req.params.email)
                            ? req.params.email
                            : req.query.email
                        ;    
    (consologuearProceso) ? console.log(`${controladorEnUso} (emailUsuario) -> `,emailUsuario) : null;

    try {
        // Verificar si no se paso el email 
        if(!emailUsuario) {
            return res.status(400).json({ msg: 'El email es obligatorio' });
        };
        
        // Verificar si se paso el mail o el usuario en el body
        //  - Comprobar si hay errores con validationResult
        if (email || nombre) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            //console.log(errores);
            if( !errores.isEmpty() ) {
                //console.log('entre en: !errores.isEmpty()')
                return res.status(400).json({errores: errores.array() });
            };    
        } else {
            return res.status(400).json({ msg: 'El usuario solo puede ser creado pasando todos sus datos en el body' });
        }; 

        let newUsuario  // Defino la variable que contendra el Usuario

        //-- Si el Usuario lo pasaron por params o query
        //    - Revisar que el Usuario registrado sea unico
        //    - Esta ocion la dejo abierta por si mas adelante decido crear una ruta para esto. 
        if (!email || !nombre) {
            // Revisar que el Usuario registrado sea unico 
            (consologuearProceso) ? console.log(`Comprobando si el ususrio existe y si se paso por Params o Query...`) : null;
            (consologuearProceso) ? console.log(`${controladorEnUso} (Buscando si el usuario '${emailUsuario}' existe y llenando resultado en newUsuario ):`) : null;
            
            newUsuario = await Usuario.findOne({ email: emailUsuario });
            
            if (consologuearProceso) {
                if (newUsuario) {
                    console.log(`${controladorEnUso} (Usuario  buscado'${emailUsuario}', Usuario encontrado '${newUsuario.email}')`);
                    console.log(`${controladorEnUso} (objeto newUsuario):`,newUsuario);
                } else {
                    console.log(`crearUsuario (newUsuario), el ojeto no se ha creado, Usuario no encontrado:`,newUsuario);
                };
            };
           
            // Compruebo el el objeto newUsuario se haya creado. 
            // Tambien compruebo que su valor (el valor hallado),
            // sea igual al email buscado (esto ultimo no es necesario, pero ...)
            if(newUsuario && newUsuario.email==email) {
                (consologuearProceso) ? console.log(`${controladorEnUso} (Devuelvo "Estado 200" El Usuario ya existe . Buscado '${emailUsuario}' = Encontrado '${newUsuario.email}')`) : null;
                return res.status(200).json({ msg: 'El Usuario ya existe' });
            };
        }; 
        //--

        // Crea el nuevo usuario
        newUsuario = new Usuario(req.body);

        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        newUsuario.password = await bcryptjs.hash(password, salt );

        // guardar usuario, si newUsuario resulta vacio rompe por el catch
        await newUsuario.save();

        res.status(201).json({msg: 'Se ha creado un nuevo usuario'}); 

    } catch (error) {
        //console.log({msg:'Hubo un error al crear el nuevo usuario',error});
        res.status(400).send({msg: 'Hubo un error al crear el nuevo usuario',error});
    };
};


/**
 * Modifico un Usuario
 */
 const editarUsuario = async (req, res) => {
    const consologuearProceso = consologuearProcesos; //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;    //Valores (true, false) PorDefecto = consologuearErrores     
    const controladorEnUso= 'editarUsuario';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;

    //consologueo los valores recibidos
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.params) ->`,req.params) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.query) -> `,req.query) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.body) -> `,req.body) : null;

    // Extraer datos del body (_id, email son identificadores unico)
    const { _id, nombre, email, password } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const valorClave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
            ;
    (consologuearProceso) ? console.log(`${controladorEnUso} (valorClave) -> `,valorClave) : null;    

    let editarUsuario;

    try {
        // Verificar si no se paso el id 
        if(!valorClave) {
            return res.status(400).json({ msg: 'El id es obligatorio' });
        };
        
        // Verificar si se paso el id en el body
        if ( _id || nombre || email || password) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);

            if( !errores.isEmpty() ) {
                return res.status(400).json({errores: errores.array() });
            };    
        } else {
            return res.status(400).json({ msg: 'El usuario solo puede ser modificado pasando todos sus datos en el body' });
        };
        
        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        const mypassword = await bcryptjs.hash(password, salt );

        // Armo el objeto Modificado (para modificar el usuario).
        editarUsuario = req.body;
        editarUsuario={
                        _id: valorClave,
                        nombre: nombre,
                        email:email,
                        password: mypassword
                        };  
        
        // Modifico el usuario, si usuario resulta vacio rompe por el catch
        const usuario = await Usuario.findByIdAndUpdate( valorClave, editarUsuario );

        res.status(200).json({msg: `Usuario editado:${usuario}`, editarUsuario}); 

    } catch (error) {
        res.status(400).send({msg: 'Hubo un error al buscar el usuario, o el usuario no se encuentro en la base',error});      
    };
};


/**
 * Elimina un Usuario por _id 
 */
const eliminarUsuario = async (req, res) => {
    const consologuearProceso = consologuearProcesos; //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;    //Valores (true, false) PorDefecto = consologuearErrores
    const controladorEnUso= 'eliminarUsuario';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;
    
    //consologueo los valores recibidos
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.params) ->`,req.params) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.query) -> `,req.query) : null;
    (consologuearProceso) ? console.log(`${controladorEnUso} (req.body) -> `,req.body) : null;

    // Extraer id y email (ambos son identificadores unicos)
    const { _id, email } = req.body;
    
    // Almecenar el valor del id, si se paso por algun metodo (body, query, params)
    const valorclave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;
    (consologuearProceso) ? console.log(`${controladorEnUso} (valorclave) -> `,valorclave) : null;

    try {
        // Verificar si no se paso el id del usuario a eliminar.
        if(!valorclave) {
            return res.status(400).json({ msg: 'No existen parametros validos para esta operacion' });
        }
        
        // Verificar si se paso el id en el body    
        if (_id) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            if( !errores.isEmpty() ) {
                return res.status(400).json({errores: errores.array() })
            };    
        };
        
        // Eliminar , si myUsuario resulta vacio rompe por el catch
        const myUsuario = await Usuario.findByIdAndDelete( valorclave );

        res.status(200).json({msg: 'Usuario Eliminado', myUsuario}); 
        
    } catch (error) {
        //console.log(error);
        res.status(400).send({msg: 'Hubo un error al eliminar el usuario',error});
    };
};

// ------------------------------------
// Fin - CRUD de la colleccion Usuarios
// ------------------------------------




/**
 * Muestro informacion de la api:
 * Este controlador muestra una pagina con informacion de apoyo para el uso de las api de la coleccion Usuarios.
 */
 const apiUserInfo = async (req, res) => {
    const consologuearProceso = consologuearProcesos; //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;    //Valores (true, false) PorDefecto = consologuearErrores
    const controladorEnUso= 'apiUserInfo'
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;
    
    try {
        const contenido = usuariosInfo();
        res.send(contenido);    
    } catch (error) {
        res.status(400).send({msg: 'Hubo un error'},error);    
    };

};









module.exports = {
                    apiUserInfo,   
                    mostrarUsuarios,
                    mostrarUnUsuario,
                    crearUsuario,
                    editarUsuario,
                    eliminarUsuario    
                }










