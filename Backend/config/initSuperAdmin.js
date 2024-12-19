const bcrypt = require("bcrypt");
const User = require("./models/User");

const initAdmin = async () => {
  try {
    await User.sync();

    const adminExists = await User.findOne({ where: { username: "admin" } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin", 10);

      await User.create({
        username: "admin",
        password: hashedPassword,
        email: "admin@qairline.com",
        role: "admin",
      });

      console.log("Tài khoản super admin đã được tạo.");
    } else {
      console.log("Tài khoản super admin đã tồn tại.");
    }
  } catch (error) {
    console.error("Lỗi khởi tạo tài khoản super admin:", error);
  }
};

module.exports = initAdmin;
