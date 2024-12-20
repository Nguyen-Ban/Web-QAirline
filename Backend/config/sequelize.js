const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize("QAirline", "root", "huyfcbayern", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

sequelize
  .authenticate()
  .then(async () => {
    console.log("Kết nối cơ sở dữ liệu thành công");
    await initAdminAccount();
  })
  .catch((error) => {
    console.error("Lỗi kết nối", error);
  });

const initAdminAccount = async () => {
  try {
    const [results, metadata] = await sequelize.query(
      "SELECT * FROM Users WHERE username = 'admin'"
    );

    if (results.length === 0) {
      const hashedPassword = await bcrypt.hash("admin", 10);

      await sequelize.query(`
          INSERT INTO Users (username, password, email, role)
          VALUES ('admin', '${hashedPassword}', 'admin@qairline.com', 'admin')
        `);

      console.log("Tài khoản super admin đã được tạo thành công.");
    } else {
      console.log("Tài khoản super admin đã tồn tại trong cơ sở dữ liệu.");
    }
  } catch (error) {
    console.error("Lỗi khởi tạo tài khoản super admin:", error);
  }
};

module.exports = sequelize;
