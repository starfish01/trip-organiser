const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    title: { type: String, required: true },
    startDate: { type: Number, required: true },
    endDate: { type: Number, required: true },
    stay: {type: String},
    tripId: {type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true}
  });
  
  module.exports = mongoose.model("Location", locationSchema);


