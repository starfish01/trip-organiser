const Site = require("../models/site");
const Favourite = require("../models/favourite");

exports.createSite = (req, res, next) => {

  const userWithAccess = req.userData.userId;
  const site = new Site({
    ...req.body,
    creator: userWithAccess,
  });
  site.save().then(createdSite => {
    res.status(201).json({
      id: createdSite._id,
      locationId: createdSite.siteLocationRef,
      message: "Post Site",
    });
  });
};

exports.getSites = (req, res, next) => {
  Site.find({siteTripRef: req.params.tripId}).then((data) => {
    res.status(200).json({
      message: "Sites fetched successfully",
      sites: data,
    });
  }).catch((err) => {
    res.status(500).json({
      message: "Something went wrong",
    });
  });
};

exports.updateSite = (req, res, next) => {
  const site = ({
    siteTitle: req.body.siteTitle,
    siteLocation: req.body.siteLocation,
    siteDescription: req.body.siteDescription,
    siteCost: req.body.siteCost,
    siteUrl: req.body.siteUrl,
  });

  Site.updateOne({_id: req.body.id}, site).then((result) => {
    if (result.n === 1) {
      res.status(200).json({message: "Update Successful"});
    } else {
      res.status(404).json({message: "Failed to update"});
    }
  }).catch((error) => {
    res.status(404).json({message: "Failed to update"});
  });

};

exports.deleteSite = (req, res, next) => {
  Site.deleteOne({_id: req.params.id}).then((result) => {
    if (result.n === 1) {
      res.status(200).json({message: "Delete Successful"});
    }
    res.status(404).json({message: "Delete Failed"});
  }).catch((error) => {
    res.status(404).json({message: "Delete Failed"});
  });
};



exports.favouriteSite = (req, res, next) => {
  const favSite = ({
    location: req.body.location,
    favourite: req.body.favourite,
    refResSite: req.body.refResSite,
    tripId: req.body.tripId,
    uid: req.userData.userId,
    type: 'site',
    userName: req.body.userName,
  });

  Favourite.updateOne({
    location: favSite.location,
    refResSite: favSite.refResSite,
    uid: favSite.uid,
    tripId: favSite.tripId,
  }, favSite, {upsert: true}).then((data) => {

    let favId = null;

    if (data.upserted) {
      favId = data.upserted[0]._id;
    }

    res.status(200).json(
      {message: "updated successful", favId},
    );
  }).catch((data) => {
    res.status(500).json(
      {message: "An error occurred"},
    );
  });
};

exports.getFavouriteSite = (req, res, next) => {
  Favourite.find({tripId: req.params.tripId, type: 'site'}).then((data) => {
    res.status(200).json(
      {message: "updated successful", favSites: data},
    );
  }).catch((data) => {
    res.status(500).json(
      {message: "An error occurred"},
    );
  });
};
