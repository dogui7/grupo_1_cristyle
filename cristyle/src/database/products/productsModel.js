const fs = require('fs');
const path = require('path');

module.exports = {

    //Devuelve todos los productos como un array de objetos literales
    getAll: () => JSON.parse(fs.readFileSync(path.resolve(__dirname, './productsDataBase.json'),{encoding:'utf-8'})),

    //Escribe en la base de datos (importante que pisa todo lo que estuviera, no agrega al final)
    write: (data) => fs.writeFileSync(path.resolve(__dirname, './productsDataBase.json'), JSON.stringify(data, null, 2)),

    //Devuelve un producto filtrado por id
    getOne: (id) => (JSON.parse(fs.readFileSync(path.resolve(__dirname, './productsDataBase.json'),{encoding:'utf-8'}))).find(product => product.id == id),
}