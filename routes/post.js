const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
const User = mongoose.model("User");
const Post = mongoose.model("Post");

router.get("/:uniqueId",(req,res)=>{
    Post.find({_id:req.params.uniqueId}, function(err, post){
      res.render("single-post-screen", {
        title:req.session.user.username,
        posts: post
      });
    });
  })


module.exports = router