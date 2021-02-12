const path = require("path");

module.exports = {

    detail: (req, res) => {
        return res.render(path.resolve (__dirname, "../views/products/productDetail.ejs"))
    },

    cart: (req, res) => {
        return res.render(path.resolve (__dirname, "../views/products/productCart.ejs"))
    }
}