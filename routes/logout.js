const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
const User = mongoose.model("User");

router.get("/",(req,res,next)=>{
    if(req.session){
        req.session.destroy(()=>{
           return res.redirect("/")
        })
    }
})



module.exports = router
