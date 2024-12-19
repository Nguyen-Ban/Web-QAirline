const User = require("../models/user");
const Flight = require("../models/flight");
const Reservation = require("../models/reservation");
const Seat = require("../models/seat");

exports.getAccount = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ["id", "username", "email", "role"],
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = exports.getAdmins = async (req, res) => {
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

exports.getCustomers = async (req, res) => {
  try {
    // Tìm tất cả users có role là 'customer'
    const customers = await User.findAll({
      where: { role: "customer" }, // Kiểm tra role là 'customer'
      attributes: ["username", "email"], // Lấy thông tin username và email
      include: [
        {
          model: Reservation, // Liên kết với Reservation để lấy thông tin đặt vé
          attributes: ["status", "createdAt"], // Lấy status và thời gian đặt vé
          include: [
            {
              model: Flight, // Liên kết với Flight để lấy thông tin chuyến bay
              attributes: ["flightNumber"], // Lấy flightNumber
            },
            {
              model: Seat, // Liên kết với Seat để lấy thông tin ghế
              attributes: ["seatNumber"], // Lấy seatNumber
            },
          ],
        },
      ],
    });

    if (!customers.length) {
      return res.status(404).json({ message: "No customers found" });
    }

    // Định dạng dữ liệu trả về: Tạo một mảng tất cả booking của tất cả khách hàng
    const customerList = [];

    customers.forEach((user) => {
      user.Reservations.forEach((reservation) => {
        customerList.push({
          username: user.username,
          email: user.email,
          flightNumber: reservation.Flight.flightNumber,
          seatNumber: reservation.Seat.seatNumber,
          bookingTime: reservation.createdAt, // Thời gian đặt vé
          bookingStatus: reservation.status,
        });
      });
    });

    // Trả về mảng bookings của tất cả customer
    return res.status(200).json(customerList);
  } catch (error) {
    console.error("Error fetching customer data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
