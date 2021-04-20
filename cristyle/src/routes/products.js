const express = require ("express");
const router = express.Router();

const productsController = require ("../controllers/productsController");

/************************ Middlewares de ruta nativos e importados ************************/

// Express-validator para validar los formularios de creacion de producto 
// y edicion de producto, respectivamente
const validateProductsCreate = require("../middlewares/routes/products/expressValidatorProductsCreate");
const validateProductsEdit = require("../middlewares/routes/products/expressValidatorProductsEdit");
// Multer para poder guardar archivos (imagen del producto)
const upload = require("../middlewares/routes/products/multerProducts");

/************************ Middlewares de ruta hechos por nosotros ************************/

// Checkea que el usuario esté logueado. Utilizarlo para evitar que un usuario NO logueado
// acceda a sitios como el carrito, y lo lleve a la vista de logueo.
const authMiddleware = require("../middlewares/routes/users/authMiddleware");


// GET ONE PRODUCT
router.get("/detalle/:id", productsController.detail);

// CART
router.get("/carrito",authMiddleware,productsController.cart);

// PRODUCT EDIT
router.get ('/editar/:id', productsController.edit);
router.put ('/:id', upload.single ('productImage'), validateProductsEdit, productsController.update);

// PRODUCT CREATION
router.get ('/agregar', productsController.create);
router.post ('/agregar', upload.single ('productImage'), validateProductsCreate, productsController.store);

// SHOW ALL
router.get('/todos', productsController.showAll);

// SHOW FILTERED
router.get('/todos/:filter', productsController.showFiltered);

// DELETE ONE PRODUCT
router.delete('/eliminar/:id', productsController.delete);

module.exports = router;