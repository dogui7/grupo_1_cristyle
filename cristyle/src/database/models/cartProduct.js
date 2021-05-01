module.exports = (sequelize, dataTypes) => {
    let alias = 'cartProduct';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cartId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: 'cartsproducts',
        timestamps: false
    }
    const cartProduct = sequelize.define(alias, cols, config);

    return cartProduct;
}