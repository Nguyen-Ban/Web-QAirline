const { Op } = require("sequelize");
const Flight = require("../models/flight");
const Plane = require("../models/plane");

exports.getPlanes = async (req, res) => {
  try {
    const planes = await Plane.findAll();
    res.json(planes);
  } catch (error) {
    console.error("Error fetching planes:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAvailablePlaneCodes = async (req, res) => {
  try {
    const planes = await Plane.findAll({
      attributes: ["id", "planeCode"],
      include: [
        {
          model: Flight,
          attributes: [], // Không cần lấy dữ liệu từ Flight
          required: false, // LEFT JOIN thay vì INNER JOIN
        },
      ],
      where: {
        "$Flights.id$": { [Op.is]: null }, // Điều kiện: không có Flight nào liên kết
      },
    });

    res.json(planes);
  } catch (error) {
    console.error("Error fetching available plane codes:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getPlaneById = async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL parameters

  try {
    const plane = await Plane.findOne({
      where: {
        id, // Search for the plane by postId
      },
    });

    // Check if the plane was found
    if (!plane) {
      return res.status(404).json({ error: "Plane not found" });
    }

    res.json(plane); // Return the plane details in the response
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Quản trị viên - Đăng thông tin máy bay
exports.createPlane = async (req, res) => {
  try {
    const { planeCode, model, manufacturer, seatCapacity } = req.body;
    const plane = await Plane.create({
      planeCode,
      model,
      manufacturer,
      seatCapacity,
    });
    res.status(201).json(plane);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePlane = async (req, res) => {
  try {
    const { id } = req.params;
    const { model, manufacturer, seatCapacity, planeCode } = req.body;
    const [update] = await Plane.update(
      {
        model,
        manufacturer,
        seatCapacity,
        planeCode,
      },
      { where: { id } }
    );
    if (update) {
      const updatedPlane = await Plane.findByPk(id);
      res.json({ message: "Plane updated", updatedPlane });
    } else {
      res.status(404).json({ error: "Plane not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePlane = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Plane.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: "Plane deleted" });
    } else {
      res.status(404).json({ error: "Plane not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};