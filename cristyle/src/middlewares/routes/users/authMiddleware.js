const path = require("path");

function authMiddleware (req,res,next){
    if (req.session && req.session.userLogged != undefined){
        next();
    } else {
        res.redirect("/usuarios/iniciarSesion");
    }
}

module.exports = authMiddleware;