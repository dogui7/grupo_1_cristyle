const path = require("path");
const fs = require('fs')
const {validationResult} = require("express-validator");
const db = require ("../database/models");
const { title } = require("process");

module.exports = {

    detail: (req, res) => {
        let cssSheets = ["productDetail"];
        let title = "Detalle producto";
        db.Product.findByPk(req.params.id)
            .then(function (product) {
                res.render("products/productDetail", {cssSheets, title, product});
            })
    },

    cart: (req, res) => {
        let cssSheets = ["productCart"];
        let title = "Carrito";
        return res.render("products/productCart.ejs", {cssSheets, title})
    },

    edit: (req, res) => {
        let cssSheets = ["editproducts"];
        let title = "Editar producto";
        let requestProduct = db.Product.findByPk(req.params.id);
        let requestCategory = db.product_category.findAll();
        let requestSize = db.product_size.findAll();

        Promise.all([requestProduct, requestSize, requestCategory])
            .then(function ([product, size, category ]){
                res.render ("products/editproducts.ejs", {cssSheets: cssSheets, title:title, product:product, size:size, category:category})
            })
    },


    update: (req,res)=> {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let cssSheets = ["editproducts"];
            let title = "Editar producto";
            let product = db.Product.findByPk(req.params.id);
            let categories = db.product_category.findAll();
            let sizes = db.product_size.findAll();
            if (req.file) {
                let imageName = req.file.filename;
                fs.unlinkSync(path.resolve (__dirname, "../../public/images/products/") + '/' + imageName);
            }
            return res.render ("products/editproducts.ejs", {cssSheets, title, product, categories, sizes, errorMessages: errors.mapped(), oldData: req.body});
        } else {
            let product = db.Product.findByPk(req.params.id);
            //return res.send("Producto editado! (mentirita, remover el return)");
            db.Product.update ({
                "name": req.body.name,
                "price": req.body.price,
                "discount": req.body.discount,
                "category_id": req.body.category,
                "size_id": req.body.size,
                "description": req.body.description,
                "image": req.file ? req.file.filename : product.image,
                "gender": req.body.gender
            }, {
                where: {
                    id: req.params.id
                }
            });
            return res.redirect ('detalle/' + req.params.id );
        }
    },

    create: (req, res) => {
        let cssSheets = ["createProduct"];
        let title = "Crear producto";
        let categories = categoriesModel.getAll();
        let sizes = sizesModel.getAll();
        return res.render("products/createProduct.ejs", {cssSheets, title, categories, sizes})
    },

    store: (req,res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let cssSheets = ["createProduct"];
            let title = "Crear producto";
            let categories = categoriesModel.getAll();
            let sizes = sizesModel.getAll();
            if (req.file) {
                let imageName = req.file.filename;
                fs.unlinkSync(path.resolve (__dirname, "../../public/images/products/") + '/' + imageName);
            }
            return res.render ("products/createProduct.ejs", {cssSheets, title, categories, sizes, errorMessages: errors.mapped(), oldData: req.body});
        } else {
         
            let allProducts = products.getAll();
            let newProduct = {
                "id": allProducts[allProducts.length-1].id + 1,
                "name": req.body.name,
                "description": req.body.description,
                "price": req.body.price,
                "discount": req.body.discount,
                "size": req.body.size,
                "category": req.body.category,
                "image": req.file.filename,
                "gender": req.body.gender
            };
            allProducts.push (newProduct);
            products.write (allProducts);
            return res.redirect ('/productos/todos');
        }
        
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
        return res.render("products/allProducts.ejs", {cssSheets, title, products: allProducts, busqueda: req.query.busqueda});
    },

    showFiltered: (req, res) => {
        let cssSheets = ["allProducts","showProducts"];
        let title, filter = req.params.filter;
        let allProducts = products.getAll();
        let filteredProducts;
        switch(filter){
            case 'hombre':
            case 'mujer':
                filteredProducts = allProducts.filter(product => product.gender == filter);
                break;
            case 'ofertas':
                filteredProducts = allProducts
                .filter(product => product.discount > 0) // Filtramos los que estan en descuento
                .sort((a,b) =>{ // Ordenamos de mayor a menor para mostrar primero los de mayor descuento
                    if(a.discount > b.discount) {return -1}
                    if(a.discount < b.discount) {return 1}
                    return 0;
                })
                break;
            default:
                filteredProducts = allProducts;
                break;
        }
        return res.render("products/allProducts.ejs", {cssSheets, title, products: filteredProducts, busqueda: null});
    },

    delete: (req,res) => {
        let allProducts = products.getAll();
        allProducts = allProducts.filter(product => product.id != req.params.id);
        products.write(allProducts);
        return res.redirect ('/productos/todos');
    }
}