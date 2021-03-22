const express = require ("express");
const router = express.Router();
const multer = require ('multer');
const path = require('path');
const guestMiddleware = require ('../middlewares/routes/users/guestMiddleware');

const usersController = require ("../controllers/usersController");

//Middlewares
const validateRegister = require("../middlewares/routes/users/expressValidatorRegister");
const validateLogin = require("../middlewares/routes/users/expressValidatorLogin");

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
router.get("/iniciarSesion", guestMiddleware, usersController.login);
router.post("/iniciarSesion", validateLogin, usersController.loginValidation);

//REGISTRAR Y ALMACENAR USUARIO
router.get("/registrarse", guestMiddleware, usersController.register);
router.post ("/registrarse", upload.single ('userImage'), validateRegister, usersController.store);

module.exports = router;