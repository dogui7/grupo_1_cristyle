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

            let productsToSend = products.map((product) => {
                return product.dataValues;
            })

            productsToSend.forEach((product) => {
                delete product.price;
                delete product.discount;
                delete product.categoryId;
                delete product.CategoryId;
                delete product.sizeId;
                delete product.SizeId;
                delete product.image;
                delete product.gender;
                delete product.deleted;
                product.dbRelations = ["sizeId", "categoryId"];
                product.detailURL = `http://localhost:3500/api/productos/${product.id}`
            })
            
            return res.status(200).json({
                count: products.length,
                data: {
                    countByCategory: {
                        tops: tops.length,
                        camperas: camperas.length,
                        pantalones: pantalones.length,
                        calzados: calzados.length,
                        accesorios: accesorios.length
                    },
                    products: productsToSend,
                },
                status: 200
            })
        })
        .catch(error => {console.log(error)});
    },

    productDetail: function (req,res){
        db.Product.findByPk(req.params.id)
        .then(productToSend => { 
            return res.status(200).json({
                data: {
                    productToSend: productToSend,
                    dbRelations: ["sizeId", "categoryId"],
                    imageURL: "",
                },
                status: 200
            })
        })
    }
}

module.exports = apiProductsController;