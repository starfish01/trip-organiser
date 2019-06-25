const User = require("../models/user");
const  async = require("async");

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
