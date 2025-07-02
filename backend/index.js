const express=require("express");
const cors= require('cors');
const mongoose = require('mongoose');
const path=require('path');
const cookieParser = require('cookie-parser');

//utils
const connectDB = require('./config/db.js');
const  userRoutes = require('./Routes/authRoute.js');




require('dotenv').config();
const PORT= process.env.PORT || 5000;

connectDB();

const app =express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use('/auth',userRoutes);

 app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}.`);
 });
