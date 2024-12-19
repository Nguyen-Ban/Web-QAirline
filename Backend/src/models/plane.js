const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Plane = sequelize.define(
  "Plane",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    planeCode: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      field: "plane_code",
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classes: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "", // Giá trị mặc định khi không có hạng ghế nào
      get() {
        // Trả về mảng các hạng ghế
        return this.getDataValue("classes").split(",");
      },
      set(value) {
        // Chuyển mảng thành chuỗi để lưu
        this.setDataValue("classes", value.join(","));
      },
      field: "classes",
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
    tableName: "Planes",
  }
);

module.exports = Plane;
