const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://prayas:VUbG4IFVpq7MGb4j@cluster0-grpvr.mongodb.net/test?retryWrites=true")
  .then(() => {
    console.log("Successfully Connected to MongoDB!");
  })
  .catch(() => {
    console.log("Connection to MongoDB failed!!!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Aceess-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS, DELETE, PUT");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully!',
      postId: createdPost._id
  });

  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then( documents => {
      res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: documents
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({message: 'Post Deleted'});
    });
});

module.exports = app;
