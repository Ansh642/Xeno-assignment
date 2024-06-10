const express = require("express");
const app = express();

require("dotenv").config();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const database = require("./config/database");
const cloudinary = require("./config/cloudinary");
const passport = require('passport');
const session = require('express-session');
require('./config/passport'); 
const routes = require("./routes/route");

database.connect();
cloudinary.cloudinaryConnect();

const PORT= process.env.PORT || 4000;
 
app.use(express.json());

// connecting frontend and backend
app.use(
    cors({
        origin: "*",
        credentials : true,
    })
);

app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: false
  }));
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Body parser middleware
  app.use(express.urlencoded({ extended: false }));

// middleware for file upload
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// call the routes
app.use("/api/v1",routes);

app.use("/",(req, res)=>{
    return res.json({
        success: true,
        message: "Server is running...",   
    });
});


app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
});


