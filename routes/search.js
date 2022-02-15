const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
const User = mongoose.model("User");
const Post = mongoose.model("Post");


router.get("/",function(req,res){
    res.render("search",{
        title:req.session.user.username
    })
})

router.get("/posts",function(req,res){
    res.render("search",{
        title:req.session.user.username
    })
})

router.get("/users",function(req,res){
    res.render("search",{
        title:req.session.user.username
    })
})

module.exports = router