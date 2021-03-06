const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const locationRoutes = require("./routes/locations");
const restaurantRoutes = require("./routes/restaurants");
const tripsRoutes = require("./routes/trips");
const sitesRoutes = require("./routes/sites");
const userRoutes = require("./routes/user");
const usersInformation = require("./routes/users-information");
const userChecklistItems = require("./routes/user-checklist-items");

const app = express();


mongoose.connect("mongodb+srv://patrickLabes:" + process.env.MONGO_ATLAS_PW + "@cluster0-trg7g.mongodb.net/trip-data?retryWrites=true&w=majority")
  .then(() => {
    // console.log('Connection Made')
  }).catch((err) => {
  // console.log('Connection Failed ' + err)
});

app.use("/", express.static(path.join(__dirname, "angular")));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT",
  );
  next();
});

app.use("/api/locations", locationRoutes);

app.use("/api/restaurants", restaurantRoutes);

app.use("/api/trips", tripsRoutes);

app.use("/api/sites", sitesRoutes);

app.use("/api/users/", userRoutes);

app.use("/api/user-information/", usersInformation);

app.use("/api/user-checklist/", userChecklistItems);

app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname, "angular", "index.html"))
});

module.exports = app;
