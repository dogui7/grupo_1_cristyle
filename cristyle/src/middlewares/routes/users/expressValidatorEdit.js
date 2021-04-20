const {check} = require('express-validator');
const path = require('path');

const validateEdit = [
    check('first_name')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isAlpha().withMessage('El nombre solo puede contener letras').bail(),

    check('last_name')
        .notEmpty().withMessage('Debes completar el apellido').bail()
        .isAlpha().withMessage('El apellido solo puede contener letras').bail(),

    check('birthdate')
        .notEmpty().withMessage('Debes completar la fecha de nacimiento').bail(),

    check('profile_image')
    .custom((value, {req}) => {
        let file = req.file;
        let acceptedExtendions = ['.jpg', '.png', '.gif', '.JPEG', '.JPG', '.GIF', '.PNG'];
        // Si vino un archivo
        if (file != null) {
            let fileExtension = path.extname(file.originalname);
            // Si no es una extensión válida
            if (!acceptedExtendions.includes(fileExtension)) {
                throw new Error ('Las extensiones de archivo permitidas son ' + acceptedExtendions.join(', '))
            }
        }
        // Si no hubo ningun error, devolver true para demostrar que está todo en orden 
        return true;
    })
]

module.exports = validateEdit;