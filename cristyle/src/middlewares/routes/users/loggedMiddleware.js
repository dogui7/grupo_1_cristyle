function loggedMiddleware (req,res,next){
    // Si el usuario SE ENCUENTRA logueado, continuar
    if (req.session && req.session.userLogged != undefined){
        next();
    // Si el usuario NO SE ENCUENTRA logueado, redireccionar al inicio de sesión
    } else {
        res.redirect("/usuarios/iniciarSesion");
    }
}

module.exports = loggedMiddleware;