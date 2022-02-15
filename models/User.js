const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  posts:Array,
  followers:[{type:Schema.Types.ObjectId,ref:'User'}],
  following:Array
});


  mongoose.model("User",userSchema);