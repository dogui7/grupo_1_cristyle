const express = require ("express");
const router = express.Router();
const multer = require ('multer');
const path = require('path');

const usersController = require ("../controllers/usersController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/images/users'));    //Aquí deben indicar donde van a guardar la imagen
    },
    filename: function (req, file, cb) {
      cb(null, 'foto' + '-' + Date.now()+ path.extname(file.originalname));      
    }
  })
   
const upload= multer({ storage });

//LOGUEARSE
router.get("/iniciarSesion", usersController.login);
router.post("/iniciarSesion", usersController.loginValidation);

//REGISTRAR Y ALMACENAR USUARIO
router.get("/registrarse", usersController.register);
router.post ("/registrarse", upload.single ('userImage'), usersController.store);

module.exports = router;