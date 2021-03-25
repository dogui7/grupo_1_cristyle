const express = require ("express");
const router = express.Router();

const productsController = require ("../controllers/productsController");

//Middlewares
const validateProductsCreate = require("../middlewares/routes/products/expressValidatorProductsCreate");
const validateProductsEdit = require("../middlewares/routes/products/expressValidatorProductsEdit");
const authMiddleware = require("../middlewares/routes/users/authMiddleware");
const upload = require("../middlewares/routes/products/multerProduct");


//GET ONE PRODUCT

router.get("/detalle/:id", productsController.detail);

//CART

router.get("/carrito",authMiddleware,productsController.cart);

//PRODUCT EDIT

router.get ('/editar/:id', productsController.edit);
router.put ('/:id', upload.single ('productImage'), validateProductsEdit, productsController.update);

//PRODUCT CREATION

router.get ('/agregar', productsController.create);
router.post ('/agregar', upload.single ('productImage'), validateProductsCreate, productsController.store);

//SHOW ALL

router.get('/todos', productsController.showAll);

//SHOW FILTERED

router.get('/todos/:filter', productsController.showFiltered);

//DELETE ONE PRODUCT

router.delete('/eliminar/:id', productsController.delete);

module.exports = router;