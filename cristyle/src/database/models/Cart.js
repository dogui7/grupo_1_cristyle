module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        total_price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        total_saved: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: 'carts',
        timestamps: false
    }
    const Cart = sequelize.define(alias, cols, config);
    return Cart;
}