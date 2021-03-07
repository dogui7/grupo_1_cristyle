const path = require("path");
const products = require ("../database/products/productsModel");

module.exports = {

    detail: (req, res) => {
        let cssSheets = ["productDetail"];
        let title = "Detalle producto";
        let product = products.getOne(req.params.id);
        return res.render(path.resolve (__dirname, "../views/products/productDetail.ejs"), {cssSheets, title, product});
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

    store: (req,res) => {
        let allProducts = products.getAll();
        let newProduct = {
            "id": allProducts.length+1,
            "name": req.body.name,
            "price": req.body.price,
            "discount": req.body.discount,
            "size": req.body.size,
            "category": req.body.category,
            "image": "default-image.png"
        };
        allProducts.push (newProduct);
        products.write (allProducts);
        return res.redirect ('/productos/todos');
    },

    showAll: (req, res) => {
        let cssSheets = ["allProducts","showProducts"];
        let title = "Todos los productos";

        let allProducts;
        if (req.query && req.query.busqueda == null) {
            allProducts = products.getAll();
        } else {
            allProducts = products.getAll() //Traemos todos los productos
            .filter(product => //Filtramos
                 product.name.toLowerCase().includes(req.query.busqueda.toLowerCase()));
                 /*Nos fijamos si en el nombre en minuscula del producto está incluido
                   el término buscado en la barra también en minuscula*/
        }

        return res.render(path.resolve (__dirname, "../views/products/allProducts.ejs"), {cssSheets, title, allProducts, busqueda: req.query.busqueda});
    },

    delete: (req,res) => {
        let allProducts = products.getAll();
        allProducts = allProducts.filter(product => product.id != req.params.id);
        products.write(allProducts);
        
        
        return res.redirect ('/productos/todos');
    }
}