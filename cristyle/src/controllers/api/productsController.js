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
            let categoriesCount = []
            categoriesToSend.forEach((category) => {
                categoriesNames.push(category.category);
                categoriesCount.push(0)
            })
            /* categoriesNames = [Camperas, Tops, Accesorios, ...] */
        
            productsToSend.forEach((product) => {
                categoriesCount[product.categoryId - 1] = categoriesCount[product.categoryId - 1] + 1
            })
            /* categoriesCount = [4, 5, 8, ...] */

            let countByCategoryToSend = {};
            for (let i = 0; i < categoriesNames.length; i++) {
                countByCategoryToSend[categoriesNames[i]] = categoriesCount[i];
            }
            /* countByCategoryToSend = {
                Camperas: 4,
                Tops: 5,
                Accesorios: 8,
                ...
            }*/
            
            productsToSend.forEach((product) => {
                // Eliminamos la información sensible que no queremos enviar, dejando solo el ID, firstName, lastName, email, y url
                delete product.price;
                delete product.discount;
                delete product.categoryId;
                delete product.CategoryId;
                delete product.sizeId;
                delete product.SizeId;
                delete product.image;
                delete product.gender;
                delete product.deleted;
                // Agregamos los campos por los que se relaciona con otras tablas
                product.dbRelations = ["sizeId", "categoryId"];
                // Agregamos la URL para ir al endpoint de cada producto en particular
                product.detailURL = `http://localhost:3500/api/productos/${product.id}`
            })

            return res.status(200).json({
                count: products.length,
                countByCategory: countByCategoryToSend,
                categoriesCount: categoriesToSend.length,
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