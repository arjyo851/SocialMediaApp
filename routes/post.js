const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
const User = mongoose.model("User");

router.get("/",function(req,res){
    res.render("create-post",{title:req.session.user.username});
  })


router.post("/",function(req,res){
    const {postTitle,postBody} = req.body
    if(!postTitle || !postBody){
        res.json({error:"Please add all fields"})
    }
    const post = new Post({
        title:postTitle,
        content:postBody,
        postedby:req.session.user.username //will show after middleware succeeds
    })

    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router
