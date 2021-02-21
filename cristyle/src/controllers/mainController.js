const path = require("path");

module.exports = {

    index: (req, res) => {
        let cssSheets = ["index"];
        let title = "Sitio oficial de Cristyle";
        return res.render(path.resolve (__dirname, "../views/index.ejs"), {cssSheets, title})
    }
}