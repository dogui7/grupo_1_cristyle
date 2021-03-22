const path = require("path");

function authMiddleware (req,res,next){
    if (req.session.usuarioLogueado != undefined){
        next();
    } else {
        res.redirect(path.resolve (__dirname, "../views/users/login"));
    }
}

module.exports = authMiddleware;