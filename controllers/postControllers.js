const express = require("express")
const ejs = require('ejs');
const mongoose = require('mongoose')
const router = express.Router();
//Later do middleware code
const Post = mongoose.model("Post")
const requiredLogin = require("../middleware/requiredLogin");

router.post("/createPost",function(req,res){
    const {postTitle,postBody} = req.body
    if(!postTitle || !postBody){
        res.json({error:"Please add all fields"})
    }
console.log(req.user) //will show after middleware succeds
// req.user.password = undefined;
    const post = new Post({
        title:postTitle,
        content:postBody,
        postedby:req.user //will show after middleware succeeds
    })

    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err);
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