const mongoose = require('mongoose');
// const { post } = require('../router');
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    Postedby:{
      type:ObjectId,
      ref:"User"
    },
    datePosted:{
      type:Date,
      default:new Date()
    }
  })

  mongoose.model("Post",postSchema);