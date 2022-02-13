const express = require("express")
const ejs = require('ejs');
const mongoose = require('mongoose')
const router = express.Router();
//Later do middleware code
const Post = mongoose.model("Post")



router.get("/:postId",(req,res)=>{
    console.log(req.session.user.username)
    Post.find({_id:req.params.postId}, function(err, post){
      console.log(post)
      res.render("edit-post", {
        title:req.session.user.username,
        posts: post
      });
    });
  })

  module.exports = router