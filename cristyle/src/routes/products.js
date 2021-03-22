const express = require ("express");
const router = express.Router();
const multer = require ('multer');
const path = require('path');

const productsController = require ("../controllers/productsController");

//Middlewares
const validateProductsCreate = require("../middlewares/routes/products/expressValidatorProductsCreate");
const validateProductsEdit = require("../middlewares/routes/products/expressValidatorProductsEdit");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/images/products'));    //Aquí deben indicar donde van a guardar la imagen
    },
    filename: function (req, file, cb) {
      cb(null, 'foto' + '-' + Date.now()+ path.extname(file.originalname));      
    }
  })
   
const upload = multer({ storage });


//GET ONE PRODUCT

router.get("/detalle/:id", productsController.detail);

//CART

router.get("/carrito", productsController.cart);

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