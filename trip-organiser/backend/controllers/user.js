const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user.save()
      .then(result => {
        res.status(201).json({
          message: "User Created",
          result: result,
        });
      }).catch(err => {
      res.status(500).json({
        message: "Invalid authentication credentials!",
      });
    });
  });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email}).then(user => {
    if (!user) {
      return res.status(401).json({
        message: "Auth Failed",
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if (!result) {
      res.status(401).json({
        message: "Invalid authentication details",
      });
    }
    const token = jwt.sign({
        email: fetchedUser.email,
        userId: fetchedUser._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      },
    );

    res.status(200).json({
      expiresIn: "3600",
      message: "Logged in",
      token: token,
      userId: fetchedUser._id,
    });
    // We get the userId in the token however it would impact performance
    // if we would have to decode the token on the client side

  }).catch(err => {
    console.log(err);
    res.status(401).json({
      message: "You are not authenticated",
    });
  });
};
