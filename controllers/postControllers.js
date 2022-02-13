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
        }
        else{
            res.send(err);
        }
    })
    })

  

module.exports = router