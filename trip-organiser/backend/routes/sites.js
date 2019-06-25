const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");


const SiteController = require("../controllers/sites");

router.get("", SiteController.getSites);

router.post("/create", checkAuth, SiteController.createSite);

router.put("/:id", checkAuth, SiteController.updateSite);

router.delete("/:id", checkAuth, SiteController.deleteSite);

module.exports = router;
