const { type } = require('express/lib/response');
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET.toString();
const mongoose = require('mongoose')
const User = mongoose.model("User")
module.exports = (req,res,next)=>{
    req.is('application/json')
    
    const {cookie} = req.headers;
    
    
    const authorization = "Bearer " + cookie
    req.headers.authorization = authorization
    // console.log(req.headers)
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
        console.log("ends in first request")
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    console.log(token+"sudden token");
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        
        if(err){
            console.log("ends in second request")
         return   res.status(401).json({error:"you must be logged in"})
        }

        const {_id} = payload
        User.findById(_id).then(userdata=>{
            // console.log(userdata+"this is the userdata")
            // console.log(typeof userdata)
            // const myuserdata=JSON.parse(userdata)
            req.user = userdata
            // console.log(myuserdata[username])
            // console.log(req.user.username)
            next()
        })
        
        
    })
}