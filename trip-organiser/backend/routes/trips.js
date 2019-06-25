const express = require("express");
const router = express.Router();

const TripsController = require("../controllers/trips");
const checkAuth = require("../middleware/check-auth");

// router.get("", RestaurantController.getRestaurants);

router.post("/create", checkAuth, TripsController.createTrip);

router.get("/:id", checkAuth, TripsController.getTrip);

router.get("", checkAuth, TripsController.getTrips);

module.exports = router;
