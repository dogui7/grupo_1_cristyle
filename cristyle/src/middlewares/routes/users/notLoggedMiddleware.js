function notLoggedMiddleware (req,res,next){
    // Si el usuario NO SE ENCUENTRA logueado, continuar
    if (req.session.usuarioLogueado == undefined){
        next();
    // Si el usuario SE ENCUENTRA logueado, redireccionar al index
    } else {
        res.redirect("/");
    }
}

module.exports = notLoggedMiddleware;