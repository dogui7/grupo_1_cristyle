const express = require ("express");
const router = express.Router();

const usersController = require ("../controllers/usersController");

//Middlewares
const validateRegister = require("../middlewares/routes/users/expressValidatorRegister");
const validateLogin = require("../middlewares/routes/users/expressValidatorLogin");
const validateEdit = require("../middlewares/routes/users/expressValidatorEdit")
const guestMiddleware = require ('../middlewares/routes/users/guestMiddleware');
const authMiddleware = require ('../middlewares/routes/users/authMiddleware');
const upload = require("../middlewares/routes/users/multerUsers");

//INICIAR SESION
router.get("/iniciarSesion", guestMiddleware, usersController.login);
router.post("/iniciarSesion", validateLogin, usersController.loginValidation);

//VER PERFIL
router.get("/perfil", authMiddleware, usersController.profile);

//EDITAR PERFIL
router.get("/editar", authMiddleware, usersController.edit);
router.put("/editar", upload.single ('profile_image'), validateEdit, usersController.processEdit);
router.post("/eliminar", usersController.delete);

//REGISTRAR Y ALMACENAR USUARIO
router.get("/registrarse", guestMiddleware, usersController.register);
router.post ("/registrarse", upload.single ('profile_image'), validateRegister, usersController.processRegister);

//CERRAR SESION
router.get ('/logout', usersController.logout);

module.exports = router;