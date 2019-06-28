const User = require("../models/user");
const Trip = require("../models/trip");
const async = require("async");


exports.getListOfUsersNames = (req, res, next) => {
  console.log("Get List Of Users Names");
  const listOfUserIds = JSON.parse(req.params.data);
  const arrayOfNames = [];

  async.forEach(listOfUserIds, (userDataId, callback) => {
    User.findById(userDataId).then((userData) => {
      arrayOfNames.push({
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
      callback();
    });
  }).then(() => {
    res.status(200).json({
      message: "Users Fetched",
      usersNames: arrayOfNames,
    });
  });
};

exports.addusertotrip = (req, res, next) => {
  console.log('adding user to a trip')

  //find user with email
  User.findOne({email: req.body.email}, (err, user) => {
    // Couldn't find user
    if (user == null) {
      res.status(404).json({
        message: "Couldn't find user with that email",
      });
      return;
    }

    const userData = {
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
    };

    Trip.updateOne({_id: req.body.tripId}, {$addToSet: {usersWithAccess: user._id}}).then(result => {
      res.status(200).json({
        userData,
        message: "Member Added",
      });
    });
  });
};

exports.removeAttendee = (req,res,next) => {
  console.log(req.body)
  Trip.updateOne({_id:req.body.tripId}, {$pull:{usersWithAccess:req.body.uid}}).then((res) => {
    console.log(res)

    //TODO implement response

  })
};
