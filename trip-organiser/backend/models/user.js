const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//npm i --save mongoose-unique-validator
//package to ensure unique items are unique

const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  lastLogin: {type: String, required: true},
  emailValidated: {type: Boolean},
  loginCouter: {type: Number}
});

//ensures the email is unique
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
