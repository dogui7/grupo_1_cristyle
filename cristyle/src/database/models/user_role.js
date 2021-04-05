module.exports = (sequelize, dataTypes) => {
    let alias = 'user_role';
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
    const user_role = sequelize.define(alias, cols, config);
    return user_role;
}