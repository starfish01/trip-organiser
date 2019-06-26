const express = require("express");
const router = express.Router();
const UserInformationController = require("../controllers/users-information");
const checkAuth = require("../middleware/check-auth");
const checkIfPartOfTrip = require("../middleware/part-of-trip");

router.get("/user-list/:data", checkAuth, UserInformationController.getListOfUsersNames);

router.post('/addusertotrip', checkAuth, checkIfPartOfTrip, UserInformationController.addusertotrip);

module.exports = router;
