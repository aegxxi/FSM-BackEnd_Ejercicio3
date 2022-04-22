/**
 *  Importo las dependencias.
 */  
const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const {usuariosInfo} = require('../PaginasJs/usuarios');


/**
 *  Muestro api info 
 */
const apiUserInfo = async (req, res) => {
    
    try {
        const contenido = usuariosInfo();
        res.send(contenido);    
    } catch (error) {
        res.status(400).send({msg: 'Hubo un error'},error);    
    };

};


/**  
 * Mostrar todos los usuarios 
 * */
 const mostrarUsuarios = async (req, res) => {
    //res.send('respond with a resource');
    try {
        // cargar usuarios
        let usuario = await Usuario.find();

        res.status(200).json(usuario);

    } catch (error) {
        console.log({msg: 'Hubo un error al leer los usuarios'},error);
        res.status(400).send({msg: 'Hubo un error al leer los usuarios'},error);
    };
  };


/**  
 * Mostrar un usuario por id 
 * */
 const mostrarUnUsuario = async (req, res) => {
    // _Extraer datos del body (_id, email son identificadores unico)
    const { _id, nombre, email, password } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const valorClave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;    

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
    // _Extraer datos del body (email es un identificador unico)
    const { _id, usuario, email, password } = req.body;

    // Almeceno el valor del email, si se paso por algun metodo (body, query, params)
    const emailUsuario = (email) 
        ? email 
        : (req.params.email)
            ? req.params.email
            : req.query.email
        ;    

    try {
        // Verificar si no se paso el email 
        if(!emailUsuario) {
            return res.status(400).json({ msg: 'El email es obligatorio' });
        };
        
        // Verificar si se paso el mail o el usuario en el body
        if (email || usuario) {
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
        
        // Revisar que el usuario registrado sea unico
        let newUsuario = await Usuario.findOne({ email });

        if(newUsuario) {
            return res.status(400).json({ msg: 'El usuario ya existe en esta base' });
        }

        // crea el nuevo usuario
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
    // _Extraer datos del body (_id, email son identificadores unico)
    const { _id, nombre, email, password } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const valorClave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;    
    
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
    // Extraer id y email (ambos son identificadores unicos)
    const { _id, email } = req.body;
    
    // Almecenar el valor del id, si se paso por algun metodo (body, query, params)
    const valorclave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;

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



module.exports = {
                    apiUserInfo,   
                    mostrarUsuarios,
                    mostrarUnUsuario,
                    crearUsuario,
                    editarUsuario,
                    eliminarUsuario    
                }










