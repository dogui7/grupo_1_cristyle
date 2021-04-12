module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        size_id: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        image: {
            type: dataTypes.STRING,
            allowNull: true
        },
        gender: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: 'products',
        timestamps: false
    }
    const Product = sequelize.define(alias, cols, config);

    /*  Product.associate = function (models){
        Product.belongsToMany (models.Cart, {
            as: "products",
            through: "carts_products",
            foreingKey: "product_id",
            otherKey: "cart_id",
            timestamps: false
        })

        Product.belongsTo (models.productSize, {
            as: "productSize",
            foreingKey: "size_id"
        })

        Product.belongsTo (models.productCategory, {
            as: "productCategory",
            foreingKey: "category_id"
        })
    }  */


    return Product;
}