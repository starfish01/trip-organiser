const mongoose = require("mongoose");

const userCheckListItem = mongoose.Schema({
    createdById: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    tripId: {type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true},
    completedAt: {type: String},
    description: {type: String, required: true},
    deletedAt: {type: String},
  },
  {timestamps: {createdAt: "created_at"}});

module.exports = mongoose.model("UserCheckListItem", userCheckListItem);
