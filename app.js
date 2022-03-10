require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltrounds = 10;
const { body, validationResult } = require('express-validator');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const server = require('http').createServer();
const users = {};
const cors = require('cors')
const ejs = require('ejs');
const session = require('express-session');
const requiredLogin = require("./middleware/requiredLogin");



const app = express();

const PASSWORD = process.env.PASSWORD.toString();
mongoose.connect("mongodb+srv://admin-arjyo:"+PASSWORD+"@cluster0.qwodm.mongodb.net/userdb?retryWrites=true&w=majority")
// mongoose.connect("mongodb://localhost:27017/userDB")


require('./models/User')
require('./models/Post')

app.set('view engine','ejs');
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.use(require('./router'))
app.use(require('./controllers/postControllers'))
app.use(cors({
  origin:false
}))
app.use(session({
  secret:"heater",
  resave: true,
saveUninitialized: false
}))

const loginRoute = require('./routes/loginRoutes');
const req = require('express/lib/request');

app.use(require('./routes/loginRoutes'));
app.use(require('./routes/register'))
app.use("/logout",require('./routes/logout'))
app.use("/profile",requiredLogin,require('./routes/profile'))
app.use("/createPost",requiredLogin,require('./routes/createPost'))
app.use("/post",requiredLogin,require('./routes/post'))
app.use("/editPost",requiredLogin,require('./routes/editpost'))
app.use("/search",requiredLogin,require('./routes/search'))


let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}
app.listen(port,()=>{
console.log("Server started succesfully!")
})