const sequelize = require("../../config/sequelize");
const Flight = require("../models/flight");
const Reservation = require("../models/reservation");
const Seat = require("../models/seat");

// Khách hàng - Đặt vé
exports.bookTicket = async (req, res) => {
  try {
    const { outboundReservation, returnReservation } = req.body;

    // 가는 편 예약 처리
    if (!outboundReservation.flightId || !outboundReservation.seatNumber) {
      return res
        .status(400)
        .json({ error: "Outbound Flight ID and Seat Number are required" });
    }

    // 가는 편 비행기 정보 조회
    const outboundFlight = await Flight.findByPk(outboundReservation.flightId);
    if (!outboundFlight) {
      return res.status(404).json({ error: "Outbound Flight not found" });
    }

    const outboundSeatId = await getSeatIdBySeatNumber(outboundReservation.seatNumber);

    // 가는 편 좌석 중복 예약 확인
    const existingOutboundReservation = await Reservation.findOne({
      where: {
        flightId: outboundReservation.flightId,
        seatId: outboundSeatId,
        status: "confirmed",
      },
    });

    if (existingOutboundReservation) {
      return res
        .status(400)
        .json({ error: "Outbound seat is already reserved" });
    }

    // 가는 편 예약 데이터 준비
    const outboundReservationData = {
      ...outboundReservation,
      userId: req.userId || null,
      seatId: outboundSeatId, // Thêm seatId
      status: "confirmed",
      departureTime: outboundFlight.departureTime,
      arrivalTime: outboundFlight.arrivalTime,
      departureLocation: outboundFlight.departure,
      arrivalLocation: outboundFlight.destination,
      flightNumber: outboundFlight.flightNumber,
    };

    // 가는 편 예약 생성
    const outboundTicket = await Reservation.create(outboundReservationData);

    // 돌아오는 편 예약 처리 (왕복인 경우)
    let returnTicket = null;
    if (returnReservation) {
      if (!returnReservation.flightId || !returnReservation.seatNumber) {
        return res
          .status(400)
          .json({ error: "Return Flight ID and Seat Number are required" });
      }

      // 돌아오는 편 비행기 정보 조회
      const returnFlight = await Flight.findByPk(returnReservation.flightId);
      if (!returnFlight) {
        // 가는 편 예약 롤백
        await outboundTicket.destroy();
        return res.status(404).json({ error: "Return Flight not found" });
      }

      const returnSeatId = await getSeatIdBySeatNumber(returnReservation.seatNumber);

      // 돌아오는 편 좌석 중복 예약 확인
      const existingReturnReservation = await Reservation.findOne({
        where: {
          flightId: returnReservation.flightId,
          seatId: returnSeatId,
          status: "confirmed",
        },
      });

      if (existingReturnReservation) {
        // 가는 편 예약 롤백
        await outboundTicket.destroy();
        return res
          .status(400)
          .json({ error: "Return seat is already reserved" });
      }

      // 돌아오는 편 예약 데이터 준비
      const returnReservationData = {
        ...returnReservation,
        userId: req.userId || null,
        seatId: returnSeatId, // Thêm seatId
        status: "confirmed",
        departureTime: returnFlight.departureTime,
        arrivalTime: returnFlight.arrivalTime,
        departureLocation: returnFlight.departure,
        arrivalLocation: returnFlight.destination,
        flightNumber: returnFlight.flightNumber,
      };

      // 돌아오는 편 예약 생성
      returnTicket = await Reservation.create(returnReservationData);
    }

    res.status(201).json({
      outboundTicket,
      returnTicket,
    });
  } catch (error) {
    console.error("Reservation error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Khách hàng - Hủy vé
exports.cancelTicket = async (req, res) => {
  try {
    const whereClause = {
      id: req.params.id,
    };
    if (req.userId !== undefined) {
      whereClause.userId = req.userId;
    }

    const reservation = await Reservation.destroy({
      where: whereClause,
    });

    reservation
      ? res.json({ message: "Reservation cancelled" })
      : res.status(404).json({ error: "Reservation not found" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateReservationStatus = async (req, res) => {
  try {
    const whereClause = {
      id: req.params.id,
    };

    if (req.userId !== undefined) {
      whereClause.userId = req.userId;
    }
    const [updatedRows] = await Reservation.update(
      {
        status: req.body.status,
        updated_at: new Date(),
      },
      {
        where: whereClause,
      }
    );
    if (updatedRows > 0) {
      res.json({
        message: "Reservation status updated",
        status: req.body.status,
      });
    } else {
      res.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updateNonMemberReservationStatus = async (req, res) => {
  try {
    const [updatedRows] = await Reservation.update(
      {
        status: req.body.status,
        updated_at: new Date(),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (updatedRows > 0) {
      // 업데이트된 예약 정보를 다시 조회
      const updatedReservation = await Reservation.findOne({
        where: {
          id: req.params.id,
        },
      });

      res.json({
        message: "Reservation status updated",
        status: updatedReservation.status,
        reservation: updatedReservation,
      });
    } else {
      res.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    console.error("Update Error:", error);
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

    // Truy vấn với thông tin ghế ngồi
    const reservations = await Reservation.findAll({
      where: whereClause,
      include: [
        {
          model: Seat,
          attributes: ["seatNumber"], // Chỉ lấy seatNumber
        },
      ],
      attributes: [
        "id",
        "flightId",
        "userId",
        "reservationTime",
        "status",
        "createdAt",
        "updatedAt",
      ], // Chỉ lấy các trường cần thiết từ Reservation
    });

    // Chuyển đổi dữ liệu trả về
    const formattedReservations = reservations.map((reservation) => ({
      id: reservation.id,
      flightId: reservation.flightId,
      userId: reservation.userId,
      reservationTime: reservation.reservationTime,
      status: reservation.status,
      createdAt: reservation.createdAt,
      updatedAt: reservation.updatedAt,
      seatNumber: reservation.Seat?.seatNumber || null, // Thay seatId bằng seatNumber
    }));

    res.json(formattedReservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(400).json({ error: error.message });
  }
};

const getSeatIdBySeatNumber = async(seatNumber) => {
  try {
      const seat = await Seat.findOne({
          where: { seatNumber },
          attributes: ['id'] // Chỉ lấy trường id
      });

      return seat ? seat.id : null; // Trả về id hoặc null nếu không tìm thấy
  } catch (error) {
      console.error('Error finding seatId', error);
      throw error; // Ném lỗi ra ngoài nếu có vấn đề
  }
}


exports.getReservationOverview = async(req, res) =>  {
  try {
    const counts = await Reservation.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'total'], // Đếm tổng số lượng reservation
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN status = 'confirmed' THEN 1 END")), 'confirmed'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN status = 'cancelled' THEN 1 END")), 'cancelled']
      ],
      raw: true
    });

    // Trả về số lượng confirmed, cancelled và total
    res.json(counts[0]); // Sẽ trả về một object với số lượng
  } catch (error) {
    console.error("Error fetching reservation overview:", error);
    res.status(400).json({ error: error.message });
  }
}