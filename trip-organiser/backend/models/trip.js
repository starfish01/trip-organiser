const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    tripTitle: {type: String, required: true},
    usersWithAccess: [{ type : mongoose.Schema.Types.ObjectId, ref: "User" }],
    tripDeleted: {type: Boolean},
   },
  {timestamps: {createdAt: "created_at"}});

module.exports = mongoose.model("Trip", tripSchema);
