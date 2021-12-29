const mongoose = require('mongoose');
const { post } = require('../router');


const postSchema = new mongoose.Schema({
    title:String,
    content:String,
    user:String
  })

  mongoose.model("Post",postSchema);