const User = require("../models/user");

exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.findAll({ where: { role: "admin" } });

    // Corrected mapping to return specific fields
    const adminsData = admins.map((item) => {
      return {
        id: item.id,
        username: item.username,
        email: item.email,
      };
    });

    res.json(adminsData);
  } catch (error) {
    console.error("Error fetching users with admin role:", error);
    res.status(400).json({ error: error.message });
  }
};
