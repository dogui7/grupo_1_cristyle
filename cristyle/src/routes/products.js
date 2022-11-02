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

// Evita que un USUARIO NO LOGUEADO acceda a rutas. Utilizarlo para evitar que un USUARIO NO LOGUEADO
// acceda a sitios como el carrito, y lo lleve a la vista de logueo.
const loggedMiddleware = require("../middlewares/routes/users/loggedMiddleware");


// GET ONE PRODUCT
router.get("/detalle/:id", productsController.detail);

// CART
router.get("/carrito",loggedMiddleware,productsController.cart);

// PRODUCT EDIT
router.get ('/editar/:id', productsController.edit);
router.put ('/:id', upload.single ('image'), validateProductsEdit, productsController.processEdit);

// PRODUCT CREATION
router.get ('/agregar', productsController.create);
router.post ('/agregar', upload.single ('image'), validateProductsCreate, productsController.processCreate);

// SHOW ALL
router.get('/todos', productsController.showAll);

// SEARCH
router.get('/busqueda/', productsController.search);

// SHOW FILTERED
router.get('/todos/:filter', productsController.showFiltered);

// DELETE ONE PRODUCT
router.delete('/eliminar/:id', productsController.delete);

module.exports = router;