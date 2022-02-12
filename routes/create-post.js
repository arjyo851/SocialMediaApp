const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
const User = mongoose.model("User");
const Post = mongoose.model("Post");


router.post("/", function(req, res){
    console.log(req.session.user)
    if(req.session.user.username === undefined){
      res.redirect("/")
    }
    const post = new Post({
      title: req.body.postTitle,
      content: req.body.postBody,
      Postedby:req.session.user._id
    });
  
  // req.user.password = undefined
    post.save(function(err){
      if (!err){
        res.redirect("/post/"+post._id);
      }
      else{
          
        console.log(err);
      }
    });
  });


  module.exports= router