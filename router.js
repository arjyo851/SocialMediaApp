const express = require("express")
const ejs = require('ejs');
const mongoose = require('mongoose')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const bcrypt = require('bcrypt')
const saltrounds = 10;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const requiredLogin = require("./middleware/requiredLogin");
const req = require("express/lib/request");
JWT_SECRET=process.env.JWT_SECRET.toString()
const session = require('express-session');



var usern;

router.get("/",function(req,res){
    res.render("home-guest")
    
  })
  


  
  // dashboard
  
  router.get("/dashboard",function(req,res){
   console.log(req.headers.cookie)
    res.render("home-dashboard",{title:usern})
  })
  
  router.get("/profile/:username",requiredLogin,function(req,res){
    console.log(req.user.username)
    if(req.params.username === req.user.username){  //check this line
      
      Post.find({Postedby:req.user._id}).populate("Postedby","_id username").then(posts=> res.render("profile",
      {title:req.user.username,
        posts:posts
      })).catch(err=>console.log(err))
    }
    
    
  })
  
  router.get("/createPost",requiredLogin,function(req,res){
    console.log(req.user.username)
    res.render("create-post",{title:req.user.username});
  })
  
  router.get("/404",function(req,res){
    console.log(req.user.username)
    res.render("404");
  });
  
  
  router.get("/profile/:username/followers",requiredLogin,function(req,res){
    console.log(req.user.username)
    usern = req.params.username;
      res.render("profile-followers",{title:req.user.username});
    
    console.log(usern)
 
  })
  
  router.get("/profile/:username/following",requiredLogin,function(req,res){
    console.log(req.user.username)
    usern = req.params.username;
      res.render("profile-following",{title:req.user.username})
    
  })

  router.post("/create-post",requiredLogin, function(req, res){
    console.log(req.user.username)
    if(req.user.username === undefined){
      res.json({error:"success"})
    }
    const post = new Post({
      title: req.body.postTitle,
      content: req.body.postBody,
      Postedby:req.user
    });
  
  // req.user.password = undefined
    post.save(function(err){
      if (!err){
        res.redirect("/post/"+post._id);
      }
      else{
        res.redirect("/404");
      }
    });
  });

  router.get("/post/:uniqueId",requiredLogin,(req,res)=>{
    console.log(req.user.username)
    Post.find({_id:req.params.uniqueId}, function(err, post){
      res.render("single-post-screen", {
        title:req.user.username,
        posts: post
      });
    });
  })

router.put("/update",(req,res)=>{
console.log(req.body)
Post.updateOne(
  { _id: req.body.id },
  {
    $set: {
      title: req.body.title,
      content: req.body.content
    }
  },
  {
    upsert: true
  },
  function(err){
    if(!err){
        res.send("succrsfully updated article");
        // res.render('profile/dentalmaniac')
    }
    else{
        res.send(err);
    }
})
})





module.exports = router