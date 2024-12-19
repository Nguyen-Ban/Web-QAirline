const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("QAirline", "root", "huyfcbayern", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Kết nối cơ sở dữ liệu thành công");
  })
  .catch((error) => {
    console.error("Lỗi kết nối", error);
  });

module.exports = sequelize;
