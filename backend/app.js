const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://brandon:K5wi7z6pozcDYIwa@cluster0-9uven.mongodb.net/node-angular?retryWrites=true")
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    res.status(201).json({
        message: 'Post added successfully.'
    });
});

app.get('/api/posts',(req, res, next) => {
    const posts = [
        {
            id: '123blahblahid', 
            title: 'First server-side post', 
            content: 'Blah blah blah'
        },
        {
            id: '223blahblahduh', 
            title: 'Second server-side post', 
            content: 'Blah mah blah blah'
        },
        {
            id: '921lahblahid', 
            title: 'Third server-side post', 
            content: '3 Blah blah blah'
        }
    ];
    res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: posts
    });
});

module.exports = app;