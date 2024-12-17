const Flight = require("../models/flight");

// Khách hàng - Đặt vé
exports.bookTicket = async (req, res) => {
  try {
    const reservation = await Reservation.create({
      ...req.body,
      userId: req.userId,
    });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Khách hàng - Hủy vé
exports.cancelTicket = async (req, res) => {
    try {
        const whereClause = {
             id: req.params.id
        };
        if (req.userId !== undefined) {
             whereClause.userId = req.userId; 
        } 
        
        const reservation = await Reservation.destroy({
             where: whereClause
        });
        
        reservation
            ? res.json({ message: 'Reservation cancelled' })
            : res.status(404).json({ error: 'Reservation not found' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Khách hàng - Xem các chuyến bay đã đặt
exports.getReservations = async (req, res) => {
    try {
        let whereClause = {};

        if (req.userId) {
             whereClause.userId = req.userId; 
        }

        const reservations = await Reservation.findAll({ where: whereClause });
        res.json(reservations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};