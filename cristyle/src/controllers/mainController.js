const db = require ("../database/models");
const {Op} = require("sequelize");
const { Sequelize } = require("../database/models");
module.exports = {
    index: (req, res) => {
         
        let discountFilter = 20;
        let numberOfProducts = 7;
        /* We pick (numberOfProducts) randomly with at least (discountFilter) discount */
        db.Product.findAll({
            where: {
                deleted: 0,
                discount: {[Op.gte]: discountFilter}
            },
            order: Sequelize.literal("rand()"),
            limit: numberOfProducts
        }) 
        .then (function (discountProducts){
            let cssSheets = ["index", "showProducts"];
            let title = "Sitio oficial de Cristyle";
            return res.render("index.ejs", {cssSheets, title, discountProducts})
        })
        .catch (error => {
            console.log(error)
        })
    }
}