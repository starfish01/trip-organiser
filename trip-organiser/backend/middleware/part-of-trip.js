const Trip = require("../models/trip");

module.exports = (req, res, next) => {
  try {
    // console.log('middleWare part of trip')
    Trip.findOne({_id: req.body.tripId, usersWithAccess: req.userData.userId}, (err, user) => {
      if (err) {
        res.status(404).json({
          message: "User Doesnt have access to this trip",
        });
      } else {
        next();
      }
    });
  } catch (error) {
    res.status(404).json({
      message: "Something Failed",
    });
  }
};
