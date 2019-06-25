const Trip = require("../models/trip");

exports.createTrip = (req, res, next) => {
  console.log("Create Trip");
  const userWithAccess = req.userData.userId;
  const trip = new Trip({
    creator: userWithAccess,
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
  console.log("Get Trip");
  Trip.findById(req.params.id).where({ usersWithAccess: req.userData.userId}).then(document => {
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
  console.log("Get Trips");
  //probably will need to implement the query with the users id
  Trip.find({ usersWithAccess: req.userData.userId}).then(documents => {
    res.status(200).json({
      message: "Trips fetched",
      trips: documents,
    });
  });
};
