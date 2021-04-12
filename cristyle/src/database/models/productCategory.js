module.exports = (sequelize, dataTypes) => {
    let alias = 'productCategory';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
       category: {
            type: dataTypes.STRING,
            allowNull: true
        }
    }
    let config = {
        tableName: 'product_category',
        timestamps: false
    }
    const productCategory = sequelize.define(alias, cols, config);

   /*  productCategory.associate = function (models) {
        productCategory.hasMany (models.Product, {
            as: "categoryProduct",
            foreingKey: "category_id"
        })
    } */

    return productCategory;
}