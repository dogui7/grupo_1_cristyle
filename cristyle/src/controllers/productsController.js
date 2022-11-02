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
            res.render("products/productDetail.ejs", {product})
        })
        .catch (error => {
            res.send (error)
        })
    },

    cart: (req, res) => {
        return res.render("products/productCart.ejs")
    },

    edit: (req, res) => {
        // Pedimos el producto a actualizar, los sizes y las categories de la DB
        let requestProduct = db.Product.findByPk(req.params.id);
        let requestSizes = db.Size.findAll();
        let requestCategories = db.Category.findAll();
        Promise.all([requestProduct, requestSizes, requestCategories])
        .then(function ([product, sizes, categories ]){
            res.render ("products/editProducts.ejs", {product, sizes, categories})
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
                return res.render ("products/editProducts.ejs", {product, sizes, categories, errorMessages: errors.mapped(), oldData: req.body});
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
            res.render ("products/createProduct.ejs", {sizes, categories})
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
                return res.render ("products/createProduct.ejs", {categories, sizes, errorMessages: errors.mapped(), oldData: req.body});
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
        db.Product.findAll()
        .then (function (products){
            res.render("products/allProducts.ejs", {products, busqueda: null})
        })
        .catch (error => {
            res.send (error)
        })
    },
    
    search: (req, res) => {
        let search = req.query.busqueda;

        db.Product.findAll ({
            where : { name : {[Op.like]: `%${search}%`} }
        })
        .then (function(products){
            res.render("products/allProducts.ejs", {products, busqueda: req.query.busqueda});  
        })
        .catch (error => {
            res.send (error)
        })
        
    },
    
    showFiltered: (req, res) => {
        let filter = req.params.filter;
        searchParameters = {}
        switch(filter){
            case 'hombre':
            case 'mujer':
                searchParameters = {
                    where: {gender: filter}
                };
                break;
            case 'ofertas':
                searchParameters = {
                    where: {discount: { [Op.gt]: 0}},
                    order: [["discount", "desc"]]
                };
                break;
        }
        db.Product.findAll(searchParameters)
        .then ( function (products){
            return res.render("products/allProducts.ejs", {products});
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