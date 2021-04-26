module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
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
        tableName: 'categories',
        timestamps: false
    }
    const Category = sequelize.define(alias, cols, config);

   /*  Category.associate = function (models) {
        Category.hasMany (models.Product, {
            as: "CategoryProduct",
            foreingKey: "CategoryId"
        })
    } */

    return Category;
}