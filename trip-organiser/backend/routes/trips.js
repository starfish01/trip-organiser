const express = require("express");
const router = express.Router();

const TripsController = require("../controllers/trips");
const checkAuth = require("../middleware/check-auth");

// router.get("", RestaurantController.getRestaurants);

router.post("/create", checkAuth, TripsController.createTrip);

router.get("", checkAuth, TripsController.getTrips);

router.get("/:id", checkAuth, TripsController.getTrip);

module.exports = router;
