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
    }
}