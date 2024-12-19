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
router.patch(
  "/reservations/:id",
  authMiddleware.verifyToken,
  reservationController.updateReservationStatus
);

router.get(
  "/reservations",
  authMiddleware.verifyToken,
  reservationController.getReservations
);

router.post('/nonmember-reservations', reservationController.bookTicket);
router.delete('/nonmember-reservations/:id', reservationController.cancelTicket);
router.get('/nonmember-reservations', reservationController.getReservations);
router.patch('/nonmember-reservations/:id', reservationController.updateNonMemberReservationStatus);

module.exports = router;