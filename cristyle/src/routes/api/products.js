const express = require ("express");
const router = express.Router();

const apiProductsController = require ("../../controllers/api/productsController");

router.get("/", apiProductsController.allProducts);

module.exports = router;