const path = require("path");
const bcryptjs = require ("bcryptjs");
const fs = require("fs");
const db = require ("../database/models");
const {validationResult} = require("express-validator");
const session = require ("express-session");
const { localsName } = require("ejs");

module.exports = {

    login: (req, res) => {
        let cssSheets = ["login"];
        let title = "Inicio de sesión";
        return res.render("users/login.ejs", {cssSheets, title})
    },

    loginValidation: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let cssSheets = ["login"];
            let title = "Inicio de sesión";
            return res.render ("users/login.ejs", {cssSheets, title, errorMessages: errors.mapped()});
        } else {
            db.User.findAll().then(function (allUsers){
                let usuarioALoguearse;
                for (let i = 0; i < allUsers.length; i++){
                    if (req.body.email == allUsers[i].email && bcryptjs.compareSync(req.body.password, allUsers[i].password)){
                        usuarioALoguearse = allUsers[i];
                        break;
                    }
                }            
                if (usuarioALoguearse == undefined){
                    let customError= {
                            "password": {
                                "value": "",
                                "msg": "Las credenciales no son válidas",
                                "param": "email",
                                "location": "body"
                            }
                        }
                    let cssSheets = ["login"];
                    let title = "Inicio de sesión"; 
                    return res.render ("users/login.ejs", {cssSheets, title, errorMessages: customError});
                    }
                //Borro la propiedad password para guardar el usuario en session sin su contraseña, por seguridad:
                delete usuarioALoguearse.password;
                req.session.userLogged = usuarioALoguearse;
                //Guardamos las cookies por un año si el usuario asi lo marcó
                if (req.body.rememberUser) {
                    console.log("Se guarda la cookie")
                    res.cookie('email', req.body.email, {maxAge: 1000*60*60*24*365})
                }
                console.log(req.cookies);
                res.redirect ('/productos/todos');  
            })
        }
    },

    profile: (req,res) => {
        let cssSheets = ["profile"];
        let title = "Tu cuenta";
        res.render("users/profile.ejs", {cssSheets, title})
    },

    edit: (req,res) => {
        let cssSheets = ["editProfile"];
        let title = "Editar perfil";
        return res.render("users/editProfile.ejs", {cssSheets, title})
    },

    processEdit: (req,res) => {
        //Verifica que los campos se hayan llenado correctamente:
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let cssSheets = ["editProfile"];
            let title = "Editar perfil";
            if (req.file) {
                let imageName = req.file.filename;
                fs.unlinkSync(path.resolve (__dirname, "../../public/images/users/") + '/' + imageName);
            }
            return res.render ("users/editProfile.ejs", {cssSheets, title, errorMessages: errors.mapped(), oldData: req.body});
        } else {
            //Almacena las modificaciones:
            db.User.update ({
                "first_name": req.body.first_name,
                "last_name": req.body.last_name,
                "birthdate": req.body.birthdate,
                "profile_image": req.file ? req.file.filename : req.session.userLogged.profile_image,
            } , {
                where: {
                    id: req.session.userLogged.id
                }
            })
            .then(() => {
                return res.redirect ('/usuarios/perfil');
            })
            .catch((error) => {
                console.log(error)
            })
        };
    },

    register: (req, res) => {
        let cssSheets = ["register"];
        let title = "Registro";
        return res.render("users/register.ejs", {cssSheets, title})
    },

    processRegister: (req,res) => {
        //Evitar que un usuario se registre con un email ya utilizado
        let cssSheets = ["register"];
        let title = "Registro";
        db.User.findOne({
            where: {email: req.body.email}
        }).then((userInDB) => {
            //Se checkea si ya existe el email enviado en la base de datos, en cuyo caso se muestra un error
            if (userInDB) {
                return res.render ("users/register.ejs", {cssSheets, title,
                    errorMessages: {
                        "email": {
                            "value": "",
                            "msg": "Ya hay un usuario registrado con este correo electrónico.",
                            "param": "email",
                            "location": "body"
                        }
                    },
                    oldData: req.body
                });
            }

            //En caso de que el email no exista, se verifica que los campos se hayan llenado correctamente:
            let errors = validationResult(req);
            //Si hay errores, recargar la vista con los correspondientes mensajes
            if (!errors.isEmpty()) {
                let cssSheets = ["register"];
                let title = "Registro";
                if (req.file) {
                    let imageName = req.file.filename;
                    fs.unlinkSync(path.resolve (__dirname, "../../public/images/users/") + '/' + imageName);
                }
                return res.render ("users/register.ejs", {cssSheets, title, errorMessages: errors.mapped(), oldData: req.body});
            //Si no hay errores, se guarda el nuevo usuario en la base de datos
            } else {
                db.User.create({
                    ...req.body,
                    profile_image: req.file.filename,
                    password: bcryptjs.hashSync(req.body.password, 10)
                })
                .then(() => {
                    return res.redirect ('/usuarios/iniciarSesion');
                })
                .catch((error) => {
                    return res.send(error);
                })
            };
        }).catch((error) => {
            console.log(error)
        })
    },

    logout: (req,res) =>{
        req.session.destroy();
        res.clearCookie('email');
        res.redirect('/')
    }

}