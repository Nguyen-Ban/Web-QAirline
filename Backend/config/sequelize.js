const { Sequelize } = require("sequelize");
const initSuperAdmin = require("./initSuperAdmin");

const sequelize = new Sequelize("QAirline", "root", "huyfcbayern", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

sequelize
  .authenticate()
  .then(async () => {
    console.log("Kết nối cơ sở dữ liệu thành công");
    await initSuperAdmin();
  })
  .catch((error) => {
    console.error("Lỗi kết nối", error);
  });

module.exports = sequelize;
