const path = require("path");

module.exports = {

    //Muestra en pantalla las categorias
    t1: (req, res) => {
		const categories = require('../database/products/categoriesModel.js');
		res.send (categories.getAll());
	},
	
    //Muestra en pantalla los talles
	t2: (req, res) => {
		const sizes = require("../database/products/sizesModel.js");
		res.send (sizes.getAll());
	},

	t3: (req, res) => {

	},

	t4: (req, res) => {

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