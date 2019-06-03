const express = require('express');
const bodyParser = require("body-parser");

// const Post = require('./models/post')
const mongoose = require("mongoose")

const locationRoutes = require('./routes/locations')

const app = express();

/*
mongoose.connect("mongodb+srv://patrick:MUr8c4kQuK2frTp5@cluster0-jrerw.mongodb.net/node-angular?retryWrites=true")
.then(()=>{
    console.log('Connection Made')
}).catch(()=>{
    console.log('Connection Failed')
});
*/

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