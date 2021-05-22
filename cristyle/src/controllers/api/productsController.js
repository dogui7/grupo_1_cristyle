const db = require ("../../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const apiProductsController = {

    allProducts: function (req,res) {
        db.Product.findAll({where: {deleted: 0}})
        .then(productsInDb => {

           return res.status(200).json({
                count: productsInDb.length,
                data: productsInDb,
                status: 200
            })
        })
        .catch(error => {console.log(error)});
    }

}

module.exports = apiProductsController;