const express = require ("express");
const router = express.Router();

const usersController = require ("../controllers/usersController");

//Middlewares
const validateRegister = require("../middlewares/routes/users/expressValidatorRegister");
const validateLogin = require("../middlewares/routes/users/expressValidatorLogin");
const guestMiddleware = require ('../middlewares/routes/users/guestMiddleware');
const upload = require("../middlewares/routes/users/multerUsers");

//INICIAR SESION
router.get("/iniciarSesion", guestMiddleware, usersController.login);
router.post("/iniciarSesion", validateLogin, usersController.loginValidation);

//REGISTRAR Y ALMACENAR USUARIO
router.get("/registrarse", guestMiddleware, usersController.register);
router.post ("/registrarse", upload.single ('userImage'), validateRegister, usersController.store);

//CERRAR SESION
router.get ('/logout', usersController.logout);

module.exports = router;