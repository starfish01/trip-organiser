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