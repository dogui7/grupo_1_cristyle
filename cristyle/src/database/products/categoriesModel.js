const fs = require('fs');
const path = require('path');

module.exports = {

    //Devuelve todas las categories como un array de strings
    getAll: () => JSON.parse(fs.readFileSync(path.resolve(__dirname, './categories.json'),{encoding:'utf-8'})),
}