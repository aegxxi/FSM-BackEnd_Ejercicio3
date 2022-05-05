const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
//const {apiLoguinInfo} = require('../PaginasJs/usuarios');


// Defino que envio a la consola (Global)
let consologuearProcesos = true;
let consologuearErrores = true;
// (Local), en cada controlador se puede usar el valor global, o definir el valor 
    // const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos
    // const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores



let cookieNombre = '';   // Establezco la variable que contendra el nombre de la cookie de session



/**
 *  Muestro api info 
 */
 const apiLoguinInfo = async (req, res) => {
     // Defino que envio a la consola (Local)
     const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
     const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
     // Defino y consologueo el controlador en uso
     const controladorEnUso= 'apiLoguinInfo';
     (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;
    
    try {
        const contenido = usuariosInfo();
        res.send(contenido);    
    } catch (error) {
        res.status(400).send({msg: 'Hubo un error'},error);    
    };

};




/**
 *  Compruebo el Usuario e Inicio Session
 */
 const loguinUsuarios = async (req, res) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
    // Defino y consologueo el controlador en uso
    const controladorEnUso= 'loguinUsuarios';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;

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
        
        let UsuarioEncontrado = {}  // Establezco la variable que contendra el objeto del usuario encontrado

        // Buscando el usuario por su mail
        (consologuearProceso) ? console.log(`${controladorEnUso} Comprobando si el usuario existe...`) : null;
        (consologuearProceso) ? console.log(`${controladorEnUso} (Buscando si el usuario  '${emailUsuario}' existe y llenando resultado en kitty ):`) : null;
        
        UsuarioEncontrado = await Cat.findOne({ email: emailUsuario });  //Busco el usuario por su mail
        
        // Verifico si se encontro al usuario, y consologueo resultado si corresponde
        if (consologuearProceso) {
            if (UsuarioEncontrado) {
                console.log(`${controladorEnUso} (usuario buscado'${emailUsuario}', usuario encontrado '${UsuarioEncontrado.email}')`);
                console.log(`${controladorEnUso} (objeto kitty):`,UsuarioEncontrado);
            } else {
                console.log(`${controladorEnUso} (UsuarioEncontrado), el ojeto no se ha creado, usuario no encontrado:`,UsuarioEncontrado);
            };
        };
       
        // Compruebo el el objeto UsuarioEncontrado se haya creado, 
        // Tambien compruebo que su valor (el valor hallado),
        // sea igual al usuario buscado (esto ultimo no es necesario, pero ...)
        if( !UsuarioEncontrado || UsuarioEncontrado.email !== emailUsuario ) {
            (consologuearProceso) ? console.log(`${controladorEnUso} (Devuelvo "Estado 400" El usuario ha sido encontrado, Buscado '${emailUsuario}' => Encontrado '${UsuarioEncontrado.email}')`) : null;
            res.status(400).json({ msg: 'El usuario no ha sido encontrado, el mail es incorrecto.' }); 
            return;
        };
        
        if ( !bcryptjs.compare( UsuarioEncontrado.password, password ) ) {
            (consologuearProceso) ? console.log(`${controladorEnUso} La contraseña es incorrecta, Password Igresado '${password}'`) : null;
            res.status(200).json({ msg: 'La contraseña es incorrecta.' });
            return;
        };

        const usuarioLogueado = {
            UsuarioId: UsuarioEncontrado._id,
            UsuarioEmail: UsuarioEncontrado.email,
            UsuarioEmail: UsuarioEncontrado.nombre
        };
        (consologuearProceso) ? console.log(`${controladorEnUso} Objeto creado para la Session (usuarioLogueado)`,usuarioLogueado) : null;
        
        
        //creo session y cookie
        req.session.user = usuarioLogueado;     // Creo la Session
        cookieNombre = 'Dts_' + nombre
        res.cookie( cookieNombre, req.session.user, { maxAge:800000 } );  // Creo la cookie


        res.status(201).json({ msg: 'Usuario Logueado.' });     
    } catch (error) {
        res.status(400).send({msg: 'Hubo un error'},error);    
    };

};


/**
 *  Cierro la  Session del Usuario
 */
const logautUsuarios = async (req, res) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
    // Defino y consologueo el controlador en uso
    const controladorEnUso= 'logautUsuarios';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;
    
    res.clearcookie(cookieNombre)
    req.session.destroy
    res.status(200).json({ msg: 'Sesion cerrada.' });
};




module.exports = {
                    apiLoguinInfo,
                    loguinUsuarios,
                    logautUsuarios    
                }


