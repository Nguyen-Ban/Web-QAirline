const express = require("express");
const router = express.Router();
const planeController = require("../controllers/planeController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/planes", planeController.getPlanes);
router.get("/plane-codes", planeController.getAvailablePlaneCodes);
router.get("/planes/:id", planeController.getPlaneById);
router.post("/planes", planeController.createPlane);
router.put("/planes/:id", planeController.updatePlane);
router.delete("/planes/:id", planeController.deletePlane);

module.exports = router;
