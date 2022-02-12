const express = require("express")
const ejs = require('ejs');
const mongoose = require('mongoose')
const router = express.Router();
//Later do middleware code
const Post = mongoose.model("Post")
const requiredLogin = require("../middleware/requiredLogin");



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