module.exports = (sequelize, dataTypes) => {
    let alias = 'product_category';
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
    const product_category = sequelize.define(alias, cols, config);
    return product_category;
}