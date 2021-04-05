module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
       first_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        last_name: {
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
        role_id: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        profile_image: {
            type: dataTypes.STRING,
            allowNull: true
        }
    }
    let config = {
        tableName: 'users',
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config);
    return User;
}