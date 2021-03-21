function authMiddleware (req,res,next){
    if (req.session.usuarioLogueado != undefined){
        next();
    } else {
        res.send ("Debes loguearte primero");
    }
}

module.exports = authMiddleware;