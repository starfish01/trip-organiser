const Restaurant = require("../models/restaurant");

exports.createRestaurant = (req, res, next) => {
  console.log('Create Restaurant');
  const restaurant = new Restaurant({
    cuisine: req.body.cuisine,
    restaurantCost: req.body.restaurantCost,
    restaurantDescription: req.body.restaurantDescription,
    restaurantLocation: req.body.restaurantLocation,
    restaurantLocationRef: req.body.restaurantLocationRef,
    restaurantTitle: req.body.restaurantTitle,
    restaurantUrl: req.body.restaurantUrl,

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
  const restaurantsQuery = Restaurant.find();
  //not implementing query yet not sure if it will be needed
  // it will be needed if you are organising a separate trip

  let fetchedRestaurants;

  restaurantsQuery.then(documents => {
    fetchedRestaurants = documents;
    return Restaurant.count();
  }).then(count => {
    res.status(200).json({
      maxPosts: count,
      message: "Restaurants fetched successfully",
      restaurants: fetchedRestaurants,
    });
  });
};

exports.updateRestaurant = (req, res, next) => {
  console.log('updating');
  const restaurant = ({
    cuisine: req.body.cuisine,
    restaurantCost: req.body.restaurantCost,
    restaurantDescription: req.body.restaurantDescription,
    restaurantLocation: req.body.restaurantLocation,
    restaurantLocationRef: req.body.restaurantLocationRef,
    restaurantTitle: req.body.restaurantTitle,
    restaurantUrl: req.body.restaurantUrl,
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
