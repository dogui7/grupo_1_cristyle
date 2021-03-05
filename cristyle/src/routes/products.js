const express = require ("express");
const router = express.Router();

const productsController = require ("../controllers/productsController");

router.get("/detail/:id", productsController.detail);
router.get("/cart", productsController.cart);
router.get ('/edit', productsController.edit);

// CREACION DE PRODUCTOS

router.get ('/create', productsController.create);
router.post ('/', productsController.store);

router.get('/all', productsController.showAll);
router.delete('/delete/:id', productsController.delete);

module.exports = router;