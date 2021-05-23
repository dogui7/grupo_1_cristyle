const db = require ("../../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const apiProductsController = {

    allProducts: (req,res) => {
        let products = db.Product.findAll({where: {deleted: 0}})
        let categories = db.Category.findAll()
        Promise.all([products, categories]).then(([products, categories]) => {

            let productsToSend = products.map((product) => {
                return product.dataValues;
            })

            let categoriesToSend = categories.map((category) => {
                return category.dataValues;
            })

            let categoriesNames = []
            let categCount = []
            categoriesToSend.forEach((category) => {
                categoriesNames.push(category.category);
                categCount.push(0)
            })
         
            productsToSend.forEach((product) => {
                categCount[product.categoryId - 1] = categCount[product.categoryId - 1] + 1
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
                /* countByCategory: , */
                products: productsToSend,
                status: 200
            })
        })
        .catch(error => {console.log(error)});
    },

    productDetail: (req,res) => {
        db.Product.findByPk(req.params.id)
        .then(productToSend => { 
            return res.status(200).json({
                data: {
                    productToSend: productToSend,
                    dbRelations: ["sizeId", "categoryId"],
                    imageURL: `/public/images/products/${productToSend.image}`,
                },
                status: 200
            })
        })
    }
}

module.exports = apiProductsController;