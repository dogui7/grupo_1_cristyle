const path = require("path");
const fs = require('fs')
const {validationResult} = require("express-validator");
const db = require ("../database/models");
const { title } = require("process");
const Op = db.sequelize.Op;


module.exports = {

    detail: (req, res) => {
        let cssSheets = ["productDetail"];
        let title = "Detalle producto";
        db.Product.findByPk (req.params.id)
            .then (function (product){
                res.render("products/productDetail.ejs", {cssSheets, title, product})
            })
            .catch (error => {
                res.send ('ERROR!')
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
        let requestCategory = db.productCategory.findAll();
        let requestSize = db.productSize.findAll();

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
            let categories = db.productCategory.findAll();
            let sizes = db.productSize.findAll();
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
        let requestCategory = db.productCategory.findAll ();
        let requestSize = db.productSize.findAll ();

        Promise.all([requestSize, requestCategory])
            .then(function ([size, category ]){
                res.render ("products/createProduct.ejs", {cssSheets: cssSheets, title:title, size:size, category:category})
            })

    },

    store: (req,res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let cssSheets = ["createProduct"];
            let title = "Crear producto";
            let categories = db.productCategory.findAll();
            let size = db.productSize.findAll();
            //PREGUNTAR PROMISE ALL!!
            if (req.file) {
                let imageName = req.file.filename;
                fs.unlinkSync(path.resolve (__dirname, "../../public/images/products/") + '/' + imageName);
            }
            return res.render ("products/createProduct.ejs", {cssSheets, title, categories, size, errorMessages: errors.mapped(), oldData: req.body});
        } else {
         
                db.Product.create ({
                "name": req.body.name,
                "description": req.body.description,
                "price": req.body.price,
                "discount": req.body.discount,
                "size": req.body.size,
                "category": req.body.category,
                "image": req.file.filename,
                "gender": req.body.gender
            })

            return res.redirect ('/productos/todos');
        }
        
    },

    showAll: (req, res) => {
        let cssSheets = ["allProducts","showProducts"];
        let title = "Todos los productos";

        if (req.query && req.query.busqueda == null) {
           db.Product.findAll () 
            .then (function (products){
                res.render("products/allProducts.ejs", {cssSheets, title, products: products, busqueda: req.query.busqueda})
            })
            .catch (error => {
                res.send ("ERROR!")
            })
        } else {
            db.Product.findAll ({
                where : {
                    products : {[Op.like]: '%req.query.busqueda%'}
                }
            })
            .then (
                function(products) {
                    res.render("products/allProducts.ejs", {cssSheets, title, products:products});  
                }
            )
            
           /*  allProducts = products.getAll() */ //Traemos todos los productos
            /* .filter(product => */ //Filtramos
                 /* product.name.toLowerCase().includes(req.query.busqueda.toLowerCase())); */ 
                 //Nos fijamos si en el nombre en minuscula del producto está incluido el término buscado en la barra también en minuscula
        }
       /*  return res.render("products/allProducts.ejs", {cssSheets, title, products: allProducts,});  */
    },

    showFiltered: (req, res) => {
        let cssSheets = ["allProducts","showProducts"];
        let title, filter = req.params.filter;
        let products = db.Product.findAll();
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
    },

    delete: (req,res) => {
        db.Product.findByPk (req.params.id)
            .then (function (product){
                let productImage = product.image
                fs.unlinkSync(path.resolve (__dirname, "../../public/images/products/") + '/' + productImage);

                db.Product.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            })
            .then (() => {
                res.redirect ("/productos/todos")
            })
            .catch (error => {
                res.send (error)
            })
 
    }
}