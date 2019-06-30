const Site = require("../models/site");

exports.createSite = (req, res, next) => {
  console.log('Create Site');
  const userWithAccess = req.userData.userId;
  const site = new Site({
    ...req.body,
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
  console.log(req.params.tripId)

  Site.find({siteTripRef: req.params.tripId}).then((data) => {
    console.log(data)
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
  console.log('updating');
  const site = ({
    ...req.body,
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
