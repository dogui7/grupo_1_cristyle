const {check} = require('express-validator');
const path = require('path');

const validateProducts = [
    check('name')
        .notEmpty().withMessage('Debes completar el nombre del producto').bail(),

    check('price')
        .notEmpty().withMessage('Debes completar el precio del producto').bail()
        .isInt().withMessage('El precio debe ser un número').bail()
        .isInt({min: 0}).withMessage('El precio debe ser positivo').bail(),

    check('discount')
        .notEmpty().withMessage('Debes poner al menos 0 de descuento').bail()
        .isInt().withMessage('El descuento debe ser un número, sin simbolo de porcentaje').bail()
        .isInt({min: 0, max: 99}).withMessage('El descuento tiene que estar en el rango de 0 a 99').bail(),

    check('category')
        .notEmpty().withMessage('Debes elegir una categoría').bail(),
        
    check('size')
        .notEmpty().withMessage('Debes elegir un talle').bail(),

    check('productImage')
        .custom((value, {req}) => {
            let file = req.file;
            let acceptedExtendions = ['.jpg', '.png', '.gif'];
            // Si se subió un archivo
            if (file != null) {
                let fileExtension = path.extname(file.originalname);
                // Si no es una extensión válida
                if (!acceptedExtendions.includes(fileExtension)) {
                    throw new Error ('Las extensiones de archivo permitidas son ' + acceptedExtendions.join(', '))
                }
            }
            // Si no hubo ningun error, devolver true para demostrar que está todo en orden 
            return true;
        }),

    check('gender')
        .notEmpty().withMessage('Debes elegir una opción').bail(),
        
    check('description')
        .notEmpty().withMessage('Debes completar la descripción del producto').bail(),   
]

module.exports = validateProducts;