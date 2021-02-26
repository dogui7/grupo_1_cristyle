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
    },

    edit: (req, res) => {
        let cssSheets = ["editproducts"];
        let title = "Editar producto";
        return res.render(path.resolve (__dirname, "../views/products/editproducts.ejs"), {cssSheets, title})
    },

    create: (req, res) => {
        let cssSheets = ["createProduct"];
        let title = "Crear producto";
        return res.render(path.resolve (__dirname, "../views/products/createProduct.ejs"), {cssSheets, title})
    },

    showAll: (req, res) => {
        let cssSheets = ["allProducts"];
        let title = "Todos los productos";
        return res.render(path.resolve (__dirname, "../views/products/allProducts.ejs"), {cssSheets, title})
    }
}