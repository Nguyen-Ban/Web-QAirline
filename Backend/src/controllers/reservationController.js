const Flight = require("../models/flight");
const Reservation = require("../models/reservation");

// Khách hàng - Đặt vé
exports.bookTicket = async (req, res) => {
  try {
    /*let whereClause = {};

    if (req.userId) {
      whereClause.userId = req.userId;
    }

    const reservations = await Reservation.findAll({ where: whereClause });*/
    const { flightId, seatId } = req.body;

    // 필수 데이터 검증
    if (!flightId || !seatId) {
      return res.status(400).json({ error: 'Flight ID and Seat ID are required' });
    }

    // 좌석 중복 예약 확인
    const existingReservation = await Reservation.findOne({
      where: { flightId, seatId, status: 'confirmed' }
    });

    if (existingReservation) {
      return res.status(400).json({ error: 'This seat is already reserved' });
    }

    const reservationData = req.userId
      ? { ...req.body, userId: req.userId }  // 회원 예약
      : { ...req.body, userId: null };      // 비회원 예약

    const reservation = await Reservation.create(reservationData);
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