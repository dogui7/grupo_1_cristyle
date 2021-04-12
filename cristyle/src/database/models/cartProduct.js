module.exports = (sequelize, dataTypes) => {
    let alias = 'cartProduct';
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
        tableName: 'carts_products',
        timestamps: false
    }
    const cartProduct = sequelize.define(alias, cols, config);

    return cartProduct;
}