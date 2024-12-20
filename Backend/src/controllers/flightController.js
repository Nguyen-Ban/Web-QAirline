const Flight = require("../models/flight");
const Plane = require("../models/plane");
const FlightPrice = require("../models/flightPrice");
const { Op } = require("sequelize");
const Reservation = require("../models/reservation");
const sequelize = require("../../config/sequelize");

// Xem tất cả chuyến bay
exports.getFlights = async (req, res) => {
  try {
    const flights = await Flight.findAll({
      include: [
        {
          model: Plane,
          attributes: ["id", "model", "manufacturer"],
        },
        {
          model: FlightPrice,
          attributes: ["class", "price", "seatCount"],
        },
      ],
      attributes: [
        "id",
        "flightNumber",
        "departure",
        "destination",
        "departureTime",
        "arrivalTime",
        "status",
      ],
    });

    const formattedFlights = flights.map((flight) => ({
      id: flight.id,
      flightNumber: flight.flightNumber,
      departure: flight.departure,
      destination: flight.destination,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      status: flight.status,
      plane: flight.Plane,
      prices: flight.FlightPrices.map((price) => ({
        class: price.class,
        price: price.price,
        seatCount: price.seatCount,
      })), // 수정함
    }));

    res.json(formattedFlights);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Tìm kiếm chuyến bay
exports.searchFlights = async (req, res) => {
  const { departure, destination, departureDate, returnDate, tripType } =
    req.query;

  try {
    // Validate required parameters
    if (!departure || !destination) {
      return res
        .status(400)
        .json({ error: "Departure and destination are required" });
    }

    // Prepare date-based conditions
    const whereConditions = [];

    // Outbound flight condition
    const outboundCondition = {
      departure,
      destination,
      ...(departureDate && {
        departure_time: {
          [Op.between]: [
            new Date(departureDate),
            new Date(new Date(departureDate).setHours(23, 59, 59)),
          ],
        },
      }),
    };
    whereConditions.push(outboundCondition);

    // Round trip condition
    if (tripType === "roundtrip" && returnDate) {
      const returnCondition = {
        departure: destination,
        destination: departure,
        departure_time: {
          [Op.between]: [
            new Date(returnDate),
            new Date(new Date(returnDate).setHours(23, 59, 59)),
          ],
        },
      };
      whereConditions.push(returnCondition);
    }

    // Fetch flights
    const flightPromises = whereConditions.map((condition) =>
      Flight.findAll({
        where: { departure, destination, status: ["scheduled", "delayed"] },
        include: [
          {
            model: Plane,
            attributes: ["id", "model", "manufacturer"],
          },
          {
            model: FlightPrice,
            attributes: ["class", "price", "seatCount"],
          },
        ],
        attributes: [
          "id",
          "flightNumber",
          "departure",
          "destination",
          "departureTime",
          "arrivalTime",
          "status",
        ],
      })
    );

    const flightsResults = await Promise.all(flightPromises);

    // Flatten and format results
    const formattedFlights = flightsResults.flat().map((flight) => ({
      id: flight.id,
      flightNumber: flight.flightNumber,
      departure: flight.departure,
      destination: flight.destination,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      status: flight.status,
      plane: flight.Plane,
      prices: flight.FlightPrices.map((price) => ({
        class: price.class,
        price: price.price,
        seatCount: price.seatCount,
      })),
    }));

    if (formattedFlights.length === 0) {
      return res.status(404).json({ error: "No flights found" });
    }

    res.json(formattedFlights);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFlightsForAdmin = async (req, res) => {
  try {
    const flights = await Flight.findAll({
      include: [
        {
          model: Plane,
          attributes: ["planeCode"],
        },
      ],
      attributes: [
        "id",
        "flightNumber",
        "departure",
        "destination",
        "departureTime",
        "arrivalTime",
        "status",
      ],
    });

    const formattedFlights = await Promise.all(
      flights.map(async (flight) => {

        return {
          id: flight.id,
          flightNumber: flight.flightNumber,
          planeCode: flight.Plane?.planeCode || "N/A", // Lấy planeCode hoặc trả về "N/A" nếu không có
          departure: flight.departure,
          destination: flight.destination,
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime,
          status: flight.status, // Dùng `status` mới nếu cần
        };
      })
    );
    res.json(formattedFlights);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFlightById = async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL parameters

  try {
    const flight = await Flight.findOne({
      where: { id }, // Search for the Flight by id
      include: [
        {
          model: Plane,
          attributes: ["planeCode"], // Chỉ lấy cột planeCode từ bảng Plane
        },
      ],
      attributes: [
        "id",
        "flightNumber",
        "departure",
        "destination",
        "departureTime",
        "arrivalTime",
        "status",
      ],
    });

    // Check if the Flight was found
    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }

    // Format dữ liệu trả về
    const formattedFlight = {
      id: flight.id,
      flightNumber: flight.flightNumber,
      planeCode: flight.Plane?.planeCode || "N/A", // Lấy planeCode nếu có
      departure: flight.departure,
      destination: flight.destination,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      status: flight.status,
    };

    res.json(formattedFlight); // Return the flight details in the response
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createFlight = async (req, res) => {
  try {
    const {
      flightCode,
      planeCode,
      departure,
      destination,
      departureTime,
      arrivalTime,
    } = req.body;

    // Tìm planeId từ bảng Plane dựa trên planeCode
    const plane = await Plane.findOne({
      where: { planeCode },
      attributes: ["id"], // Chỉ cần lấy id
    });

    if (!plane) {
      return res
        .status(404)
        .json({ error: "Plane not found with the provided planeCode" });
    }

    // Tạo đối tượng Flight mới mà không lưu vào cơ sở dữ liệu ngay lập tức
    const flight = Flight.build({
      flightNumber: flightCode,
      planeId: plane.id, // Gán planeId đã tìm được
      departure,
      destination,
      departureTime,
      arrivalTime,
    });

    // Lưu đối tượng vào cơ sở dữ liệu bằng save
    await flight.save();

    res.status(201).json(flight);
  } catch (error) {
    console.error("Error creating flight:", error);
    res.status(400).json({ error: error.message });
  }
};


exports.updateFlight = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID chuyến bay từ params
    const {
      flightCode,
      planeCode,
      departure,
      destination,
      departureTime,
      arrivalTime,
      status,
    } = req.body;

    // Tìm planeId từ bảng Plane dựa trên planeCode
    const plane = await Plane.findOne({
      where: { planeCode },
      attributes: ["id"], // Chỉ cần lấy id
    });

    if (!plane) {
      return res
        .status(404)
        .json({ error: "Plane not found with the provided planeCode" });
    }

    // Tìm chuyến bay hiện tại
    const flight = await Flight.findByPk(id);
    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }

    // Cập nhật các trường
    flight.flightNumber = flightCode;
    flight.planeId = plane.id; // Gán planeId đã tìm được
    flight.departure = departure;
    flight.destination = destination;
    flight.departureTime = departureTime;
    flight.arrivalTime = arrivalTime;
    flight.status = status;

    // Lưu bản ghi và kích hoạt hook
    await flight.save();

    // Lấy lại chuyến bay đã được cập nhật
    const updatedFlight = await Flight.findByPk(id, {
      include: [{ model: Plane, attributes: ["planeCode"] }],
    });

    res.json({ message: "Flight updated", updatedFlight });
  } catch (error) {
    console.error("Error updating flight:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Flight.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: "Flight deleted" });
    } else {
      res.status(404).json({ error: "Flight not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Quản trị viên - Xem và thống kê dữ liệu
exports.getFlightsStats = async (req, res) => {
  try {
    const flights = await Flight.findAll();
    res.json({ totalFlights: flights.length, flights });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFlightPrices = async (req, res) => {
  try {
    const flightPrices = await FlightPrice.findAll();
    res.json(flightPrices);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flight prices" });
  }
};


exports.getRouteOverview = async (req, res) => {
  try {
    const topRoutes = await Reservation.findAll({
      attributes: [
        [sequelize.fn('CONCAT', sequelize.col('Flight.departure'), '-', sequelize.col('Flight.destination')), 'route'],
        [sequelize.fn('COUNT', sequelize.col('Reservation.id')), 'bookings']
      ],
      include: [
        {
          model: Flight,
          attributes: [], 
        }
      ],
      group: ['Flight.departure', 'Flight.destination'],
      order: [[sequelize.fn('COUNT', sequelize.col('Reservation.id')), 'DESC']],
      limit: 10,
      raw: true,
    });


    const formattedRoutes = topRoutes.reduce((acc, route) => {
      const [departure, destination] = route.route.split('-');
      const formattedRoute = departure < destination ? `${departure}-${destination}` : `${destination}-${departure}`;
      

      if (acc[formattedRoute]) {
        acc[formattedRoute].bookings += route.bookings;
      } else {
        acc[formattedRoute] = { route: formattedRoute, bookings: route.bookings };
      }

      return acc;
    }, {});

    const finalRoutes = Object.values(formattedRoutes);

    res.json(finalRoutes);
  } catch (error) {
    console.error("Error fetching reservation overview:", error);
    res.status(400).json({ error: error.message });
  }
};
