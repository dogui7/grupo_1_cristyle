const db = require ("../../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const apiUsersController = {

    allUsers: function (req,res) {
        db.User.findAll({where: {deleted: 0}})
        .then(usersInDb => {

            // Eliminamos la información sensible que no queremos enviar, dejando solo el ID, firstName, lastName, email, y url
            // No funciona
            usersInDb.forEach( (user) => {
                delete user.password;
                delete user.birthdate;
                delete user.roleId;
                delete user.profileImage;
                delete user.deleted;
            }) 
            // URL de detalle?
            return res.status(200).json({
                total: usersInDb.length,
                data: usersInDb,
                status: 200
            })
        })
        .catch(error => {console.log(error)});
    },

    userId: function (req,res) {
        db.User.findByPk(req.params.id)
        .then(userToSend => {
            if (userToSend != null) {
                // Eliminamos la información sensible que no queremos enviar, dejando solo el ID, firstName, lastName, email, y url de imagen
                // No funciona
                delete userToSend.password;
                delete userToSend.birthdate;
                delete userToSend.roleId;
                delete userToSend.profileImage;
                delete userToSend.deleted;
                userToSend.imageUrl = userToSend.profileImage;
                return res.status(200).json({
                    data: userToSend,
                    status: 200
                })
            }
            return res.send({
                error: 'No se encuentra el usuario pedido, intente con otro ID',
            })
        })
        .catch(error => {console.log(error)});
    }

}

module.exports = apiUsersController;