const path = require("path");
const bcryptjs = require ("bcryptjs");
const fs = require("fs");
const users = require ("../data/users/usersModel");
const {validationResult} = require("express-validator");
const session = require ("express-session");

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
            let allUsers = users.getAll();
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
        }
    },

    register: (req, res) => {
        let cssSheets = ["register"];
        let title = "Registro";
        return res.render("users/register.ejs", {cssSheets, title})
    },

    store: (req,res) => {
        //Evitar que un usuario se registre con un email ya utilizado (NO ANDA LA VISUALIZACION DEL MENSAJE DE ERROR, PERO SI LA FUNCION):
        let userInDB = users.findByField("email", req.body.email);
        let cssSheets = ["register"];
        let title = "Registro";
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
        //Verifica que los campos se hayan llenado correctamente:
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let cssSheets = ["register"];
            let title = "Registro";
            if (req.file) {
                let imageName = req.file.filename;
                fs.unlinkSync(path.resolve (__dirname, "../../public/images/users/") + '/' + imageName);
            }
            return res.render ("users/register.ejs", {cssSheets, title, errorMessages: errors.mapped(), oldData: req.body});
        } else {
            //Almacena el nuevo usuario:
            let allUsers = users.getAll();
            let newUser = {
                "id": allUsers[allUsers.length-1].id + 1,
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "email": req.body.email,
                "password": bcryptjs.hashSync (req.body.password, 10),
                "birthdate": req.body.birthdate,
                "category": req.body.category,
                "image": req.file.filename,
            };
            allUsers.push (newUser);
            users.write (allUsers);
            return res.redirect ('/productos/todos');
        };
    },

    logout: (req,res) =>{
        req.session.destroy();
        res.clearCookie('email');
        res.redirect('/')
    }

}