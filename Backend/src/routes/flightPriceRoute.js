const express = require("express");
const router = express.Router();
const flightPriceController = require("../controllers/flightPriceController");

// ROute cho Flight Prices
router.get("/flight-prices", flightPriceController.getFlightPrices);
router.get(
  "/flight-prices/:id",
  flightPriceController.getFlightPriceByFlightId
);
router.get("/flights-unpriced", flightPriceController.getFlightUnpriced);

router.post("/flight-prices", flightPriceController.addFlightPrice);
router.put("/flight-prices/:id", flightPriceController.updateFlightPrice);
router.delete("/flight-prices/:id", flightPriceController.deleteFlightPrice);
module.exports = router;
