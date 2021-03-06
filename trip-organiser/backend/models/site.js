const mongoose = require("mongoose");

const siteSchema = mongoose.Schema({
    siteTitle: {type: String, required: true},
    siteLocation: {type: String, required: true},
    siteDescription: {type: String, required: true},
    siteCost: {type: String, required: true},
    siteUrl: {type: String},
    siteLocationRef: {type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true},
    siteTripRef: {type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    usersWhoLike: [{ type : mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {timestamps: {createdAt: "created_at"}});

module.exports = mongoose.model("Site", siteSchema);
