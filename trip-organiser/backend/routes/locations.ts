const express = require("express")
const router = express.Router();

router.post("",(req,res,next)=>{
    console.log(req.body)
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