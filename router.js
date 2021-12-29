const express = require("express")
const ejs = require('ejs');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose')
const User = mongoose.model("User");
const bcrypt = require('bcrypt')
const saltrounds = 10;
const validator = require('validator');


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
      console.log(err);
    } else {
      if (foundUser) {
        bcrypt.compare(password_login, foundUser.password, function(err, result) {
            if(result === true){
                res.render("home-dashboard",{title:foundUser.username});
            }
            else{
                console.log("password is wrong");
            }  
        });
    } 
      else{
          console.log("username not found")
      }
    }
  });
  
  })
  
  router.post("/register",async(req,res,next)=>{
 
  const { username, email, password } = req.body;


  const errors = [];

  if(validator.isEmpty(username)) {
    errors.push({
        param: 'username',
        msg: 'UserName is a required field.'
    });
}

if(!validator.isEmail(email)) {
    errors.push({
        param: 'email',
        msg: 'Invalid e-mail address.'
    });
}



if(validator.isEmpty(password)) {
    errors.push({
        param: 'password',
        msg: 'Password is a required field.'
    });

}

try {
  const usernameExists = await users.countDocuments({ username: username });
  const emailExists = await users.countDocuments({ email: email });

  if(usernameExists === 1) {
      errors.push({
          param: 'username',
          msg: 'Invalid username.'
      });
  }

  if(emailExists === 1) {
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