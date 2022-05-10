//const res = require('express/lib/response');

const authSession = ( req, res, next ) => {
    const consologuearProceso = true;   //Valores (true, false) 
    const consologuearError = true;      //Valores (true, false) 
    const mymiddleware = 'auth';
    (consologuearProceso) ? console.log(`* middleware: ${mymiddleware}...`) : null;
    (consologuearProceso) ? console.log(`req.session: `,req.session) : null;

    if (!req.session.usuario) {
        (consologuearProceso) ? console.log(`No se encontro una session de usuario. `) : null;
        res.status(200).json({ msg: 'El Usuario no esta logueado.' });
        return;
    };

    next();
};


const authCookie = (req, res, next) => {
    if (!req.cookies.sessionUsuario) {
        res.json({msg: 'El Usuario no esta logueado.' });
        return;
    };
    next();
}; 



/* 
 
 // Consulto la session objeto 'usuario'
 
 const consultarSession = (req, res) => {
    res.json(req.session.usuario);
    return;
}


// Consulto la cookie 'sessionUsuario'

 const consultarCookie = (req, res) => {
    res.json(req.cookies.sessionUsuario);
    return;
}
 */



module.exports = {
                    authSession,
                    authCookie
                }