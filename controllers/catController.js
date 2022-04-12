const {Cat} = require('../models/model')

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
    res.json({gatitos});
}

// Creo un gatito nuevo
const crearGatito = async (req, res) => {
    const name = req.params.name;

    try {
        // Revisar que el gatito registrado sea unico
        
        let kitty = await Cat.findOne({ name });
        // console.log(name);
        // console.log(kitty);

        if(kitty) {
            return res.status(400).json({ msg: 'El gattito ya existe' });
        };

        kitty = new Cat({ name: req.params.name });
        await kitty.save();
        console.log('meow');
        res.json({msg: 'meow'}); 

    } catch (error) {
        console.log({msg: 'Hubo un error al crear el gatito'},error);
        res.status(400).send({msg: 'Hubo un error al crear el gatito'},error);   
    };
    
    
};

module.exports = {
                    apiCatInfo,
                    crearGatito, 
                    vistaGatitos
                }