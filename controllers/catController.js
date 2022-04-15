const {Cat} = require('../models/model');
const { validationResult } = require('express-validator');

/* const vistaInicio = (req, res) => {
    res.render('index', { title: 'Express' });
} */


// Muestro api info
const {catInfo} = require('../PaginasJs/cats');
const apiCatInfo = async (req, res) => {
    const contenido = catInfo()
    res.send(contenido);
}


// Muestro todos los gatitos
const vistaGatitos = async (req, res) => {
    const gatitos = await Cat.find();
    res.status(200).json({gatitos});
}


// Muestro un gatito
const verUnGatito = async (req, res) => {
    // extraer id del body (es elidentificador unico)
    const { _id } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const valorClave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;  
    
    let gato;
    
    try {
        // Verificar si no se paso el id del gatito a bucar.
        if(!valorClave) {
            return res.status(400).json({ msg: 'El id es obligatorio' });
        }
        
        // Verificar si se paso el id en el body
        if (_id) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            console.log(errores);
            if( !errores.isEmpty() ) {
                return res.status(400).json({errores: errores.array() });
            };    
        }; 
        
        gato = await Cat.findById(valorClave);
        //  Verifico si el gatito eliminado existia
        if (gato) {
            res.status(200).json({msg: 'Gatito encontrado', gato}); 
        } else {
            res.status(400).json({msg: `No hay un gatito con este id:${valorclave}`, gato});
        };
        
    } catch (error) {
        //console.log(gato)
        res.status(400).send({msg: 'Hubo un error al buscar el gatito, o el gattito no se encuentra en la base',error});      
    }
}


// Creo un gatito nuevo
const crearGatito = async (req, res) => {
    // extraer id del body (es elidentificador unico)
    const { name } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const nameGato = (name) 
        ? name 
        : (req.params.name)
            ? req.params.name
            : req.query.name
        ;  

    try {
        // Verificar si no se paso el name del gatito a bucar.
        if(!nameGato) {
            return res.status(400).json({ msg: 'El nombre es obligatorio' });
        }
        
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
        
        // Agrego gatito (si ya existiera romperia e iria por el catch)
        kitty = new Cat({ name: nameGato });
        const gato = await kitty.save();

        //  Verifico si el gatito agregado existia
        console.log( gato)
        if (gato) {
            res.status(200).json({msg: 'Gatito agregado', gato}); 
        } else {
            res.status(400).json({msg: `No se agrego un gatito con este nombre:${nameGato}`, gato});
        };
        
        //console.log('meow');
        //res.status(201).json({msg: 'meow'}); 

    } catch (error) {
        //console.log({msg: 'Hubo un error al crear el gatito',error});
        res.status(400).send({msg: 'Hubo un error al crear el gatito',error});   
    };
};


// Modifico un gatito
const editarGatito = async (req, res) => {
    // extraer id del body (es elidentificador unico)
    const { _id, name } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const valorClave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;  
        // Almeceno el valor del Name, si se paso por algun metodo (body, query, params)
        const valorNombre = (name) 
        ? name 
        : (req.params.name)
            ? req.params.name
            : req.query.name
        ;  
    
        let gato;
        let editarGato;
    try {
        // Verificar si no se paso el id del gatito a bucar.
        if(!valorClave) {
            return res.status(400).json({ msg: 'El id es obligatorio' });
        }
        
        // Verificar si no se paso el nuevo nombre del gatito a bucar.
        if(!valorNombre) {
            return res.status(400).json({ msg: 'El nuevo nombre es obligatorio' });
        }

        // Verificar si se paso el id o el nombre en el body
        if (_id && name) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            console.log(errores);
            if( !errores.isEmpty() ) {
                return res.status(400).json({errores: errores.array() });
            };    
        }; 
        
        // Armo el objeto Modificado para modificar el gatito.
        editarGato={
            _id: valorClave,
            name: valorNombre
        }

        gato = await Cat.findByIdAndUpdate( valorClave, editarGato );
        //  Verifico si el gatito eliminado existia
        if (gato) {
            res.status(200).json({msg: `Gatito editado, nuevo nombre:${valorNombre}`, gato}); 
        } else {
            res.status(400).json({msg: `No hay un gatito con este id:${valorclave}`, gato});
        };
        
    } catch (error) {
        //console.log(gato)
        res.status(400).send({msg: 'Hubo un error al buscar el gatito, o el gattito no se encuentra en la base',error});      
    }
}



// Elimino un gatito
const elininarGatito = async (req, res) => {
    // extraer id del body (es elidentificador unico)
    const { _id, } = req.body;

    // Almeceno el valor del id, si se paso por algun metodo (body, query, params)
    const valorclave = (_id) 
        ? _id 
        : (req.params.id)
            ? req.params.id
            : req.query.id
        ;    

    try {
    
        // Verificar si no se paso el id del gatito a eliminar.
        if(!valorclave) {
            return res.status(400).json({ msg: 'No existen parametros validos para esta operacion' });
        }
        
        // Verificar si se paso el id en el body
        if (_id) {
            // Revisar si hay errores en el body
            const errores = validationResult(req);
            if( !errores.isEmpty() ) {
                return res.status(400).json({errores: errores.array() });
            };    
        }; 
        
        // Eliminar (si el id no existiera, devuelve gato vacio )
        const gato = await Cat.findByIdAndDelete( valorclave );
        
        //  Verifico si el gatito eliminado existia
        if (gato) {
            res.status(200).json({msg: 'Gatito Eliminado', gato}); 
        } else {
            res.status(400).json({msg: `No hay un gatito con este id:${valorclave}`, gato});
        };
        

    } catch (error) {
        //console.log(error);
        res.status(400).send({msg: 'Hubo un error al eliminar el gatito',error});
    }

}


module.exports = {
                    apiCatInfo,
                    crearGatito,
                    editarGatito, 
                    vistaGatitos,
                    verUnGatito,
                    elininarGatito
                }