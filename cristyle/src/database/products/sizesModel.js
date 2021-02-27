const fs = require('fs');
const path = require('path');

module.exports = {

    //Devuelve todas las sizes como un array de strings
    getAll: () => JSON.parse(fs.readFileSync(path.resolve(__dirname, './sizes.json'),{encoding:'utf-8'})),
}