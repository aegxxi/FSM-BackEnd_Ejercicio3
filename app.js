// Importo Dependencias (Librerias)
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
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
app.use(session({
    secret: 'Lo imprimido, fue escrivido.',     //lo escibo mal aproposito
    resave: true,               //defecto false
    saveUninitialized: true
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

