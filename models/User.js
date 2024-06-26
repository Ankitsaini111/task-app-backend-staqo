const { DataTypes, Sequelize } = require('sequelize')
const { dbInstance } = require('../configs/dbConfig')

const User = dbInstance.define('user', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    userName: {
        type: DataTypes.STRING,
        alowNull: false,
        unique: true
    },
    role: {
        type:DataTypes.STRING,
        defaultValue: 'user',
        enum: ['admin', 'user']
    },
    email: {
        type: DataTypes.STRING,
        alowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false

    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
        enum: ["active", "inactive"]
    }
})
User.sync()

module.exports = {
    User
}