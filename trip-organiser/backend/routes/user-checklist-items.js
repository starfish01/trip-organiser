const express = require("express");
const router = express.Router();


const UserChecklistItems = require("../controllers/user-checklist-items");
const checkAuth = require("../middleware/check-auth");
const checkIfPartOfTrip = require("../middleware/part-of-trip");

router.get("/:tripId", checkAuth, checkIfPartOfTrip, UserChecklistItems.getChecklistItems);

router.post("/add-item", checkAuth, checkIfPartOfTrip, UserChecklistItems.addChecklistItem);

router.post("/remove-item", checkAuth, checkIfPartOfTrip, UserChecklistItems.removeChecklistItem);


module.exports = router;
