const Usuario = require('../models/Usuario');


// Muestro api info
const {usuariosInfo} = require('../PaginasJs/usuarios');

const apiUserInfo = async (req, res) => {
    const contenido = usuariosInfo();
    res.send(contenido);
}


/** 
 * Crear Usuario Nuevo 
 */
const crearUsuario = async (req, res) => {

    // extraer email y password
    const { email, password } = req.body;

    try {
        // Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({ email });

        if(usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // crea el nuevo usuario
        usuario = new Usuario(req.body);

        // guardar usuario
        await usuario.save();
        console.log('Se ha creado un nuevo usuario');
        res.json({msg: 'Se ha creado un nuevo usuario'}); 

    } catch (error) {
        console.log(error);
        res.status(400).send({msg: 'Hubo un error al crear el nuevo usuario'});
    }
};


/**  
 * Mostrar todos los usuarios 
 * */
const mostrarUsuarios = async (req, res) => {
    //res.send('respond with a resource');
    try {
        // cargar usuarios
        let usuario = await Usuario.find();

        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error al leer los usuarios');
    }
  };


module.exports = {
                    crearUsuario,
                    mostrarUsuarios,
                    apiUserInfo
                }

