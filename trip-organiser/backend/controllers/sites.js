const Site = require("../models/site");

exports.createSite = (req, res, next) => {
  console.log('Create Site');
  const userWithAccess = req.userData.userId;
  const site = new Site({
    siteCost: req.body.siteCost,
    siteDescription: req.body.siteDescription,
    siteLocation: req.body.siteLocation,
    siteLocationRef: req.body.siteLocationRef,
    siteTitle: req.body.siteTitle,
    siteUrl: req.body.siteUrl,
    creator: userWithAccess,
  });
  console.log(site);
  site.save().then(createdSite => {
    res.status(201).json({
      id: createdSite._id,
      locationId: createdSite.siteLocationRef,
      message: "Post Site",
    });
  });
};

exports.getSites = (req, res, next) => {
  console.log("get all sites");
  const sitesQuery = Site.find();
  //not implementing query yet not sure if it will be needed
  // it will be needed if you are organising a separate trip
  let fetchedSites;

  sitesQuery.then(documents => {
    fetchedSites = documents;
    return Site.count();
  }).then(count => {
    res.status(200).json({
      maxPosts: count,
      message: "Sites fetched successfully",
      sites: fetchedSites,
    });
  });
};

exports.updateSite = (req, res, next) => {
  console.log('updating');
  const site = ({
    siteCost: req.body.siteCost,
    siteDescription: req.body.siteDescription,
    siteLocation: req.body.siteLocation,
    siteLocationRef: req.body.siteLocationRef,
    siteTitle: req.body.siteTitle,
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
  Site.deleteOne({id: req.params.locationId}).then((result) => {
    if (result.n === 1) {
      res.status(200).json({message: "Delete Successful"});
    }
    res.status(404).js({message: "Delete Failed"});
  }).catch((error) => {
    res.status(404).js({message: "Delete Failed"});
  });

};
