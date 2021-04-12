module.exports = (sequelize, dataTypes) => {
    let alias = 'userRole';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
       role: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config = {
        tableName: 'user_role',
        timestamps: false
    }
    const userRole = sequelize.define(alias, cols, config);

    userRole.associate = function (models) {
        userRole.hasMany (models.User, {
            as: "user",
            foreingKey: "role_id"
        })
    }
    return userRole;
}