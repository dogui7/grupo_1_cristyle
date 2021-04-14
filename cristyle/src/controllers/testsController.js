const path = require("path");
const db = require ('../database/models')

module.exports = {
	//Muestra todos los productos
	t1: (req, res) => {
		const products = require("../data/products/productsModel.js");
		res.send (products.getAll());
	},

	//Muestra todos los usuarios
	t2: (req, res) => {
		const users = require("../data/users/usersModel.js");
		res.send (users.getAll());
	},

    //Muestra todas las categorias
    t3: (req, res) => {
		const categories = require('../data/products/categoriesModel.js');
		res.send (categories.getAll());
	},
	
    //Muestra todos los talles
	t4: (req, res) => {
		const sizes = require("../data/products/sizesModel.js");
		res.send (sizes.getAll());
	},
	
	t5: (req, res) => {
		db.Product.findAll()
			.then(function (products){
				res.send(products)
			})

	},

	t6: (req, res) => {
		db.User.findAll()
			.then(function (users){
				res.send(users)
			})
	},

	t7: (req, res) => {

	},

	t8: (req, res) => {

	},

	t9: (req, res) => {

	},
}