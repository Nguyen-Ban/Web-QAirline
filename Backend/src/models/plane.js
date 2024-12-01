const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const Plane = sequelize.define('Plane', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manufacturer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    seatCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'seat_capacity',
    }
}, {
    timestamps: true,
    tableName: 'Planes'
});

module.exports = Plane;
