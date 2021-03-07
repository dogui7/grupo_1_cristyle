const express = require ("express");
const router = express.Router();
const multer = require ('multer');

const productsController = require ("../controllers/productsController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/images/usuarios'));    //Aquí deben indicar donde van a guardar la imagen
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
router.put ('/:id', productsController.update);

// PRODUCT CREATION

router.get ('/agregar', productsController.create);
router.post ('/', productsController.store);

//SHOW ALL

router.get('/todos', productsController.showAll);

//DELETE ONE PRODUCT

router.delete('/eliminar/:id', productsController.delete);

module.exports = router;