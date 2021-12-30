const express = require("express")
const ejs = require('ejs');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose')
const User = mongoose.model("User");
const bcrypt = require('bcrypt')
const saltrounds = 10;
const validator = require('validator');
const jwt = require('jsonwebtoken');
JWT_SECRET=process.env.JWT_SECRET.toString()


var usern;

router.get("/",function(req,res){
    res.render("home-guest")
    
  })
  
  router.post("/login",function(req,res){
  
    // login
  
    
  
    const username_login = req.body.username_login;
  const password_login =req.body.password_login;
  usern = req.body.username_login
  User.findOne({username: username_login}, function(err, foundUser){
    if (err) {
      console.log(err); //will later create a div showing user not found ------
    } else {
      if (foundUser) {
        bcrypt.compare(password_login, foundUser.password, function(err, result) {
            if(result === true){
              const token = jwt.sign({_id:foundUser._id},JWT_SECRET);
              console.log({token});
              res.json({token})
                res.render("home-dashboard",{title:foundUser.username});
            }
            else{
                console.log("password is wrong"); //Later show a div telling password is wrong
            }  
        });
    } 
      else{
          console.log("username not found") // Later show a div telling that username is wrong
      }
    }
  });
  
  })
  
  router.post("/register",(req,res)=>{
 
  const { username, email, password } = req.body;


  const errors = [];

  if(validator.isEmpty(username)) {   // I want to push this to client side such that this should show up as a div as the client starts typing
    errors.push({
        param: 'username',
        msg: 'UserName is a required field.'
    });
}

if(!validator.isEmail(email)) {  // I want to push this to client side such that this should show up as a div as the client starts typing
    errors.push({
        param: 'email',
        msg: 'Invalid e-mail address.'
    });
}



if(validator.isEmpty(password)) {  // I want to push this to client side such that this should show up as a div as the client starts typing
    errors.push({
        param: 'password',
        msg: 'Password is a required field.'
    });

}

try {
  const usernameExists =  User.countDocuments({ username: username });
  const emailExists =  User.countDocuments({ email: email });

  if(usernameExists === 1) {  // I want to push this to client side such that this should show up as a div as the client starts typing
      errors.push({
          param: 'username',
          msg: 'Invalid username.'
      });
  }

  if(emailExists === 1) {  // I want to push this to client side such that this should show up as a div as the client starts typing
      errors.push({
          param: 'email',
          msg: 'Invalid e-mail address.'
      }); 
  }

} catch(err) {
  res.json({ error: err });
}

  //   Register

  if(errors.length>0){
    res.json({error});
  }
  else{
    bcrypt.hash(password, saltrounds, function(err, hash) {
      const newUser =  new User({
          username: username,
          email:email,
          password:hash
        });
    
      
        newUser.save(function(err){
          if (err) {
            console.log(err);
          } else {
            usern = username;
            res.render("home-dashboard",{title:usern});
            console.log("Succesfully registered")
          }
        });
      
      
        
      })
  }
  
  // res.json({ success: true });
  
  });
  
  // dashboard
  
  router.get("/dashboard",function(req,res){
    res.render("home-dashboard")
  })
  
  router.get("/profile",function(req,res){
    res.render("profile",{title:usern});
  })
  
  router.get("/compose",function(req,res){
    res.render("create-post");
  })
  
  router.get("/404",function(req,res){
    res.render("404");
  });
  
  
  router.get("/followers",function(req,res){
  res.render("profile-followers",{title:usern});
  })
  
  router.get("/following",function(req,res){
  res.render("profile-following",{title:usern})
  })


module.exports = router