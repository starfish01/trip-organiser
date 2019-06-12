const express = require("express");
const router = express.Router();

const LocationController = require("../controllers/locations");

router.post("/create", LocationController.createLocation);

router.put("/:id", LocationController.updateLocation);

router.get("", LocationController.getLocations);

router.get("/:id", LocationController.getLocation);

router.delete("/:id", LocationController.deleteLocation);

module.exports = router;
