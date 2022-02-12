const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
const User = mongoose.model("User");

router.post("/login",function(req,res){
  
  
    
  
    const username_login = req.body.username_login;
  const password_login =req.body.password_login;
  User.findOne({username: username_login}, function(err, foundUser){
    if (err) {
      console.log(err); //will later create a div showing user not found ------
    } else {
      if (foundUser) {
        bcrypt.compare(password_login, foundUser.password, function(err, result) {
            if(result === true){
              
               req.session.user = foundUser
                return res.render("home-dashboard",{title:username_login}); //sends title in header
            }
            else{
                console.log("password is wrong"); //Later show a div telling password is wrong
                res.render("home-guest"); //send payload here telling that password is wrong
            }  
        });
    } 
      else{
          console.log("username not found") // Later show a div telling that username is wrong
          res.render("home-guest") //send payload here telling that username is not found
      }
    }
  });
  
  })

  module.exports = router
 