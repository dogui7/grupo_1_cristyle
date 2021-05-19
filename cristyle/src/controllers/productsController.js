const path = require("path");
const fs = require('fs')
const {validationResult} = require("express-validator");
const db = require ("../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;


module.exports = {

    detail: (req, res) => {
        db.Product.findByPk (req.params.id)
        .then (function (product){
            let cssSheets = ["productDetail"];
            let title = "Detalle producto";
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
        // Pedimos el producto a actualizar, los sizes y las categories de la DB
        let requestProduct = db.Product.findByPk(req.params.id);
        let requestSizes = db.Size.findAll();
        let requestCategories = db.Category.findAll();
        Promise.all([requestProduct, requestSizes, requestCategories])
        .then(function ([product, sizes, categories ]){
            let cssSheets = ["editproducts"];
            let title = "Editar producto";
            res.render ("products/editproducts.ejs", {cssSheets, title, product, sizes, categories})
        })
    },

    processEdit: (req,res)=> {
        // Verifica que los campos se hayan llenado correctamente
        let errors = validationResult(req);
        // Si hay errores, renderizamos la vista nuevamente con los mensajes de error
        if (!errors.isEmpty()) {
            // Si se subió un archivo, lo eliminamos de public
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
        // Si no hay errores, almacena las modificaciones
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

    processCreate: (req,res) => {
        // Verifica que los campos se hayan llenado correctamente
        let errors = validationResult(req);
        // Si hay errores, renderizamos la vista nuevamente con los mensajes de error
        if (!errors.isEmpty()) {
            // Si se subió un archivo, lo eliminamos de public
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
        // Si no hay errores, agregamos el producto a la DB
        } else {
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
        // Si no se buscó nada, renderizamos todos los productos en la vista
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
        // Si se usó la barra de busqueda, buscamos en la base de datos con un like
        } else {
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
        let filter = req.params.filter;
        db.Product.findAll()
        .then ( function (products){
            // Aquí se evalua que filtro es necesario hacer según el link que haya tocado el usuario
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
            let cssSheets = ["allProducts","showProducts"];
            let title = ['Productos']
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