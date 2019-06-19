const Trip = require("../models/trips");


exports.createTrip = (req, res, next) => {
    console.log('Create Trip');
    const trip = new Trip({
        tripTitle: req.body.tripTitle,
    });
    console.log(trip);
    trip.save().then(createdTrip => {
        res.status(201).json({
            message: "Trip Created",
            id: createdTrip._id
        })
    })
};

exports.getTrips = (req,res,next) => {
    console.log('Get Trips')
    //probably will need to implement the query with the users id
    Trip.find().then(documents => {
        res.status(200).json({
            message: "Trips fetched",
            trips:documents
        })
    })  
}

exports.getTrip = (req,res,next) => {
    console.log('Get Trip')
    // Trip.findById(req.params.id)
    console.log(req.params.id)
}

