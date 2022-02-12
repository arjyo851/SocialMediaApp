const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
const User = mongoose.model("User");
const Post = mongoose.model("Post");

router.get("/",function(req,res){
    res.render("create-post",{title:req.session.user.username});
  })


router.post("/",function(req,res){
    // const {postTitle,postBody} = req.body
    // if(!postTitle || !postBody){
    //     res.json({error:"Please add all fields"})
    // }
    // const post = new Post({
    //     title:postTitle,
    //     content:postBody,
    //     postedby:req.session.user.username //will show after middleware succeeds
    // })

    // post.save().then(result=>{
    //     res.json({post:result})
    // })
    // .catch(err=>{
    //     console.log(err);
    // })

    console.log(req.session.user)
    if(req.session.user.username === undefined){
      res.redirect("/")
    }
    const post = new Post({
      title: req.body.postTitle,
      content: req.body.postBody,
      Postedby:req.session.user._id
    });
  
  // req.user.password = undefined
    post.save(function(err){
      if (!err){
        res.redirect("/post/"+post._id);
      }
      else{
          console.log("some error bro!!")
        console.log(err);
      }
    });
})

module.exports = router
