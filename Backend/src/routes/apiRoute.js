const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const postRoute = require("./postRoute");
const planeRoute = require("./planeRoute");
const flightRoute = require("./flightRoute");
const reservationRoute = require("./reservationRoute");
const authRoute = require("./authRoute");

// Use the separated routes
router.use("/users", userRoute);
router.use("/users", postRoute);
router.use("/users", planeRoute);
router.use("/users", flightRoute);
router.use("/users", reservationRoute);
router.use("/auth", authRoute);

module.exports = router;