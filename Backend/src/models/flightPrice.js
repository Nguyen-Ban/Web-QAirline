const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize')
const Flight = require('./flight');

const FlightPrice = sequelize.define('FlightPrice', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  flightId: {
    type: DataTypes.INTEGER,
    references: {
      model: Flight,
      key: 'id',
    },
    onDelete: 'CASCADE',
    field: 'flight_id'
  },
  class: {
    type: DataTypes.ENUM('economy', 'business', 'first'),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'FlightPrices',
});

Flight.hasMany(FlightPrice, { foreignKey: 'flightId' });
FlightPrice.belongsTo(Flight, { foreignKey: 'flightId' });

module.exports = FlightPrice;