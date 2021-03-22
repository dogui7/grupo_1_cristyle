const {check} = require('express-validator');
const path = require('path');

const validateRegister = [
    check('firstName')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isAlpha().withMessage('El nombre solo puede contener letras').bail(),

    check('lastName')
        .notEmpty().withMessage('Debes completar el apellido').bail()
        .isAlpha().withMessage('El apellido solo puede contener letras').bail(),

    check('category')
        .notEmpty().withMessage('Debes elegir una categoria').bail(),

    check('email')
        .notEmpty().withMessage('Debes completar el correo electrónico').bail()
        .isEmail().withMessage('Debes ingresar un email válido').bail(),

    check('password')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength(8).withMessage('La contraseña debe tener al menos 8 caracteres').bail(),

    check('birthdate')
        .notEmpty().withMessage('Debes completar la fecha de nacimiento').bail(),

    check('userImage')
        .custom((value, {req}) => {
            let file = req.file;
            let acceptedExtendions = ['.jpg', '.png', '.gif'];
            if (!file) {
                throw new Error ('Tienes que subir una imagen de perfil');
            } else {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtendions.includes(fileExtension)) {
                    throw new Error ('Las extensiones de archivo permitidas son ' + acceptedExtendions.join(', '))
                }
            }
            return true;
        }),

    check('terminos_condiciones')
        .notEmpty().withMessage('Debes aceptar los términos y condiciones').bail()
]

module.exports = validateRegister;