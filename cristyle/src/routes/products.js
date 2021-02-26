const express = require ("express");
const router = express.Router();

const productsController = require ("../controllers/productsController");

router.get("/detail", productsController.detail);
router.get("/cart", productsController.cart);
router.get ('/edit', productsController.edit);
router.get ('/create', productsController.create);
router.get('/all', productsController.showAll);

module.exports = router;