const jwt = require('jsonwebtoken');
const User = require('../Models/userModel.js');
 async function authenticate(req,res){
    let token;
    token= req.cookies.jwt;
    if(token){
        try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
};

async function authorizeAdmin (req,res,next){
    if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};

module.exports={
    authenticate,
    authorizeAdmin
};