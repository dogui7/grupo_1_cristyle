const path = require("path");

module.exports = {

    index: (req, res) => {
        let cssSheets = ["normalize", "footer", "header", "index"]
        return res.render(path.resolve (__dirname, "../views/index.ejs"), {cssSheets})
    }
}