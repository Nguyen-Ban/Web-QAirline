const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes cho khách hàng
router.get("/planes", userController.getPlanes);
router.get("/flights", userController.getFlights);
router.get("/flights/search", userController.searchFlights);
router.post(
  "/reservations",
  authMiddleware.verifyToken,
  userController.bookTicket
);
router.delete(
  "/reservations/:id",
  authMiddleware.verifyToken,
  userController.cancelTicket
);
router.get(
  "/reservations",
  authMiddleware.verifyToken,
  userController.getReservations
);

// Routes cho quản trị viên
router.get("/models", userController.getModelsByManufacturer);

router.get("/planes/:id", userController.getPlaneById);

router.post("/planes", userController.createPlane);
router.put("/planes/:id", userController.updatePlane);
router.delete("/planes/:id", userController.deletePlane);

router.get("/flights/:id", userController.getFlightById);

router.post("/flights", userController.createFlight);
router.put("/flights/:id", userController.updateFlight);
router.delete("/flights/:id", userController.deleteFlight);
router.get(
  "/admin/flights",
  authMiddleware.verifyAdmin,
  userController.getFlightsStats
);
router.put(
  "/flights/:id/delay",
  authMiddleware.verifyAdmin,
  userController.delayFlight
);

router.put("/posts/:id", userController.updatePost);
router.get("/posts", userController.getPosts);
router.get("/posts/:id", userController.getPostById);
router.post("/posts", userController.createPost);
router.delete("/posts/:id", userController.deletePost);

router.get("/admins", userController.getAdmins);

module.exports = router;
