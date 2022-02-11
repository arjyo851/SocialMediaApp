// const jwt = require('jsonwebtoken')
// const JWT_SECRET = process.env.JWT_SECRET.toString();
// const mongoose = require('mongoose')
// const User = mongoose.model("User")
// module.exports = (req,res,next)=>{
//     req.is('application/json')
//     const {cookie} = req.headers;
    
//     var username = req.params.username
//     console.log(username)
//     console.log(req.session.user)
//     if(!cookie){
//         console.log("ends in first request")
//        return res.status(401).json({error:"you must be logged in"})
//     }
//     var cookieValue 


//     for (const [key, value] of Object.entries(req.cookies)) {

//         if(username == key){
//             cookieValue = value
//             // console.log(`${key}: ${value}`);
//         }
//       }
//     // console.log(cookieValue)
//       if(cookieValue === undefined){
//           console.log("ends in second request")
//          return res.status(401).json({error:"you must be logged in"})
//       }
//     const authorization = "Bearer " + cookieValue
//     req.headers.auth = authorization
//     // console.log(req.headers)
//     //authorization === Bearer ewefwegwrherhe
//     const token = authorization.replace("Bearer ","")
    
//     jwt.verify(token,JWT_SECRET,(err,payload)=>{
        
//         if(err){
//             console.log("ends in third request")
//          return   res.status(401).json({error:"you must be logged in"})
//         }

//         const {_id} = payload
//         User.findById(_id).then(userdata=>{
//             // console.log(userdata+"this is the userdata")
//             // console.log(typeof userdata)
//             // const myuserdata=JSON.parse(userdata)
//             req.user = userdata
//             // console.log(myuserdata[username])
//             // console.log(req.user.username)
//             next()
//         })
        
        
//     })
// }

module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    else {
        return res.redirect('/');
    }
}