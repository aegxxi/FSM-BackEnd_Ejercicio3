//const res = require('express/lib/response');
//const { response } = require('../app');

const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const { Info } = require('../PaginasJs/loguin');
const { json } = require('express/lib/response');



// Defino que envio a la consola (Global)
let consologuearProcesos = true;
let consologuearErrores = false;
// (Local), en cada controlador se puede usar el valor global, o definir el valor 
    // const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos
    // const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores



let cookieNombre = '';   // Establezco la variable que contendra el nombre de la cookie de session



/**
 *  Muestro api info 
 */
 const apiloguinInfo = async (req, res) => {
     // Defino que envio a la consola (Local)
     const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
     const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
     // Defino y consologueo el controlador en uso
     const controladorEnUso= 'apiLoguinInfo';
     (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;
    
    try {
        const contenido = Info();
        res.status(200).send(contenido);    
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
    const { email, password } = req.body;

    // Almeceno el valor del email, si se paso por algun metodo (body, query, params)
    const emailUsuario = (email) 
                        ? email 
                        : (req.params.email)
                            ? req.params.email
                            : req.query.email
                        ;    
    (consologuearProceso) ? console.log(`${controladorEnUso} (emailUsuario) -> `,emailUsuario) : null;

    const passwordUsuario = (password) 
                        ? password 
                        : (req.params.password)
                            ? req.params.password
                            : req.query.password
                        ;    
    (consologuearProceso) ? console.log(`${controladorEnUso} (passwordUsuario) -> `,passwordUsuario) : null;
    
    try {
        // Verificar si no se paso el email o el password
        if(!emailUsuario || !password) {
            res.status(200).json({ msg: 'El email y la contraseña son obligatorios' });
            return;
        };
        
         
        // Verificar si se paso el mail y el password en el body
        //  - Comprobar si hay errores con validationResult
        if (email || password) {
            (consologuearProceso) ? console.log(`${controladorEnUso} Comprbando los campos del body segun el modelo de la coleccion usuario con validationResult... `) : null;
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            //console.log(errores);
            if( !errores.isEmpty() ) {
                (consologuearProceso) ? console.log(`${controladorEnUso} validationResult encontro errores... `,errores.array()) : null;
                res.status(200).json({errores: errores.array() });
                return;
            };    
        } else {
            (consologuearProceso) ? console.log(`${controladorEnUso} No se pasaron los valores en el boby. No es posible loguearse... `,errores.array()) : null;
            res.status(200).json({ msg: 'El usuario solo puede ser validado pasando todos sus datos en el body' });
            return;
        }; 
        

        (consologuearProceso) ? console.log(`${controladorEnUso} Establezco la variable que contendra el objeto del usuario encontrado ... `) : null;
        let usuarioEncontrado = {};  // Establezco la variable que contendra el objeto del usuario encontrado
        
        // Buscando el usuario por su mail
        (consologuearProceso) ? console.log(`${controladorEnUso} Comprobando si el usuario '${emailUsuario}' existe...`) : null;
        
        usuarioEncontrado = await Usuario.findOne({ email: emailUsuario });  //Busco el usuario por su mail

        // Verifico si se encontro al usuario, y consologueo resultado si corresponde
        if (consologuearProceso) {
            if (usuarioEncontrado) {
                console.log(`${controladorEnUso} (usuario buscado'${emailUsuario}', usuario encontrado '${usuarioEncontrado.email}')`);
                console.log(`${controladorEnUso} (objeto usuarioEncontrado):`,usuarioEncontrado);
            } else {
                console.log(`${controladorEnUso} (usuarioEncontrado), el ojeto no se ha creado, usuario no encontrado:`,usuarioEncontrado);
            };
        };
       
        // Compruebo el el objeto usuarioEncontrado se haya creado, 
        // Tambien compruebo que su valor (el valor hallado),
        // sea igual al usuario buscado (esto ultimo no es necesario, pero ...)
        (consologuearProceso) ? console.log(`${controladorEnUso} Compruebo el el objeto usuarioEncontrado se haya creado...`) : null;
        if( !usuarioEncontrado || usuarioEncontrado.email !== emailUsuario ) {
            (consologuearProceso) ? console.log(`${controladorEnUso} (Devuelvo "Estado 400" El usuario ha sido encontrado, Buscado '${emailUsuario}' => Encontrado '${usuarioEncontrado.email}')`) : null;
            res.status(200).json({ msg: 'El usuario no ha sido encontrado, el mail es incorrecto.' }); 
            return;
        };
        
        (consologuearProceso) ? console.log(`${controladorEnUso} Compruebo la contraseña...`) : null;
        if ( !bcryptjs.compare( usuarioEncontrado.password, password ) ) {
            (consologuearProceso) ? console.log(`${controladorEnUso} La contraseña es incorrecta, Password Igresado '${password}'`) : null;
            res.status(200).json({ msg: 'La contraseña es incorrecta.' });
            return;
        };

        (consologuearProceso) ? console.log(`${controladorEnUso} Creo el objeto con los datos de session...`) : null;
        const usuarioLogueado = {
            usuarioId: usuarioEncontrado._id,
            usuarioEmail: usuarioEncontrado.email,
            usuarioNombre: usuarioEncontrado.nombre
        };
        (consologuearProceso) ? console.log(`${controladorEnUso} Objeto creado para la Session (usuarioLogueado)`,usuarioLogueado) : null;
        
        
        // Creo session y cookie
        (consologuearProceso) ? console.log(`${controladorEnUso} Creo session y cookie...`) : null;
        
        req.session.usuario = usuarioLogueado;     // Creo la Session
        
        //(consologuearProceso) ? console.log(`${controladorEnUso} Sesion (req.session.usuario): `,req.session.usuario) : null;
        (consologuearProceso) ? console.log(`${controladorEnUso} Sesion (req.session): `,req.session) : null;
        
        //cookieNombre = 'Dts_' + nombre;
        res.cookie( 'sessionUsuario', req.session.usuario, { maxAge:800000000 } );  // Creo la cookie
        (consologuearProceso) ? console.log(`${controladorEnUso} Cookie sessionUsuario (req.cookies.sessionUsuario): `,req.cookies.sessionUsuario) : null;


        res.status(201).json({ msg: 'Usuario Logueado.' });     
    } catch (error) {
        //res.status(400).send({msg: 'Hubo un error'},error);
        res.send({msg: 'Hubo un error'});    
    };

};


/**
 *  Cierro la  Session del Usuario
 */
const logoutUsuarios = async (req, res) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
    // Defino y consologueo el controlador en uso
    const controladorEnUso= 'logoutUsuarios';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;
    
    //res.clearCookie('sessionUsuario');
    res.cookie( 'sessionUsuario', '', { maxAge:0 } );  // Reescribo la cookie para eliminarla
    //res.clearcookie('Dts_usuario');
    req.session.destroy;
    res.status(200).json({ msg: 'Sesion cerrada.' });
};



/**
 *  Consulto la session objeto 'usuario'
 */
 const consultarSession = (req, res) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
    // Defino y consologueo el controlador en uso
    const controladorEnUso= 'consultarSession';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;   
    
    (consologuearProceso) ? console.log(` ${controladorEnUso} req.session: `,req.session) : null; 
    (req.session.usuario) ? res.json(req.session.usuario) : res.json({ msg: 'No existe el objeto [usuario] dentro del objeto [session].' });
    return;
}

