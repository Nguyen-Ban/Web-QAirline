const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/admins", userController.getAdmins);
router.get("/customers", userController.getCustomers);

module.exports = router;
