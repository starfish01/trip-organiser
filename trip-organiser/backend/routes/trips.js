const express = require("express");
const router = express.Router();

const TripsController = require("../controllers/trips");

// router.get("", RestaurantController.getRestaurants);

router.post("/create", TripsController.createTrip);

router.get("", TripsController.getTrips);

router.get("/:id", TripsController.getTrip);

module.exports = router;