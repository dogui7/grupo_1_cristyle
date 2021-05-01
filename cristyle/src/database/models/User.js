module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        birthdate: {
            type: dataTypes.DATE,
            allowNull: true
        },
        roleId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        profileImage: {
            type: dataTypes.STRING,
            allowNull: true
        },
        deleted: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: 'users',
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsTo (models.userRole, {
            as: "userRole",
            foreingKey: "roleId"
        })

        User.hasMany (models.Cart, {
            as: "userCart",
            foreingKey: "userId"
        })
    }

    return User;
}