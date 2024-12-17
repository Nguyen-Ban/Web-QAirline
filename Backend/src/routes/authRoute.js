const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/account", authMiddleware.verifyToken, authController.getAccount);
router.get('/current-user', authMiddleware.verifyToken, authController.getCurrentUser);

module.exports = router;
