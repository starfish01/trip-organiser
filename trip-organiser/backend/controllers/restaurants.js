const Restaurant = require("../models/restaurant");

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
  const data = req.body

  console.log(req.body)

  const fav = {
    _id: req.body.uid,
    favourite: req.body.favourite,
  };

  Restaurant.findById({_id: req.params.restaurantId}).updateOne({usersWhoLike: {_id: fav._id} }, {$set: {"usersWhoLike": fav}}, { upsert: true, new: true, setDefaultsOnInsert: true }).then((data)=>{
    console.log(data)
  });

  // Restaurant.findById({_id: req.params.restaurantId}).then((data) => {
  //   const c = data.usersWhoLike.findIndex(el => el._id.toString() === fav._id.toString());

  // Restaurant({_id: req.params.restaurantId}).where().usersWhoLike.updateOne({_id: fav._id}, {$set: {"usersWhoLike": fav}).then((data) => {
  //   console.log(data);
  // });
  // })
  // console.log('aaa')
  // console.log(data.usersWhoLike[0]._id)
  // console.log(fav._id)
  // console.log(c)
// })

  // Restaurant.updateOne({_id: req.params.restaurantId}, {$set:{"usersWhoLike":fav}}).then((result) => {
  //
  //   res.status(200).json({
  //     data,
  //     message: "Saved",
  //   });
  // }).catch((err) => {
  //   res.status(500).json({
  //     message: "Something went wrong",
  //   });
  // });
}
;
