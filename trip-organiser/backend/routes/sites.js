const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const checkIfPartOfTrip = require("../middleware/part-of-trip");


const SiteController = require("../controllers/sites");

router.get("/:tripId", checkAuth, checkIfPartOfTrip, SiteController.getSites);

router.post("/create", checkAuth, checkIfPartOfTrip, SiteController.createSite);

router.put("/:id", checkAuth, checkIfPartOfTrip, SiteController.updateSite);

router.delete("/:id", checkAuth, checkIfPartOfTrip, SiteController.deleteSite);

router.post("/favourite/:sitesId", checkAuth, checkIfPartOfTrip, SiteController.favouriteSite);

router.get("/favourite/get/:tripId", checkAuth, checkIfPartOfTrip, SiteController.getFavouriteSite);

module.exports = router;
