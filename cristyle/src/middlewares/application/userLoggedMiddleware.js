const db = require ("../../database/models");

function userLoggedMiddleware (req,res,next){
    res.locals.isLogged = false;

    // Check cookies
    //let emailInCookie = req.cookies.email;
    //let emailInSession = req.session.email;
    //let userFromCookie = db.User.findOne({where:
    //{
    //    emailInSession: emailInCookie
    //})
//
    //if (userFromCookie) {
    //    req.session.userLogged = userFromCookie;
    //}

    // Check if someone is logged
    if(req.session && req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}

module.exports = userLoggedMiddleware;