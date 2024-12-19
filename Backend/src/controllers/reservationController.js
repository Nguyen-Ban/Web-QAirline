const Flight = require("../models/flight");
const Reservation = require('../models/reservation');

// Khách hàng - Đặt vé
exports.bookTicket = async (req, res) => {
  try {
    const { outboundReservation, returnReservation } = req.body;

    // 가는 편 예약 처리
    if (!outboundReservation.flightId || !outboundReservation.seatId) {
      return res.status(400).json({ error: 'Outbound Flight ID and Seat ID are required' });
    }

    // 가는 편 비행기 정보 조회
    const outboundFlight = await Flight.findByPk(outboundReservation.flightId);
    if (!outboundFlight) {
      return res.status(404).json({ error: 'Outbound Flight not found' });
    }

    // 가는 편 좌석 중복 예약 확인
    const existingOutboundReservation = await Reservation.findOne({
      where: {
        flightId: outboundReservation.flightId,
        seatId: outboundReservation.seatId,
        status: 'confirmed'
      }
    });

    if (existingOutboundReservation) {
      return res.status(400).json({ error: 'Outbound seat is already reserved' });
    }

    // 가는 편 예약 데이터 준비
    const outboundReservationData = {
      ...outboundReservation,
      userId: req.userId || null,
      status: 'confirmed',
      departureTime: outboundFlight.departureTime,
      arrivalTime: outboundFlight.arrivalTime,
      departureLocation: outboundFlight.departure,
      arrivalLocation: outboundFlight.destination,
      flightNumber: outboundFlight.flightNumber
    };

    // 가는 편 예약 생성
    const outboundTicket = await Reservation.create(outboundReservationData);

    // 돌아오는 편 예약 처리 (왕복인 경우)
    let returnTicket = null;
    if (returnReservation) {
      if (!returnReservation.flightId || !returnReservation.seatId) {
        return res.status(400).json({ error: 'Return Flight ID and Seat ID are required' });
      }

      // 돌아오는 편 비행기 정보 조회
      const returnFlight = await Flight.findByPk(returnReservation.flightId);
      if (!returnFlight) {
        // 가는 편 예약 롤백
        await outboundTicket.destroy();
        return res.status(404).json({ error: 'Return Flight not found' });
      }

      // 돌아오는 편 좌석 중복 예약 확인
      const existingReturnReservation = await Reservation.findOne({
        where: {
          flightId: returnReservation.flightId,
          seatId: returnReservation.seatId,
          status: 'confirmed'
        }
      });

      if (existingReturnReservation) {
        // 가는 편 예약 롤백
        await outboundTicket.destroy();
        return res.status(400).json({ error: 'Return seat is already reserved' });
      }

      // 돌아오는 편 예약 데이터 준비
      const returnReservationData = {
        ...returnReservation,
        userId: req.userId || null,
        status: 'confirmed',
        departureTime: returnFlight.departureTime,
        arrivalTime: returnFlight.arrivalTime,
        departureLocation: returnFlight.departure,
        arrivalLocation: returnFlight.destination,
        flightNumber: returnFlight.flightNumber
      };

      // 돌아오는 편 예약 생성
      returnTicket = await Reservation.create(returnReservationData);
    }

    res.status(201).json({
      outboundTicket,
      returnTicket
    });

  } catch (error) {
    console.error('Reservation error:', error);
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