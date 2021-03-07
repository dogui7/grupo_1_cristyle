const path = require("path");
const products = require ("../database/products/productsModel");

module.exports = {

    index: (req, res) => {
        let cssSheets = ["index", "showProducts"];
        let title = "Sitio oficial de Cristyle";

        let discountToFilter = 20;
        let numberOfProducts = 4;

        let discountProducts = products.getAll().filter(product => product.discount >= discountToFilter);
        let discountProductsToShow = [];

        for (let i = 0; i < numberOfProducts; i++) {
            if (discountProducts.length == 0) {break}; //Si no hay mas elementos, salimos del for
            discountProductsToShow.push( //Pusheamos al array que vamos a enviar...
                discountProducts.splice( //Splice toma un elemento del array, el primer parametro determina la posicion, el segundo cuantos elementos
                    Math.floor(Math.random()*discountProducts.length), 1
                )[0] // Ya que splice devuelve un array, lo quitamos del array
            );
        }

        return res.render(path.resolve (__dirname, "../views/index.ejs"), {cssSheets, title, discountProductsToShow})
    }
}