const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
const Plane = require("./plane");

const Flight = sequelize.define(
  "Flight",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    flightNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      field: "flight_number",
    },
    departure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "departure_time",
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "arrival_time",
    },
    status: {
      type: DataTypes.ENUM(
        "scheduled",
        "delayed",
        "onair",
        "completed",
        "cancelled"
      ),
      defaultValue: "scheduled",
    },
    planeId: {
      type: DataTypes.INTEGER,
      references: {
        model: Plane,
        key: "id",
      },
      field: "plane_id",
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    tableName: "Flights",
  }
);

Plane.hasMany(Flight, { foreignKey: "planeId" });
Flight.belongsTo(Plane, { foreignKey: "planeId" });

module.exports = Flight;
