/**
 *  Importo las dependencias.
 */  
const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');


// Muestro api info
const {usuariosInfo} = require('../PaginasJs/usuarios');

const apiUserInfo = async (req, res) => {
    const contenido = usuariosInfo();
    res.send(contenido);
}


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
    }
  };


/**  
 * Mostrar un usuario id 
 * */
 const mostrarUnUsuario = async (req, res) => {

    try {
        // cargar usuarios
        let usuario = await Usuario.findOne( _id = req.body.id );

        res.status(200).json(usuario);

    } catch (error) {
        console.log({msg: 'Hubo un error al leer los usuarios'},error);
        res.status(400).send({msg: 'Hubo un error al leer los usuarios'},error);
    }
  };


/** 
 * Crear Usuario Nuevo 
 */
const crearUsuario = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    };

    // extraer email y password
    const { email, password } = req.body;

    try {
        // Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({ email });

        if(usuario) {
            return res.json({ msg: 'El usuario ya existe' });
        }

        // crea el nuevo usuario
        usuario = new Usuario(req.body);

        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt );


        // guardar usuario
        await usuario.save();
        //console.log('Se ha creado un nuevo usuario');
        res.status(201).json({msg: 'Se ha creado un nuevo usuario'}); 

    } catch (error) {
        //console.log({msg:'Hubo un error al crear el nuevo usuario',error});
        res.status(400).send({msg: 'Hubo un error al crear el nuevo usuario',error});
    }
};


// Elimina un Usuario por _id
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
            return res.status(400).json({ msg: 'no existen parametros validos para esta operacion' });
        }
        
        // Verificar si se paso el id en el body    
        if (_id) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            if( !errores.isEmpty() ) {
                return res.status(400).json({errores: errores.array() })
            };    
        };
        
        // Eliminar (si el id no existiera, devuelve usuario vacio )
        const usuario = await Usuario.findByIdAndDelete( valorclave );
        
        //  Verifico si el usuario eliminado existia
        if (usuario) {
            res.status(200).json({msg: 'Usuario Eliminado', usuario}); 
        } else {
            res.status(400).json({msg: `No hay un usuario con este id:${valorclave}`, usuario});
        };

    } catch (error) {
        //console.log(error);
        res.status(400).send({msg: 'Hubo un error al eliminar el usuario',error});
    }
}



module.exports = {
                    apiUserInfo,   
                    mostrarUsuarios,
                    crearUsuario,
                    eliminarUsuario    
                }










