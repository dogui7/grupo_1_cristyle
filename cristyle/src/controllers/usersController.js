const path = require("path");
const bcryptjs = require ("bcryptjs");
const fs = require("fs");
const db = require ("../database/models");
const Op = require("sequelize").Op;
const {validationResult} = require("express-validator");

module.exports = {

    login: (req, res) => {
        return res.render("users/login.ejs")
    },

    processLogin: (req, res) => {
        // Verifica que los campos se hayan llenado correctamente
        let errors = validationResult(req);
        // Si hay errores, renderizamos la vista nuevamente con los mensajes de error
        if (!errors.isEmpty()) {
            return res.render ("users/login.ejs", {errorMessages: errors.mapped()});
        } else {
            // Si no hay errores, verificamos que el email y la contraseña sean correctos
            db.User.findAll( {where: {deleted:0} } )
            .then(function (allUsers){
                let usuarioALoguearse;
                for (let i = 0; i < allUsers.length; i++){
                    if (req.body.email == allUsers[i].email && bcryptjs.compareSync(req.body.password, allUsers[i].password)){
                        usuarioALoguearse = allUsers[i];
                        break;
                    }
                }
                // Si no lo encontramos, renderizamos la vista nuevamente con los mensajes de error
                if (usuarioALoguearse == undefined){
                    let customError= {
                        "password": {
                            "value": "",
                            "msg": "Las credenciales no son válidas",
                            "param": "email",
                            "location": "body"
                        }
                    }
                    return res.render ("users/login.ejs", {errorMessages: customError});
                    }
                // Si lo encontramos, borro la propiedad password para guardar el usuario en session sin su contraseña, por seguridad:
                delete usuarioALoguearse.password;
                req.session.userLogged = usuarioALoguearse;
                // Si el usuario marcó "mantenerme conectado", guardamos las cookies por un año
                if (req.body.rememberUser) {
                    console.log("Se guarda la cookie")
                    res.cookie('email', req.body.email, {maxAge: 1000*60*60*24*365})
                }
                res.redirect ('/productos/todos');  
            })
        }
    },

    profile: (req,res) => {
        res.render("users/profile.ejs")
    },

    edit: (req,res) => {
        return res.render("users/editProfile.ejs")
    },

    processEdit: (req,res) => {
        // Verifica que los campos se hayan llenado correctamente
        let errors = validationResult(req);
        // Si hay errores, renderizamos la vista nuevamente con los mensajes de error
        if (!errors.isEmpty()) {
            // Si se subió un archivo, lo eliminamos de public
            if (req.file) {
                let imageName = req.file.filename;
                fs.unlinkSync(path.resolve (__dirname, "../../public/images/users/") + '/' + imageName);
            }
            return res.render ("users/editProfile.ejs", {errorMessages: errors.mapped(), oldData: req.body});
        // Si no hay errores, almacena las modificaciones
        } else {
            db.User.update ({
                ...req.body,
                "profileImage": req.file ? req.file.filename : req.session.userLogged.profileImage,
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
        return res.render("users/register.ejs")
    },

    processRegister: (req,res) => {
        //Evitar que un usuario se registre con un email ya utilizado
        db.User.findOne({
            where: {email: req.body.email, [Op.and]: {deleted:0}}
        }).then((userInDB) => {
            //Se checkea si ya existe el email enviado en la base de datos, en cuyo caso se muestra un error
            if (userInDB) {
                return res.render ("users/register.ejs", {
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
                if (req.file) {
                    let imageName = req.file.filename;
                    fs.unlinkSync(path.resolve (__dirname, "../../public/images/users/") + '/' + imageName);
                }
                return res.render ("users/register.ejs", {errorMessages: errors.mapped(), oldData: req.body});
            //Si no hay errores, se guarda el nuevo usuario en la base de datos
            } else {
                db.User.create({
                    ...req.body,
                    profileImage: req.file.filename,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    deleted: 0
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
        // Borramos la informacion de session y de las cookies
        req.session.destroy();
        res.clearCookie('email');
        // Redirigimos
        res.redirect('/')
    },

    delete: (req,res) => {
        // Ponemos la variable deleted en 1, para que se lo considere "eliminado" pero tengamos su información disponible
        db.User.update(
            {deleted: 1},
            {where: {email: req.session.userLogged.email} }
        )
        // Eliminamos la foto del usuario de public
        let userImage = req.session.userLogged.profileImage;
        fs.unlinkSync(path.resolve (__dirname, "../../public/images/users/") + '/' + userImage);
        // Borramos la informacion de session y de las cookies
        req.session.destroy();
        res.clearCookie('email');
        // Redirigimos
        res.redirect ("/productos/todos")
    }
}