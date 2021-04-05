module.exports = (sequelize, dataTypes) => {
    let alias = 'product_size';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
       size: {
            type: dataTypes.STRING,
            allowNull: true
        }
    }
    let config = {
        tableName: 'product_size',
        timestamps: false
    }
    const product_size = sequelize.define(alias, cols, config);
    return product_size;
}