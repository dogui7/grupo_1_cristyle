const path = require("path");

module.exports = {

    index: (req, res) => {
        return res.render(path.resolve (__dirname, "../views/index.ejs"))
    }
}