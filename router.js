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
  
  // login
  router.post("/login",function(req,res){
  
  
    
  
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
              // const token = jwt.sign({_id:foundUser._id},JWT_SECRET);
              // console.log(foundUser)
              // req.user = foundUser            // CHECK THIS LINE
              // console.log(req.user)
              // res.json({token})
              // req.session.user = {}
              const cookieOptions = {
                expires:new Date(
                  Date.now() + 90*24*60*60*1000
                ),
                httpOnly:true
              }
              // res.cookie(username_login,token,cookieOptions)
                res.render("home-dashboard",{title:usern}); //sends title in header
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
            // console.log(newUser)
            req.session.user = newUser
            res.render("home-dashboard",{title:newUser.username});
            console.log("Succesfully registered")
          }
        });
      // console.log(newUser.username)
        const token = jwt.sign({_id:newUser._id},JWT_SECRET);
        // console.log(foundUser)
                      
        
        // res.json({token})
        const cookieOptions = {
          expires:new Date(
            Date.now() + 90*24*60*60*1000
          ),
          httpOnly:true
        }
        res.cookie(newUser.username,token,cookieOptions)
          res.render("home-dashboard",{title:newUser.username});
        
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

router.delete("/delete",(req,res)=>{
  console.log(req.body)
  Post.deleteOne(
    {_id:req.body.id},
    function(err){
        if(!err){
            res.send("Succesfully deleted corresponding article.");
        }
        else{
            res.send(err);
        }
    }
)
});

router.get("/editPost/:postId",requiredLogin,(req,res)=>{
  console.log(req.user.username)
  Post.find({_id:req.params.postId}, function(err, post){
    console.log(post)
    res.render("edit-post", {
      title:req.user.username,
      posts: post
    });
  });
})

module.exports = router