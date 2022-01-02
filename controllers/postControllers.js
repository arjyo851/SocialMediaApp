const express = require("express")
const ejs = require('ejs');
const mongoose = require('mongoose')
const router = express.Router();
//Later do middleware code
const Post = mongoose.model("Post")

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

module.exports = router