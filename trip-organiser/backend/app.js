const express = require('express');
const bodyParser = require("body-parser");

// const Post = require('./models/post')
const mongoose = require("mongoose")

const locationRoutes = require('./routes/locations')

const app = express();


mongoose.connect("mongodb+srv://patrickLabes:nqMbBeXJJEFIr7r0@cluster0-trg7g.mongodb.net/trip-data?retryWrites=true&w=majority")
.then(()=>{
    console.log('Connection Made')
}).catch((err)=>{
    console.log('Connection Failed '+err)
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    )
    next();
})

app.use("/api/locations",locationRoutes);


module.exports = app;