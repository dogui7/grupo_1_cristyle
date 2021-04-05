module.exports = (sequelize, dataTypes) => {
    let alias = 'product_size';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
       cart_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: 'product_size',
        timestamps: false
    }
    const product_size = sequelize.define(alias, cols, config);
    return product_size;
}