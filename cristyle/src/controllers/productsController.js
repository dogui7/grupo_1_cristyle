const path = require("path");

module.exports = {

    detail: (req, res) => {
        let cssSheets = ["productDetail"];
        let title = "Detalle producto";
        return res.render(path.resolve (__dirname, "../views/products/productDetail.ejs"), {cssSheets, title})
    },

    cart: (req, res) => {
        let cssSheets = ["productCart"];
        let title = "Carrito";
        return res.render(path.resolve (__dirname, "../views/products/productCart.ejs"), {cssSheets, title})

    }
}