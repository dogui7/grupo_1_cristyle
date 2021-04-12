module.exports = (sequelize, dataTypes) => {
    let alias = 'productSize';
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
    const productSize = sequelize.define(alias, cols, config);

    /* productSize.associate = function (models) {
        productSize.hasMany (models.Product, {
            as: "sizeProduct",
            foreingKey: "size_id"
        })
    }
 */
    return productSize;
}