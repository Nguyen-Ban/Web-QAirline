const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/flights", flightController.getFlights);
router.get("/flights/search", flightController.searchFlights);
router.get("/flights/:id", flightController.getFlightById);
router.post("/flights/", flightController.createFlight);
router.put("/flights/:id", flightController.updateFlight);
router.delete("/flights/:id", flightController.deleteFlight);
router.get(
  "/admin/flights",
  authMiddleware.verifyAdmin,
  flightController.getFlightsStats
);
router.get("/flights-admin", flightController.getFlightsForAdmin);

module.exports = router;
