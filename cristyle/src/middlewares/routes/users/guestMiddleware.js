const path = require("path");

function guestMiddleware (req,res,next){
    if (req.session.usuarioLogueado == undefined){
        next();
    } else {
        res.redirect (path.resolve (__dirname, "../views/index"));
    }
}

module.exports = guestMiddleware;