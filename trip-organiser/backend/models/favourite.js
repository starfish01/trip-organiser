const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema({
  favourite: {type: String},
  location: {type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true},
  refResSite: {type: mongoose.Schema.Types.ObjectId, required: true},
  tripId: {type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true},
  uid: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  type: {type: String, required: true},
  userName: {type: String, required: true}
});

module.exports = mongoose.model("Favourite", favouriteSchema);
