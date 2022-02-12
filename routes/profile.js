const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
const User = mongoose.model("User");
const Post = mongoose.model("Post");

var post_no;
router.get("/:username",function(req,res){
    console.log(req.session.user.username)
    console.log(req.params.username)
      
      Post.find({Postedby:req.session.user._id}).populate("Postedby","_id username").then(posts=>{ 
        post_no = posts.length
        res.render("profile",
      {title:req.session.user.username,
        posts:posts
      })}).catch(err=>console.log(err))
    
    
    
  });



  router.get("/:username/followers",function(req,res){
    console.log(req.session.user)
    // usern = req.params.username;
      res.render("profile-followers",{title:req.session.user.username,postlength:post_no});
    
 
  });


  router.get("/:username/following",function(req,res){
    console.log(req.session.username)
    
      res.render("profile-following",{title:req.session.user.username,postlength:post_no})
    
  })





module.exports = router
