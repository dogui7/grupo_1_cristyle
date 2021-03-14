const path = require("path");

module.exports = {

    login: (req, res) => {
        let cssSheets = ["login"];
        let title = "Inicio de sesión";
        return res.render(path.resolve (__dirname, "../views/users/login.ejs"), {cssSheets, title})
    },

    register: (req, res) => {
        let cssSheets = ["register"];
        let title = "Registro";
        return res.render(path.resolve (__dirname, "../views/users/register.ejs"), {cssSheets, title})
    },

    store: (req,res) => {
        let allUsers = users.getAll();
        let newUser = {
            "id": allUsers[allUsers.length-1].id + 1,
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "password": req.body.password,
            "birthdate": req.body.birthdate,
            "category": req.body.category,
            "image": req.file.filename,
        };

        allUsers.push (newUser);
        users.write (allUsers);
        return res.redirect ('/productos/todos');
    }
}