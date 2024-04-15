const { DataTypes, sequelize } = require('sequelize')
const { dbInstance } = require('../configs/dbConfig')
const contants = require('../utils/contants')

const Product = dbInstance.define('product', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement:true
    },
    productName: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    product_price: {
        type: DataTypes.STRING
    },
    product_color: {
        type: DataTypes.STRING
    },
    product_MRP: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: contants._status.ACTIVE
    },
    created_by: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    updated_by: {
        type: DataTypes.INTEGER.UNSIGNED
    }
})

Product.sync()
module.exports = {
    Product
}
