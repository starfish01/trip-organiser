const Trip = require("../models/trip");


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
    Trip.findById(req.params.id).then(document => {
        res.status(200).json({
            message:'Trip Fetched',
            trip:document
        })
    }).catch((err)=>{
        res.status(200).json({
            message:err.message,
            trip: null
        })
    })
}

