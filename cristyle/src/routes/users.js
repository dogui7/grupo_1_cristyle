const express = require ("express");
const router = express.Router();

const usersController = require ("../controllers/usersController");

/************************ Middlewares de ruta nativos e importados ************************/

// Express-validator para validar los formularios de registro de usuario, 
// inicio de sesión de usuario, y edicion de usuario, respectivamente
const validateRegister = require("../middlewares/routes/users/expressValidatorRegister");
const validateLogin = require("../middlewares/routes/users/expressValidatorLogin");
const validateEdit = require("../middlewares/routes/users/expressValidatorEdit");
// Multer para poder guardar archivos (imagen de perfil del usuario)
const upload = require("../middlewares/routes/users/multerUsers");

/************************ Middlewares de ruta hechos por nosotros ************************/

// Evita que un USUARIO NO LOGUEADO acceda a rutas. Utilizarlo para evitar que un USUARIO NO LOGUEADO
// acceda a sitios como el carrito, perfil, etc y lo lleve a la vista de logueo.
const loguedMiddleware = require ('../middlewares/routes/users/loguedMiddleware');
// Evita que un USUARIO LOGUEADO acceda a rutas. Utilizarlo para evitar que un USUARIO LOGUEADO
// acceda a sitios como el inicio de sesión, el registro, etc y lo lleve a la vista index.
const notLoguedMiddleware = require ('../middlewares/routes/users/notLoguedMiddleware');


// INICIAR SESION
router.get("/iniciarSesion", notLoguedMiddleware, usersController.login);
router.post("/iniciarSesion", validateLogin, usersController.loginValidation);

// VER PERFIL
router.get("/perfil", loguedMiddleware, usersController.profile);

// EDITAR PERFIL
router.get("/editar", loguedMiddleware, usersController.edit);
router.put("/editar", upload.single ('profile_image'), validateEdit, usersController.processEdit);
router.post("/eliminar", usersController.delete);

// REGISTRAR Y ALMACENAR USUARIO
router.get("/registrarse", notLoguedMiddleware, usersController.register);
router.post ("/registrarse", upload.single ('profile_image'), validateRegister, usersController.processRegister);

// CERRAR SESION
router.get ('/logout', usersController.logout);

module.exports = router;