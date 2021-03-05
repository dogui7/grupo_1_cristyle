const express = require ("express");
const router = express.Router();

const productsController = require ("../controllers/productsController");

router.get("/detalle/:id", productsController.detail);
router.get("/carrito", productsController.cart);
router.get ('/editar', productsController.edit);

// PRODUCT CREATION

router.get ('/agregar', productsController.create);
router.post ('/', productsController.store);

router.get('/todos', productsController.showAll);
router.delete('/eliminar/:id', productsController.delete);

module.exports = router;