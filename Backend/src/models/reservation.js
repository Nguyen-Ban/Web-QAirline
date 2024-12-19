const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
const User = require("./user");
const Flight = require("./flight");
const Seat = require("./seat");

const Reservation = sequelize.define(
  "Reservation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      field: "user_id",
    },
    flightId: {
      type: DataTypes.INTEGER,
      references: {
        model: Flight,
        key: "id",
      },
      field: "flight_id",
    },
    seatId: {
      type: DataTypes.INTEGER,
      references: {
        model: Seat,
        key: "id",
      },
      field: "seat_id",
    },
    reservationTime: {
      type: DataTypes.DATE,
      field: "reservation_time",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    status: {
      type: DataTypes.ENUM("confirmed", "cancelled"),
      defaultValue: "confirmed",
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

    tableName: "Reservations",
  }
);

User.hasMany(Reservation, { foreignKey: "userId" });
Reservation.belongsTo(User, { foreignKey: "userId" });

Flight.hasMany(Reservation, { foreignKey: "flightId" });
Reservation.belongsTo(Flight, { foreignKey: "flightId" });

Seat.hasOne(Reservation, { foreignKey: "seatId" });
Reservation.belongsTo(Seat, { foreignKey: "seatId" });

module.exports = Reservation;
