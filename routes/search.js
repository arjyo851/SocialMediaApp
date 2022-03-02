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
        selectedTab:"posts",
        title:req.session.user.username
    })
})

// router.get("/posts",function(req,res){
//     res.render("search",{
//         title:req.session.user.username
//     })
// })

// router.get("/users",function(req,res){
//     res.render("search_user",{
//         title:req.session.user.username
//     })
// })

router.get("/:selectedTab",function(req,res){
    if(req.params.selectedTab === "posts")
    res.render("search",{
        selectedTab:req.params.selectedTab,
        title:req.session.user.username
    })
    else{
        res.render("search_user",{
            selectedTab:req.params.selectedTab,
            title:req.session.user.username
        })
    }
})

module.exports = router