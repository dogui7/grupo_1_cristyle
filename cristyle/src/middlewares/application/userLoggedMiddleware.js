const db = require ("../../database/models");
const Op = require("sequelize").Op;

function userLoggedMiddleware (req,res,next){
    // Ponemos la variable isLogged en false por defecto, en caso que 
    // haya alguien logueado se cambiará a true.
    res.locals.isLogged = false;

    // Revisamos si hay cookies (es decir, si el usuario marcó "recordarme" la última
    // vez que inició sesion y aun no cerró sesion).
    let emailInCookie = "";
    if (req.cookies.email) emailInCookie = req.cookies.email;
    // Intentamos de buscar en la DB al usuario (emailInCookie tendrá el valor "" o el email guardado en cookies)
    db.User.findOne( {where:{email: emailInCookie}, [Op.and]: {deleted:0} })
    .then((userFromCookie) => {
        // Si habia cookies del cliente, esto nos devolvería el cliente, y lo guardamos en session.
        if (userFromCookie) {
            req.session.userLogged = userFromCookie;
        }
        // Si hay un usuario logueado, ya sea por las cookies del código posterior, o porque acaba 
        // de loguearse en el método login del controlador (que tambien guarda en session al usuario)
        // nos encargamos de guardarlo en locals para poder acceder a esta información en cualquier
        // parte del proyecto
        if(req.session && req.session.userLogged){
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
        }
        next();
    }).catch((error) => {
        console.log(error)
    })
}
module.exports = userLoggedMiddleware;