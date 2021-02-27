const path = require("path");

module.exports = {
	//Muestra todos los productos
	t1: (req, res) => {
		const products = require("../database/products/productsModel.js");
		res.send (products.getAll());
	},

	//Muestra todos los usuarios
	t2: (req, res) => {
		const users = require("../database/users/usersModel.js");
		res.send (users.getAll());
	},

    //Muestra todas las categorias
    t3: (req, res) => {
		const categories = require('../database/products/categoriesModel.js');
		res.send (categories.getAll());
	},
	
    //Muestra todos los talles
	t4: (req, res) => {
		const sizes = require("../database/products/sizesModel.js");
		res.send (sizes.getAll());
	},
	
	t5: (req, res) => {

	},

	t6: (req, res) => {

	},

	t7: (req, res) => {

	},

	t8: (req, res) => {

	},

	t9: (req, res) => {

	},
}