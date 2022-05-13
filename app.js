// Importo Dependencias (Librerias)
const express = require('express');
//const sessions = require('express-session');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');


// Declaro el Servidor
const app = express();

// Configuro el Servidor
app.use(logger('dev'));
app.use(express.json());    // middleware nativo. Permite recibir informacion en formato Json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());            // Controlo dede donde pueden venir las peticiones

const oneDay = 1000 * 60 * 60 * 24;              // Creating 24 hours from milliseconds
app.use(session({
    secret: 'Lo imprimido, fue escrivido.',      // Contiene la clave secreta para la sesión (lo escibo mal aproposito)
    saveUninitialized: true,                     // Esto permite enviar cualquier sesión a la tienda. Cuando se crea una sesión pero no se modifica, se denomina uninitialized.
    cookie: { maxAge: oneDay },                  // Establece el tiempo de caducidad de la cookie. El navegador eliminará la cookie después de que transcurra la duración establecida. La cookie no se adjuntará a ninguna de las solicitudes en el futuro. En este caso, hemos establecido el maxAgea un solo día 
    resave: false,                               // Permite que la sesión se vuelva a almacenar en el almacén de sesiones, incluso si la sesión nunca se modificó durante la solicitud. Esto puede resultar en una situación de carrera en caso de que un cliente realice dos solicitudes paralelas al servidor. Por lo tanto, la modificación realizada en la sesión de la primera solicitud puede sobrescribirse cuando finaliza la segunda solicitud. El valor predeterminado es true. Sin embargo, esto puede cambiar en algún momento. false es una mejor alternativa.
    //cookie: { secure: true }
  }));


// Importo las rutas
const indexRouter = require('./routes/index');
const catsRouter = require('./routes/cats');
const usersRouter = require('./routes/users');
const simInvBtcRouter = require('./routes/simInvBtc');
const externasRouter = require('./routes/externas');
const loguinRouter = require('./routes/loguin');

// Declaro rutas
app.use('/', indexRouter);
app.use('/api/cats', catsRouter);
app.use('/api/usuarios', usersRouter);
app.use('/api/simInvBtc', simInvBtcRouter);
app.use('/api/externas', externasRouter);
app.use('/api/loguin', loguinRouter);

// Conecto la base de datos
const  {conectarDB } = require('./db/db');
conectarDB();

module.exports = app;

