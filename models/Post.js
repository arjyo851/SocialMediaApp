const mongoose = require('mongoose');
// const { post } = require('../router');
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{type:String,required:true,trim:true},
    content:{type:String,required:true,trim:true},
    Postedby:{
      type:ObjectId,
      ref:"User"
    },
    datePosted:{
      type:Date,
      default:new Date() //could have used timestamp :true
    }
  })

  mongoose.model("Post",postSchema);