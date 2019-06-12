const Restaurant = require("../models/restaurant");

exports.createRestaurant = (req, res, next) => {
  console.log('Create Restaurant');
  const restaurant = new Restaurant({

    restaurantTitle: req.body.restaurantTitle,
    cuisine: req.body.cuisine,
    restaurantLocation: req.body.restaurantLocation,
    restaurantDescription: req.body.restaurantDescription,
    restaurantCost: req.body.restaurantCost,
    restaurantLocationRef: req.body.restaurantLocationRef,
    restaurantUrl: req.body.restaurantUrl,

  });
  console.log(restaurant);
  restaurant.save().then(createdRestaurant => {
    res.status(201).json({
      id: createdRestaurant._id,
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
    fetchedRestaurants = documents
    return Restaurant.count();
  }).then(count => {
    res.status(200).json({
      message: 'Restaurants fetched successfully',
      restaurants: fetchedRestaurants,
      maxPosts: count
    })
  })
};

