function guestMiddleware (req,res,next){
    if (req.session.usuarioLogueado == undefined){
        next();
    } else {
        res.send ("Ya estás logueado");
    }
}

module.exports = guestMiddleware;