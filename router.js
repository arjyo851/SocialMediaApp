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
const req = require("express/lib/request");
JWT_SECRET=process.env.JWT_SECRET.toString()
const session = require('express-session');
const requiredLogin = require("./middleware/requiredLogin");



var usern;

router.get("/",function(req,res){
    res.render("home-guest")
    
  })
  


  
  // dashboard
  
  router.get("/dashboard",function(req,res){
   console.log(req.headers.cookie)
    res.render("home-dashboard",{title:req.session.user.username})
  })
  
  
  
  
  
  router.get("/404",function(req,res){
    console.log(req.user.username)
    res.render("404");
  });
  
  
  
  
  

  // router.post("/create-post",requiredLogin, function(req, res){
  //   console.log(req.session.user.username)
  //   if(req.user.user.username === undefined){
  //     res.redirect("/")
  //   }
  //   const post = new Post({
  //     title: req.body.postTitle,
  //     content: req.body.postBody,
  //     Postedby:req.session.user.username
  //   });
  
  // // req.user.password = undefined
  //   post.save(function(er r){
  //     if (!err){
  //       res.redirect("/post/"+post._id);
  //     }
  //     else{
  //       res.redirect("/404");
  //     }
  //   });
  // });

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
    }
    else{
        res.send(err);
    }
})
})





module.exports = router