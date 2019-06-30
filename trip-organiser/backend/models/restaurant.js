const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
    restaurantTitle: {type: String, required: true},
    cuisine: {type: String, required: true},
    restaurantLocation: {type: String, required: true},
    restaurantDescription: {type: String, required: true},
    restaurantCost: {type: String, required: true},
    restaurantUrl: {type: String},
    restaurantLocationRef: {type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true},
    restaurantTripRef: {type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    usersWhoLike: [{
      uid: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
      favourite: {type: String},
    },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at"
    },
  },
  )
;

module.exports = mongoose.model("Restaurant", restaurantSchema);
