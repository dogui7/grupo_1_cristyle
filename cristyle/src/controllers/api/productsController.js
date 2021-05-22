const db = require ("../../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const apiProductsController = {

    allProducts: function (req,res) {
        let allProducts = db.Product.findAll({where: {deleted: 0}});
        let tops = db.Product.findAll({where: {categoryId: 1, [Op.and]: {deleted: 0} }   });
        let camperas = db.Product.findAll({where: {categoryId: 2, [Op.and]: {deleted: 0} }   });
        let pantalones = db.Product.findAll({where: {categoryId: 3, [Op.and]: {deleted: 0} }   });
        let calzados = db.Product.findAll({where: {categoryId: 4, [Op.and]: {deleted: 0} }   });
        let accesorios = db.Product.findAll({where: {categoryId: 5, [Op.and]: {deleted: 0} }   });


        
        Promise.all([allProducts, tops, camperas, pantalones, calzados, accesorios])
        
        .then(([products, tops, camperas, pantalones, calzados, accesorios]) => {

/*             ARRAY CON COLECCION DE PRODUCTOS SEGUN PIDE LA CONSIGNA (NO FUNCIONA):

                let productsToSend = products.map((product) => {
                delete product.price;
                delete product.discount;
                delete product.sizeId;
                delete product.categoryId;
                delete product.image;
                delete product.gender;
                delete product.deleted;
                
                product.dbRelations = ["sizeId", "categoryId"];
                product.detail = `http://localhost:3500/productos/detalle/${product.id}`
            }) */

            return res.status(200).json({
                count: products.length,
                countByCategory: {
                    tops: tops.length,
                    camperas: camperas.length,
                    pantalones: pantalones.length,
                    calzados: calzados.length,
                    accesorios: accesorios.length
                },
                products: products
            })
        })
        .catch(error => {console.log(error)});
    },

    productDetail: function (req,res){
        db.Product.findByPk(req.params.id)
        .then(productToSend => { 
            return res.status(200).json({
                productToSend: productToSend,
                dbRelations: ["sizeId", "categoryId"],
                imageURL: ""
                })
        })
    }
}

module.exports = apiProductsController;