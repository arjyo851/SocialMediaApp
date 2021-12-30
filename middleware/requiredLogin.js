const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET.toString();
const mongoose = require('mongoose')
const User = mongoose.model("User")
module.exports = (req,res,next)=>{
    req.is('application/json')
    const authorization= req.header("application/json");
    // const {authorization} = req.headers
    console.log(authorization)
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
        console.log("ends in first request")
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        console.log(payload)
        if(err){
            console.log("ends in second request")
         return   res.status(401).json({error:"you must be logged in"})
        }

        const {_id} = payload
        User.findById(_id).then(userdata=>{
            console.log(userdata)
            req.user = userdata
            next()
        })
        
        
    })
}