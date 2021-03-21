const {check} = require('express-validator');
const path = require('path');

const validateLogin = [
    check('email')
        .notEmpty().withMessage('Debes completar el correo electrónico').bail()
        .isEmail().withMessage('Debes ingresar un email válido').bail(),

    check('password')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength(8).withMessage('La contraseña debe tener al menos 8 caracteres').bail(),
]

module.exports = validateLogin;