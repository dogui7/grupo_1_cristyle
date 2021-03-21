const fs = require('fs');
const path = require('path');

module.exports = {

    //Devuelve todos los usuarios como un array de objetos literales
    getAll: () => JSON.parse(fs.readFileSync(path.resolve(__dirname, './usersDataBase.json'),{encoding:'utf-8'})),

    //Escribe en la base de datos (importante que pisa todo lo que estuviera, no agrega al final)
    write: (data) => fs.writeFileSync(path.resolve(__dirname, './usersDataBase.json'), JSON.stringify(data, null, 2)),

    //Devuelve un usuario filtrado por id
    getOne: (id) => (JSON.parse(fs.readFileSync(path.resolve(__dirname, './usersDataBase.json'),{encoding:'utf-8'}))).find(user => user.id == id),

    //Busca según un campo
    findByField: function (field, text) {
        let allUsers = this. getAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    }
}