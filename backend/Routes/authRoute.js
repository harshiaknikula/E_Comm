const express = require('express');

const { registerUser,loginUser} =require( '../controllers/authController.js');
const { authenticate,authorizeAdmin} =require('../middlewares/authMiddleware.js');
const router = express.Router();

router
    .route("/")
    .post(registerUser)
    .get(authenticate,authorizeAdmin);

router 
    .post('/login',loginUser);

module.exports=router;