const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Plane = require('./plane');

const Seat = sequelize.define('Seat', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    planeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Plane,
            key: 'id'
        },
        field: 'plane_id'
    },
    seatNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'seat_number'
    },
    class: {
        type: DataTypes.ENUM('economy', 'business', 'first'),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'Seats'
});

Plane.hasMany(Seat, { foreignKey: 'planeId' });
Seat.belongsTo(Plane, { foreignKey: 'planeId' });

module.exports = Seat;
