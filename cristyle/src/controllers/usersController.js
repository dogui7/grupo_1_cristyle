const path = require("path");

module.exports = {

    login: (req, res) => {
        return res.render(path.resolve (__dirname, "../views/login.ejs"))
    },

    register: (req, res) => {
        return res.render(path.resolve (__dirname, "../views/register.ejs"))
    }
}