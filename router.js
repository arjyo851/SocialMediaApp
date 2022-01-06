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


var usern;
//will use later
// const requiredLogin = (req,res,next)=>{
//   const beraerHeader = req.headers['authorization'] 

//   console.log(beraerHeader)
//   //authorization === Bearer ewefwegwrherhe

//   if(typeof beraerHeader !== 'undefined'){
//     const bearer = beraerHeader.split(' ')
//   const bearerToken = bearer[1]
//   req.token = bearerToken
// next()
//   }
//   else{
//     console.log("Ends in first check")
//     return res.status(401).json({error:"you must be logged in"})
//   } 
  
// }

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
              // console.log(foundUser)
              req.user = foundUser
              
              res.json({token})
              
                // res.render("home-dashboard",{title:foundUser.username});
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
    res.json({errors});
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
            // usern = username;
            res.render("home-dashboard",{title:req.user.username});
            console.log("Succesfully registered")
          }
        });
      
      
        
      })
  }
  
  // res.json({ success: true });
  
  });
  
  // dashboard
  
  router.get("/dashboard",function(req,res){
   console.log(req.headers.cookie)
    res.render("home-dashboard",{title:usern})
  })
  
  router.get("/profile/:username",requiredLogin,function(req,res){
    console.log(req.user.username)
    if(req.params.username === req.user.username){  //check this line
      // Post.find({}, function(err, posts){
      // res.render("profile",
      // {title:req.user.username,
      //   posts:posts
      // });
      // }
      // )}
      Post.find({Postedby:req.user._id}).populate("Postedby","_id username").then(posts=> res.render("profile",
      {title:req.user.username,
        posts:posts
      })).catch(err=>console.log(err))
    }
    else{
      res.redirect("/404")
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
      res.json({error:"please forgive me i cannot do thi"})
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


module.exports = router