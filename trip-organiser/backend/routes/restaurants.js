const express = require("express");
const router = express.Router();

const RestaurantController = require("../controllers/restaurants");

router.get("", RestaurantController.getRestaurants);

router.post("/create", RestaurantController.createRestaurant);

module.exports = router;
