const db = require ("../database/models");

module.exports = {
    index: (req, res) => {
        let cssSheets = ["index", "showProducts"];
        let title = "Sitio oficial de Cristyle";

        let discountToFilter = 20;
        let numberOfProductsToShow = 4;
        let discountProductsToShow = [];

        db.Product.findAll() 
        .then (function (products){
            discountProducts = products.filter(product => product.discount >= discountToFilter);
            for (let i = 0; i < numberOfProductsToShow; i++) {
                if (discountProducts.length == 0) {break}; //Si no hay mas elementos, salimos del for
                discountProductsToShow.push( //Pusheamos al array que vamos a enviar...
                    discountProducts.splice( //Tomamos un elemento al azar del array. Splice toma un elemento del array, el primer parametro determina la posicion, el segundo cuantos elementos
                        Math.floor(Math.random()*discountProducts.length), 1
                    )[0] // Ya que splice devuelve un array, lo quitamos del array para poder pushearlo
                );
            }
            return res.render("index.ejs", {cssSheets, title, discountProductsToShow})
        })
        .catch (error => {
            res.send (error)
        })
    }
}