 
const { DataTypes, Sequelize } = require('sequelize')
const { dbInstance } = require('../configs/dbConfig')

const Category = dbInstance.define('category', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  user_id:{
    type:DataTypes.INTEGER.UNSIGNED
  },
  categoryName: {
    type: DataTypes.STRING
  },
  type:{
    type:DataTypes.STRING
  },
  category_description: {
    type: DataTypes.STRING
  },
  createdBy: {
    type: DataTypes.STRING
  },
  updatedBy: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
    enum: ["active", "inactive"]
  }
})
// Category.sync({alter:true})
module.exports = {
  Category
}