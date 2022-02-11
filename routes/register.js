const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
const User = mongoose.model("User");

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

module.exports = router
