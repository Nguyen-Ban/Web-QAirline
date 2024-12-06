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
router.post("/planes", authMiddleware.verifyAdmin, userController.createPlane);
router.put(
  "/planes/:id",
  authMiddleware.verifyAdmin,
  userController.updatePlane
);
router.delete(
  "/planes/:id",
  authMiddleware.verifyAdmin,
  userController.deletePlane
);

router.post(
  "/flights",
  authMiddleware.verifyAdmin,
  userController.createFlight
);
router.put(
  "/flights/:id",
  authMiddleware.verifyAdmin,
  userController.updateFlight
);
router.delete(
  "/flights/:id",
  authMiddleware.verifyAdmin,
  userController.deleteFlight
);
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

router.put("/posts/:id", authMiddleware.verifyAdmin, userController.updatePost);
router.get("/posts", userController.getPosts);
router.post("/posts", authMiddleware.verifyAdmin, userController.createPost);
router.delete(
  "/posts/:id",
  authMiddleware.verifyAdmin,
  userController.deletePost
);

module.exports = router;
