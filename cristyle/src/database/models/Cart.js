module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        totalPrice: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        totalSaved: {
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
            foreingKey: "userId"
        })

        Cart.belongsToMany (models.cartProduct, {
            as: "cartProduct",
            through: "cartsProducts",
            foreingKey: "cartId",
            otherKey: "productId",
            timestamps:false
        })
    }

    
    return Cart;
}