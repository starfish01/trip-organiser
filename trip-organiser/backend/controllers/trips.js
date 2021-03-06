const Trip = require("../models/trip");

exports.createTrip = (req, res, next) => {
  const userWithAccess = req.userData.userId;
  const trip = new Trip({
    creator: userWithAccess,
    tripDeleted: false,
    tripTitle: req.body.tripTitle,
  });
  trip.usersWithAccess.push(userWithAccess);
  trip.save().then(createdTrip => {
    res.status(201).json({
      message: "Trip Created",
      id: createdTrip._id,
    });
  });
};

exports.getTrip = (req, res, next) => {
  Trip.findById(req.params.id).where({usersWithAccess: req.userData.userId}).then(document => {
    res.status(200).json({
      message: "Trip Fetched",
      trip: document,
    });
  }).catch((err) => {
    res.status(200).json({
      message: err.message,
      trip: null,
    });
  });
};

exports.getTrips = (req, res, next) => {
  Trip.find({usersWithAccess: req.userData.userId, tripDeleted: false}).then(documents => {
    res.status(200).json({
      message: "Trips fetched",
      trips: documents,
    });
  });
};

exports.updateTrip = (req, res, next) => {
  Trip.updateOne({_id: req.body.tripId}, {tripTitle: req.body.tripTitle}).then((result) => {
    res.status(200).json({
      message: "Updated",
    });
  }).catch((err) => {
    res.status(500).json({
      message: "An issue occurred",
    });
  });
};

exports.deleteTrip = (req, res, next) => {
  Trip.updateOne({_id: req.params.tripId}, {tripDeleted: true}).then((result) => {
    res.status(200).json({
      message: "Deleted",
    });
  }).catch((err) => {
    res.status(500).json({
      message: "An issue occurred",
    });
  });
};
