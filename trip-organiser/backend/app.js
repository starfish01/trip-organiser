const express = require('express');
const bodyParser = require("body-parser");

// const Post = require('./models/post')
const mongoose = require("mongoose")


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

/*
app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title:req.body.title,
        content:req.body.content
    });
    post.save();
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get('/api/posts', (req, res, next) => {
    const posts = [
        { id: '123456789', title: 'first server side post', content: 'This is the content from the serveer' },
        { id: '12345dsdsds9', title: 'second server side post', content: 'This is the content from the serveer' },
    ]

    res.json(posts);

});
*/

module.exports = app;