/**
 *  Consulto la cookie 'sessionUsuario'
 */
const consultarCookie = (req, res) => {
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
    // Defino y consologueo el controlador en uso
    const controladorEnUso= 'consultarCookie';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;   
    
    (consologuearProceso) ? console.log(` ${controladorEnUso} req.cookies.sessionUsuario: `,req.cookies.sessionUsuario) : null;
    (req.cookies.sessionUsuario) ? res.json(req.cookies.sessionUsuario) : res.json({ msg: 'No existe la cookie [sessionUsuario].' });
    return;
}



//-------------------------------------------------------
// Inicio - Controlador para manejar la session por Axios
//-------------------------------------------------------

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
 function loguinResultado(req, res){
    // Defino que envio a la consola (Local)
    const consologuearProceso = consologuearProcesos;   //Valores (true, false) PorDefecto = consologuearProcesos 
    const consologuearError = consologuearErrores;      //Valores (true, false) PorDefecto = consologuearErrores
    // Defino y consologueo el controlador en uso
    const controladorEnUso= 'loguinResultado';
    (consologuearProceso) ? console.log(`* Controlador: ${controladorEnUso}...`) : null;
    
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

    const {TYPES} = require('../consultas/loguinAxiosAccion');
    const { ingresarSession,
            salirSession} = require('../consultas/consultasAxiosSessionHandler');
    let contenido = {};
    let respuesta = '';

    // envio respuesta al servidor
    try {
        //console.log(TYPES)
        switch (myAction) {
            case TYPES.ingresarSession:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Buscando el contenido por Params: `,TYPES.ingresarSession) : null;
                contenido = ingresarSession( myValues, 
                                            '', 
                                            responder = async (contenido) => { 
                                                                                try {
                                                                                    let respuesta = '';                        
                                                                                    //console.log('callback-Responder,data -> ',contenido.data);
                                                                                    respuesta = await `Accion completada: '${contenido.msg}'`;
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

            case TYPES.salirSession:
                (consologuearProceso) ? console.log(`${controladorEnUso} -> Buscando el contenido por Qry: `,TYPES.salirSession) : null;
                contenido = salirSession( '', 
                                        responder = async (contenido) => { 
                                                    try {
                                                        let respuesta = '';                        
                                                        //console.log('callback-Responder,data -> ',contenido.data);
                                                        respuesta = await `Accion completada: '${contenido.msg}'`;
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

//----------------------------------------------------
// Fin - Controlador para manejar la session por Axios
//----------------------------------------------------



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



module.exports = {
                    apiloguinInfo,
                    loguinUsuarios,
                    logoutUsuarios,
                    consultarSession,
                    consultarCookie,
                    loguinResultado    
                }


