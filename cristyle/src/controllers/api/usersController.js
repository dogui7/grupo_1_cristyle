const db = require ("../../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const apiUsersController = {

    allUsers: function (req,res) {
        db.User.findAll({where: {deleted: 0}})
        .then(usersInDb => {

            let newArray = usersInDb.map((user) => {
                return user.dataValues;
            });

            // Eliminamos la información sensible que no queremos enviar, dejando solo el ID, firstName, lastName, email, y url
            newArray.forEach((user) => {
                delete user.password;
                delete user.birthdate;
                delete user.roleId;
                delete user.profileImage;
                delete user.deleted;
                user.detailURL = `http://localhost:3500/api/usuarios/${user.id}`
            })

            return res.status(200).json({
                total: usersInDb.length,
                data: newArray,
                status: 200
            })
        })
        .catch(error => {console.log(error)});
    },

    userId: function (req,res) {
        db.User.findByPk(req.params.id)
        .then(user => {
            if (user != null) {
                userToSend = user.dataValues;
                // Eliminamos la información sensible que no queremos enviar, dejando solo el ID, firstName, lastName, email, y url de imagen
                delete userToSend.password;
                delete userToSend.birthdate;
                delete userToSend.roleId;
                delete userToSend.profileImage;
                delete userToSend.deleted;

                return res.status(200).json({
                    data: {
                        userToSend,
                        imageURL: `/public/images/users/${userToSend.image}`
                    },
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