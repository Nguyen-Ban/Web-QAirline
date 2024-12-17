const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const authMiddleware = require("../middleware/authMiddleware");
const flightController = require("../controllers/flightController");
const planeController = require("../controllers/planeController");
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");

// Routes cho reservation

router.post("/reservations", reservationController.bookTicket);
router.delete("/reservations/:id", reservationController.cancelTicket);
router.get("/reservations", reservationController.getReservations);

// Routes cho flight

// Cho Customer
router.get("/flights", flightController.getFlights);
router.get("/flights/search", flightController.searchFlights);

// Cho Admin
router.get("/flights-admin", flightController.getFlightsForAdmin);
router.get("/flights/:id", flightController.getFlightById);
router.post("/flights", flightController.createFlight);
router.put("/flights/:id", flightController.updateFlight);
router.delete("/flights/:id", flightController.deleteFlight);

// Route cho Plane
router.get("/planes", planeController.getPlanes);
router.get("/plane-codes", planeController.getAvailablePlaneCodes);
router.get("/planes/:id", planeController.getPlaneById);
router.post("/planes", planeController.createPlane);
router.put("/planes/:id", planeController.updatePlane);
router.delete("/planes/:id", planeController.deletePlane);

// Route cho Post
router.get("/posts", postController.getPosts);
router.get("/posts/:id", postController.getPostById);
router.post("/posts", postController.createPost);
router.put("/posts/:id", postController.updatePost);
router.delete("/posts/:id", postController.deletePost);

// Route cho User

// Cho Admin
router.get("/admins", userController.getAdmins);

module.exports = router;
