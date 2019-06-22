const express = require("express");
const router = express.Router();

const SiteController = require("../controllers/sites");

router.get("", SiteController.getSites);

router.post("/create", SiteController.createSite);

router.put("/:id", SiteController.updateSite);

router.delete("/:id", SiteController.deleteSite);

module.exports = router;
