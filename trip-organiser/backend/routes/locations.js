const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");


const LocationController = require("../controllers/locations");

router.post("/create", checkAuth, LocationController.createLocation);

router.put("/:id", checkAuth,LocationController.updateLocation);

router.get("", checkAuth,LocationController.getLocations);

router.get("/:id", checkAuth,LocationController.getLocation);

router.delete("/:id", checkAuth,LocationController.deleteLocation);

module.exports = router;
