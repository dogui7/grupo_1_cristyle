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
        sizeId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        categoryId: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        image: {
            type: dataTypes.STRING,
            allowNull: true
        },
        gender: {
            type: dataTypes.STRING,
            allowNull: false
        },
        deleted: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: 'products',
        timestamps: false
    }
    const Product = sequelize.define(alias, cols, config);

      Product.associate = function (models){
        Product.belongsToMany (models.Cart, {
            as: "products",
            through: "cartsProducts",
            foreingKey: "productId",
            otherKey: "cartId",
            timestamps: false
        })

        Product.belongsTo (models.Size, {
            as: "size",
            foreingKey: "sizeId"
        })

        Product.belongsTo (models.Category, {
            as: "category",
            foreingKey: "categoryId"
        })
    }  


    return Product;
}