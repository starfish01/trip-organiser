const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
    tripTitle: {type: String, required: true},
   },
  {timestamps: {createdAt: "created_at"}});

module.exports = mongoose.model("Trip", tripSchema);
