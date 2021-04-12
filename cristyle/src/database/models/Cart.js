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

    Cart.associate = function (models) {
        Cart.belongsTo (models.User, {
            as: "userCart",
            foreingKey: "user_id"
        })

        Cart.belongsToMany (models.cartProduct, {
            as: "cartProduct",
            through: "carts_products",
            foreingKey: "cart_id",
            otherKey: "product_id",
            timestamps:false
        })
    }

    
    return Cart;
}