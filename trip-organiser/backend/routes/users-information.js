const express = require("express");
const router = express.Router();
const UserInformationController = require("../controllers/users-information");
const checkAuth = require("../middleware/check-auth");

router.get("/user-list/:data", checkAuth, UserInformationController.getListOfUsersNames);

module.exports = router;
