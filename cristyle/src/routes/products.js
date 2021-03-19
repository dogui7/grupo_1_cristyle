const express = require ("express");
const router = express.Router();
const multer = require ('multer');
const path = require('path');

const productsController = require ("../controllers/productsController");

//Middlewares
const validateProducts = require("../middlewares/routes/products/expressValidatorProducts");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/images/products'));    //Aquí deben indicar donde van a guardar la imagen
    },
    filename: function (req, file, cb) {
      cb(null, 'foto' + '-' + Date.now()+ path.extname(file.originalname));      
    }
  })
   
const upload= multer({ storage });


//GET ONE PRODUCT

router.get("/detalle/:id", productsController.detail);

//CART

router.get("/carrito", productsController.cart);

//PRODUCT EDIT

router.get ('/editar/:id', productsController.edit);
router.put ('/:id', upload.single ('productImage'), productsController.update);

// PRODUCT CREATION

router.get ('/agregar', productsController.create);
router.post ('/', upload.single ('productImage') , validateProducts, productsController.store);

//SHOW ALL

router.get('/todos', productsController.showAll);

//SHOW FILTERED

router.get('/todos/:filter', productsController.showFiltered);

//DELETE ONE PRODUCT

router.delete('/eliminar/:id', productsController.delete);

module.exports = router;