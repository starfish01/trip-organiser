const Location = require("../models/location");

exports.createLocation = (req, res, next) => {
  const userWithAccess = req.userData.userId;
  const location = new Location({
    ...req.body,
    creator: userWithAccess,
  });
  location.save().then(createdLocation => {
    res.status(201).json({
      id: createdLocation._id,
      message: "Post Created",
    });
  });
};

exports.updateLocation = (req, res, next) => {
  const location = ({
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    stay: req.body.stay,
  });
  Location.updateOne({
      _id: req.params.id
    },
    location
  ).then(result => {
    res.status(200).json({message: "Update successful!"});
  }).catch(error => {
    res.status(404).json({message: "An error occurred " + error});
  });
};

exports.getLocations = (req, res, next) => {
  const tripId = req.query.tripId;
  const locationQuery = Location.find();

  if (tripId) {
    locationQuery.where('tripId').equals(tripId).sort('startDate')
  }

  let fetchedLocations;

  locationQuery.then(documents => {
    fetchedLocations = documents;
    return Location.count();
  }).then(count => {
    res.status(200).json({
      message: "Post fetched successfully",
      locations: fetchedLocations,
      maxPosts: count,
    });
  });
};

exports.getLocation = (req, res, next) => {

  Location.findById(req.params.id).then(location => {
    if (location) {
      res.status(200).json({
        message: "Location retieved",
        location: location,
      });
    } else {
      res.status(404).json({
        message: 'Location not found'
      });
    }
  });
};

exports.deleteLocation = (req, res, next) => {
  Location.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({message: "Post deleted!"});
  });
};
