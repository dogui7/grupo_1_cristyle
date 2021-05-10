const path = require("path");
const fs = require('fs')
const {validationResult} = require("express-validator");
const db = require ("../database/models");
const { title } = require("process");
const sequelize = require("sequelize");
const Op = sequelize.Op;


module.exports = {

    detail: (req, res) => {
        let cssSheets = ["productDetail"];
        let title = "Detalle producto";
        db.Product.findByPk (req.params.id)
        .then (function (product){
            res.render("products/productDetail.ejs", {cssSheets, title, product})
        })
        .catch (error => {
            res.send (error)
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
        let requestCategories = db.Category.findAll();
        let requestSizes = db.Size.findAll();

        Promise.all([requestProduct, requestSizes, requestCategories])
        .then(function ([product, sizes, categories ]){
            res.render ("products/editproducts.ejs", {cssSheets, title, product, sizes, categories})
        })
    },


    update: (req,res)=> {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Si multer guardo archivo en public, eliminamos el mismo, ya que hubo errores
            if (req.file) {
                let imageName = req.file.filename;
                fs.unlinkSync(path.resolve (__dirname, "../../public/images/products/") + '/' + imageName);
            }
            // Pedimos el producto a actualizar, los sizes y las categories de la DB
            let requestProduct = db.Product.findByPk(req.params.id);
            let requestSizes = db.Size.findAll();
            let requestCategories = db.Category.findAll();
            Promise.all([requestProduct, requestSizes, requestCategories])
            .then(function ([product, sizes, categories]){
                let cssSheets = ["editproducts"];
                let title = "Editar producto";
                return res.render ("products/editproducts.ejs", {cssSheets, title, product, sizes, categories, errorMessages: errors.mapped(), oldData: req.body});
            })
        } else {
            let product = db.Product.findByPk(req.params.id);
            db.Product.update ({
                ...req.body,
                image: req.file ? req.file.filename : product.image
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then( () => {
                return res.redirect ('detalle/' + req.params.id );
            })
            .catch (error => {
                res.send (error)
            })
        }
    },

    create: (req, res) => {
        // Pedimos los sizes y las categories de la DB
        let requestSizes = db.Size.findAll();
        let requestCategories = db.Category.findAll();
        Promise.all([requestSizes, requestCategories])
        .then(function ([sizes, categories ]){
            let cssSheets = ["createProduct"];
            let title = "Crear producto";
            res.render ("products/createProduct.ejs", {cssSheets, title, sizes, categories})
        })
    },

    store: (req,res) => {
        let errors = validationResult(req);
        // Si hay errores
        if (!errors.isEmpty()) {
            // Si multer guardo archivo en public, eliminamos el mismo, ya que hubo errores
            if (req.file) {
                let imageName = req.file.filename;
                fs.unlinkSync(path.resolve (__dirname, "../../public/images/products/") + '/' + imageName);
            }
            // Pedimos los sizes y las categories de la DB
            let requestSizes = db.Size.findAll();
            let requestCategories = db.Category.findAll();
            Promise.all([requestSizes, requestCategories])
            .then(function ([sizes, categories ]){
                let cssSheets = ["createProduct"];
                let title = "Crear producto";
                return res.render ("products/createProduct.ejs", {cssSheets, title, categories, sizes, errorMessages: errors.mapped(), oldData: req.body});
            })
        // Si no hay errores    
        } else {
            // Agregamos el producto a la DB
            db.Product.create ({
                ...req.body,
                image: req.file.filename,
                deleted: 0
            })
            .then( () => {
                return res.redirect ('/productos/todos');
            })
            .catch (error => {
                res.send (error)
            })
        }
    },

    showAll: (req, res) => {
        // Si no se buscó nada
        if (req.query && req.query.busqueda == null) {
            db.Product.findAll()
            .then (function (products){
                let cssSheets = ["allProducts","showProducts"];
                let title = "Todos los productos";
                res.render("products/allProducts.ejs", {cssSheets, title, products, busqueda: null})
            })
            .catch (error => {
                res.send (error)
            })
        // Si se usó la barra de busqueda
        } else {
            // Buscamos en la base de datos
            db.Product.findAll ({
                where : { name : {[Op.like]: `%${req.query.busqueda}%`} }
            })
            .then (function(products){
                let cssSheets = ["allProducts","showProducts"];
                let title = "Todos los productos";
                res.render("products/allProducts.ejs", {cssSheets, title, products, busqueda: req.query.busqueda});  
            })
            .catch (error => {
                res.send (error)
            })
        }
    },

    showFiltered: (req, res) => {
        let cssSheets = ["allProducts","showProducts"];
        let title = ['Productos']
        let filter = req.params.filter;
        db.Product.findAll()
        .then ( function (products){
            let filteredProducts;
            switch(filter){
                case 'hombre':
                case 'mujer':
                    filteredProducts = products.filter(product => product.gender == filter);
                    break;
                case 'ofertas':
                    filteredProducts = products
                    .filter(product => product.discount > 0) // Filtramos los que estan en descuento
                    .sort((a,b) =>{ // Ordenamos de mayor a menor para mostrar primero los de mayor descuento
                        if(a.discount > b.discount) {return -1}
                        if(a.discount < b.discount) {return 1}
                        return 0;
                    })
                    break;
                default:
                    filteredProducts = products;
                    break;
            }
            return res.render("products/allProducts.ejs", {cssSheets, title, products: filteredProducts, busqueda: null});
        })
       
    },

    delete: (req,res) => {
        db.Product.findByPk (req.params.id)
        .then (function (product){
            // Eliminamos la imagen de public
            let productImage = product.image
            fs.unlinkSync(path.resolve (__dirname, "../../public/images/products/") + '/' + productImage);
        })
        .then (() => {
            // Eliminamos el producto de la DB
            return db.Product.destroy({
                where: {
                    id: req.params.id
                }
            })
        })
        .then (function (){
            res.redirect ("/productos/todos")
        })
        .catch (error => {
            res.send (error)
        })
    }
}