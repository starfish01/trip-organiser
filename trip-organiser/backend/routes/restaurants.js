const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");


const RestaurantController = require("../controllers/restaurants");

router.get("", checkAuth, RestaurantController.getRestaurants);

router.post("/create", checkAuth, RestaurantController.createRestaurant);

router.put("/:id", checkAuth, RestaurantController.updateRestaurant);

router.delete("/:id", checkAuth, RestaurantController.deleteRestaurant);

module.exports = router;
