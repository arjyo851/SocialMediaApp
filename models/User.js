const mongoose = require('mongoose');

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
  followers:Array,
  following:Array
});


  mongoose.model("User",userSchema);