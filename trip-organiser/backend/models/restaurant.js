const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
  restaurantTitle: { type: String, required: true },
  cuisine: { type: String, required: true },
  restaurantLocation: { type: String, required: true },
  restaurantDescription: { type: String, required: true },
  restaurantCost: { type: String, required: true },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
