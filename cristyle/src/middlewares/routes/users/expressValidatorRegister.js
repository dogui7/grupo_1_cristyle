const {check} = require('express-validator');
const path = require('path');

const validateRegister = [
    check('first_name')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isAlpha().withMessage('El nombre solo puede contener letras').bail(),

    check('last_name')
        .notEmpty().withMessage('Debes completar el apellido').bail()
        .isAlpha().withMessage('El apellido solo puede contener letras').bail(),

    check('role_id')
        .notEmpty().withMessage('Debes elegir una categoria').bail(),

    check('email')
        .notEmpty().withMessage('Debes completar el correo electrónico').bail()
        .isEmail().withMessage('Debes ingresar un email válido').bail(),

    check('password')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength(8).withMessage('La contraseña debe tener al menos 8 caracteres').bail(),

    check('birthdate')
        .notEmpty().withMessage('Debes completar la fecha de nacimiento').bail(),

    check('profile_image')
        .custom((value, {req}) => {
            let file = req.file;
            let acceptedExtendions = ['.jpg', '.png', '.gif', '.JPG', '.PNG', '.GIF'];
            // Si no vino un archivo
            if (!file) {
                throw new Error ('Tienes que subir una imagen de perfil');
            // Si vino un archivo
            } else {
                let fileExtension = path.extname(file.originalname);
                // Si no es una extensión válida
                if (!acceptedExtendions.includes(fileExtension)) {
                    throw new Error ('Las extensiones de archivo permitidas son ' + acceptedExtendions.join(', '))
                }
            }
            // Si no hubo ningun error, devolver true para demostrar que está todo en orden
            return true;
        }),

    check('terminos_condiciones')
        .notEmpty().withMessage('Debes aceptar los términos y condiciones').bail()
]

module.exports = validateRegister;