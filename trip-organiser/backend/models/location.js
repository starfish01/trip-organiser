const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    title: { type: String, required: true },
    startDate: { type: Number, required: true },
    endDate: { type: Number, required: true },
    stay: {type: String},
  });
  
  module.exports = mongoose.model("Location", locationSchema);


