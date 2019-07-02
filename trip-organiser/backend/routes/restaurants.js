const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const checkIfPartOfTrip = require("../middleware/part-of-trip");


const RestaurantController = require("../controllers/restaurants");

router.get("/:tripId", checkAuth, checkIfPartOfTrip, RestaurantController.getRestaurants);

router.post("/create", checkAuth, checkIfPartOfTrip, RestaurantController.createRestaurant);

router.put("/:id", checkAuth, checkIfPartOfTrip, RestaurantController.updateRestaurant);

router.delete("/:id", checkAuth, checkIfPartOfTrip, RestaurantController.deleteRestaurant);

router.post("/favourite/:restaurantId", checkAuth, checkIfPartOfTrip, RestaurantController.favouriteRestaurant);

router.get("/favourite/get/:tripId", checkAuth, checkIfPartOfTrip, RestaurantController.getFavouriteRestaurant);

module.exports = router;
