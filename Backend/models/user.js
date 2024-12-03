const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('customer', 'admin'),
        allowNull: false,
        defaultValue: 'customer'
    },
    createdAt: { 
        type: DataTypes.DATE, 
        field: 'created_at', 
        defaultValue: DataTypes.NOW 
    },
    updatedAt: { 
        type: DataTypes.DATE, 
        field: 'updated_at', 
        defaultValue: DataTypes.NOW 
    }
}, {
    timestamps: true,
    tableName: 'Users'
});

module.exports = User;
