const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/reservations",
  authMiddleware.verifyToken,
  reservationController.bookTicket
);
router.delete(
  "/reservations/:id",
  authMiddleware.verifyToken,
  reservationController.cancelTicket
);
router.get(
  "/reservations",
  authMiddleware.verifyToken,
  reservationController.getReservations
);
router.post('/nonmember-reservations', reservationController.bookTicket);
router.delete('/nonmember-reservations/:id', reservationController.cancelTicket);

module.exports = router;