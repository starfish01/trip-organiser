const Location = require("../models/location");

exports.createLocation = (req,res,next)=>{
  console.log('Create Location');
  const location = new Location({
    title:req.body.title,
    startDate:req.body.startDate,
    endDate:req.body.endDate
  });
  console.log(location);
  location.save().then(createdLocation => {
    res.status(201).json({
      message:"Post Created",
      id: createdLocation._id
    })
  })
};

exports.updateLocation = (req,res,next) => {
  console.log('put')
  const location = ({
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });
  console.log(location)
  console.log(req.params.id)

  Location.updateOne({
      _id: req.params.id},
    location
  ).then(result => {
    res.status(200).json({ message: "Update successful!" });
  }).catch(error=>{
    console.log(error)
    res.status(404).json({message:"An error occured "+ error})
  });
};

exports.getLocations = (req,res,next)=>{
  console.log("get all locations")
  const locationQuery = Location.find()
  //not implementing query yet not sure if it will be needed
  // it will be needed if you are organiseing a seperate trip

  let fetchedLocations;

  locationQuery.then(documents => {
    fetchedLocations = documents
    return Location.count();
  }).then(count=>{
    res.status(200).json({
      message: 'Post fetched successfully',
      locations: fetchedLocations,
      maxPosts: count
    })
  })
};

exports.getLocation = (req,res,next)=>{

  Location.findById(req.params.id).then(location=>{
    if(location){
      res.status(200).json({
        message:"Location retieved",
        location:location
      })
    }else{
      res.status(404).json({
        message:'Location not found'
      })
    }
  })
};

exports.deleteLocation = (req, res, next) => {
  Location.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
};
