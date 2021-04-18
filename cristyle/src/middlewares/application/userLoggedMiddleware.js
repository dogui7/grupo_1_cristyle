const db = require ("../../database/models");

function userLoggedMiddleware (req,res,next){
    res.locals.isLogged = false;

    // Check cookies
    let emailInCookie = req.cookies.email;
    if (emailInCookie){
        db.User.findOne({where:
            {
                email: emailInCookie
            }
        }).then((userFromCookie) => {
            if (userFromCookie) {
                req.session.userLogged = userFromCookie;
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    
    // Check if someone is logged
    if(req.session && req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}

module.exports = userLoggedMiddleware;