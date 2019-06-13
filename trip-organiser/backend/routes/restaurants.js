const express = require("express");
const router = express.Router();

const RestaurantController = require("../controllers/restaurants");

router.get("", RestaurantController.getRestaurants);

router.post("/create", RestaurantController.createRestaurant);

router.put("/:id", RestaurantController.updateRestaurant);

router.delete("/:id", RestaurantController.deleteRestaurant);

module.exports = router;
