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
    console.log(req.session.user.username)
    res.render("404");
  });
  
  
  
  
  

  
  

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