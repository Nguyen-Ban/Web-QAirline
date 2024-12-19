const { Op } = require("sequelize");
const Flight = require("../models/flight");
const FlightPrice = require("../models/flightPrice");
exports.getFlightPrices = async (req, res) => {
  try {
    const flightPrices = await Flight.findAll({
      attributes: ["id", "flightNumber"],
      include: [
        {
          model: FlightPrice,
          attributes: ["class", "price"],
          where: {
            price: { [Op.ne]: null }, // Lọc các chuyến bay có giá vé
          },
          required: true, // Chỉ lấy các chuyến bay có giá vé
        },
      ],
    });

    const result = flightPrices.map((flight) => {
      const prices = {
        flightId: flight.id,
        flightNumber: flight.flightNumber,
        firstPrice: null,
        businessPrice: null,
        economyPrice: null,
      };

      flight.FlightPrices.forEach((price) => {
        if (price.class === "first") prices.firstPrice = price.price;
        if (price.class === "business") prices.businessPrice = price.price;
        if (price.class === "economy") prices.economyPrice = price.price;
      });

      return prices;
    });

    res.json(result); // Trả về JSON response
  } catch (error) {
    console.error("Error fetching flight prices:", error);
    res.status(500).json({ error: "Failed to fetch flight prices" });
  }
};
exports.getFlightPriceByFlightId = async (req, res) => {
  const flightId = req.params.id; // Lấy id từ tham số URL

  try {
    const flight = await Flight.findOne({
      where: { id: flightId }, // Lọc theo flightId
      attributes: ["id", "flightNumber"],
      include: [
        {
          model: FlightPrice,
          attributes: ["class", "price"],
        },
      ],
    });

    if (!flight) {
      return res.status(404).json({ error: "Flight not found" }); // Trả về lỗi nếu không tìm thấy chuyến bay
    }

    const result = {
      flightId: flight.id,
      flightNumber: flight.flightNumber,
      first: null,
      business: null,
      economy: null,
    };

    // Lọc giá theo hạng
    flight.FlightPrices.forEach((price) => {
      if (price.class === "first") result.first = price.price;
      if (price.class === "business") result.business = price.price;
      if (price.class === "economy") result.economy = price.price;
    });

    return res.json(result); // Trả về thông tin chuyến bay và giá
  } catch (error) {
    console.error("Error fetching flight by ID:", error);
    return res.status(500).json({ error: "Failed to fetch flight" });
  }
};

exports.getFlightUnpriced = async (req, res) => {
  try {
    const flightsUnprices = await Flight.findAll({
      include: [
        {
          model: FlightPrice,
          required: false, // Cho phép LEFT JOIN, để lấy cả những flights không có giá
          attributes: [], // Không lấy dữ liệu từ FlightPrice
        },
      ],
      where: {
        "$FlightPrices.id$": null, // Điều kiện lọc: chỉ lấy các chuyến bay không có FlightPrice
      },
      attributes: ["id", "flightNumber"], // Chỉ lấy id và flightNumber từ Flight
    });

    res.json(flightsUnprices);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addFlightPrice = async (req, res) => {
  const { flightNumber, firstPrice, businessPrice, economyPrice } = req.body; // Lấy dữ liệu từ request body

  if (!flightNumber || !firstPrice || !businessPrice || !economyPrice) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Kiểm tra xem chuyến bay có tồn tại không
    const flight = await Flight.findOne({ where: { flightNumber } });
    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }
    // Kiểm tra xem có giá cho các hạng vé đã tồn tại không
    const existingPrices = await FlightPrice.findAll({
      where: { flightId: flight.id },
    });

    // Nếu đã có giá cho các hạng vé, trả về lỗi
    if (existingPrices.length > 0) {
      return res
        .status(400)
        .json({ error: "Prices already exist for this flight" });
    }

    // Tạo mới giá cho từng hạng vé với seat_count mặc định là 80
    const prices = [
      { class: "first", price: firstPrice, flightId: flight.id, seatCount: 80 },
      {
        class: "business",
        price: businessPrice,
        flightId: flight.id,
        seatCount: 80,
      },
      {
        class: "economy",
        price: economyPrice,
        flightId: flight.id,
        seatCount: 80,
      },
    ];

    // Lưu từng giá vào bảng FlightPrice
    const flightPrices = await FlightPrice.bulkCreate(prices);

    return res.status(201).json(flightPrices); // Trả về danh sách các giá mới
  } catch (error) {
    console.error("Error adding flight prices:", error);
    return res.status(500).json({ error: "Failed to add flight prices" });
  }
};

exports.updateFlightPrice = async (req, res) => {
  const flightId = req.params.id; // Lấy flightId từ URL parameter
  const { firstPrice, businessPrice, economyPrice } = req.body;

  if (!firstPrice || !businessPrice || !economyPrice) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Kiểm tra xem chuyến bay có tồn tại không
    const flight = await Flight.findByPk(flightId); // Tìm chuyến bay bằng flightId
    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }

    // Tìm tất cả các giá vé cho chuyến bay này
    const existingPrices = await FlightPrice.findAll({
      where: { flightId: flight.id },
    });

    if (existingPrices.length === 0) {
      return res.status(404).json({ error: "No prices found for this flight" });
    }

    // Cập nhật giá cho từng hạng vé
    await Promise.all(
      existingPrices.map(async (price) => {
        // Cập nhật giá dựa trên loại hạng vé
        if (price.class === "first") {
          price.price = firstPrice;
        }
        if (price.class === "business") {
          price.price = businessPrice;
        }
        if (price.class === "economy") {
          price.price = economyPrice;
        }

        // Lưu giá đã cập nhật
        await price.save();
      })
    );

    // Trả về thông báo thành công
    return res
      .status(200)
      .json({ message: "Flight prices updated successfully" });
  } catch (error) {
    console.error("Error updating flight prices:", error);
    return res.status(500).json({ error: "Failed to update flight prices" });
  }
};

exports.deleteFlightPrice = async (req, res) => {
  const flightId = req.params.id; // Lấy flightId từ URL parameter

  if (!flightId) {
    return res.status(400).json({ error: "Missing flightId" });
  }

  try {
    // Tìm tất cả giá vé cho chuyến bay với flightId
    const flightPrices = await FlightPrice.findAll({
      where: { flightId },
    });

    if (flightPrices.length === 0) {
      return res
        .status(404)
        .json({ error: "No flight prices found for this flightId" });
    }

    // Xóa tất cả giá vé của chuyến bay này
    await FlightPrice.destroy({
      where: { flightId },
    });

    // Trả về thông báo thành công
    return res.status(200).json({
      message: "All flight prices for this flightId deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting flight prices:", error);
    return res.status(500).json({ error: "Failed to delete flight prices" });
  }
};

exports.updateSeatCapacity = async (req, res) => {
  try {
    const { flightPriceId } = req.params;
    const { class: travelClass } = req.query; // Lấy travelClass từ query string


   const flightPrice = await FlightPrice.findOne({
      where: {
        flightId: flightPriceId,
        class: travelClass,
      },
    });

    if (!flightPrice) {
      return res.status(404).json({ error: "Flight price not found" });
    }

    if (flightPrice.seat_count <= 0) {
      return res.status(400).json({ error: "No seats available" });
    }

    // Decrement seat count
    await flightPrice.decrement("seat_count");

    // Get updated record
    const updatedFlightPrice = await FlightPrice.findByPk(flightPriceId);

    res.json(updatedFlightPrice);
  } catch (error) {
    console.error("Error updating seat capacity:", error);
    res.status(500).json({ error: "Failed to update seat capacity" });
  }
};
