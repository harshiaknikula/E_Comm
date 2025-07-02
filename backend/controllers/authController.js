const User= require('../Models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcryptjs');
const createToken =require('../utils/createToken.js');
require ('dotenv').config();
const JWT_SECRET= process.env.JWT_SECRET || 'abcd29347fu3lajdfhdvg';
 async  function registerUser(req,res){
    const{
         username,
        email,
        password
    }=  req.body;
    if(!username || !email || !password){
        throw  new Error("Please fill all inputs.");
    }
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400).send("User already exixts.");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const newUser = new User ({username,email,password:hashedPassword});

    try{
        await newUser.save();
        createToken(res,newUser._id);
        
        res.status(201).json({
            _id:newUser._id,
            username: newUser.username,
            email:newUser.email,
            isAdmin:newUser.isAdmin,
        });


    }catch (error) {
  console.error(error); 
  res.status(400).send("Invalid user Data.");
}
 };

async function loginUser(req,res){
    const {email,password}=req.body;
      console.log(email);
    console.log(password);
    const existingUser= await User.findOne({email});
    if(existingUser){

        const passwordValid= await bcrypt.compare(
            password,
            existingUser.password
        );
        if(passwordValid){
            createToken(res,existingUser._id);
            res.status(201).json({
                _id:existingUser._id,
                username:existingUser.username,
                email:existingUser.email,
                isAdmin:existingUser.isAdmin,
            });
            return;
        }
    }
}

 module.exports={
    registerUser,
    loginUser,
 };