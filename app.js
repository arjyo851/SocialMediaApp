require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltrounds = 10;
const { body, validationResult } = require('express-validator');
const validator = require('validator');



const app = express();

// mongoose.connect("mongodb+srv://admin-arjyo:"+PASSWORD+"@cluster0.qwodm.mongodb.net/userdb?retryWrites=true&w=majority")
mongoose.connect("mongodb://localhost:27017/userDB")


require('./models/User')
require('./models/Post')

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.use(require('./router'))



const PASSWORD = process.env.PASSWORD.toString();




  // const User = new mongoose.model("User", userSchema);
  // const Post = new mongoose.model("Post",postSchema);

// HOME





app.listen(3000,()=>{
console.log("Server started on port 3000")
})