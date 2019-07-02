const Restaurant = require("../models/restaurant");
const Favourite = require("../models/favourite");

exports.createRestaurant = (req, res, next) => {
  console.log('Create Restaurant');
  const restaurant = new Restaurant({
    ...req.body,
    creator: req.userData.userId,
  });
  console.log(restaurant);
  restaurant.save().then(createdRestaurant => {
    res.status(201).json({
      id: createdRestaurant._id,
      locationId: createdRestaurant.restaurantLocationRef,
      message: "Post Restaurant",
    });
  });
};

exports.getRestaurants = (req, res, next) => {
  console.log("get all restaurants");

  Restaurant.find({restaurantTripRef: req.params.tripId}).then((data) => {
    res.status(200).json({
      message: "Restaurants fetched successfully",
      restaurants: data,
    });
  }).catch((err) => {
    res.status(500).json({
      message: "Something went wrong",
    });
  });
};

exports.updateRestaurant = (req, res, next) => {
  console.log('updating');
  const restaurant = ({
    ...req.body
  });
  Restaurant.updateOne({_id: req.body.id}, restaurant).then((result) => {
    if (result.n === 1) {
      res.status(200).json({message: "Update Successful"});
    } else {
      res.status(404).json({message: "Failed to update"});
    }
  }).catch((error) => {
    res.status(404).json({message: "Failed to update"});
  });

};

exports.deleteRestaurant = (req, res, next) => {
  Restaurant.deleteOne({id: req.params.locationId}).then((result) => {
    if (result.n === 1) {
      res.status(200).json({message: "Delete Successful"});
    }
    res.status(404).js({message: "Delete Failed"});
  }).catch((error) => {
    res.status(404).js({message: "Delete Failed"});
  });
};

exports.favouriteRestaurant = (req, res, next) => {
  console.log('fav clicked');

  const favRestaurant = ({
    location: req.body.location,
    refResSite: req.body.refResSite,
    uid: req.userData.userId,
    favourite: req.body.favourite,
  });

  Favourite.updateOne({location: favRestaurant.location, uid: favRestaurant.uid, refResSite: favRestaurant.refResSite}, favRestaurant, {upsert:true}).then((data)=>{
    res.status(200).json(
      {message: "updated successful"}
      );
  }).catch((data) => {
    res.status(500).json(
      {message: "An error occurred"}
    )
  })
};
