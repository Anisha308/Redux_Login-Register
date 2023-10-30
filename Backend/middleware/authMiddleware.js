import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
       
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          console.log("Token Decoded:", decoded); // Log the decoded token

            req.user = await User.findById(decoded.userId).select("-password");
            console.log("User Found:", req.user); // Log the user object
        next();
        } catch (error) {
          console.error("Error in protect middleware:", error); // Log any errors

          res.status(401);
          throw new Error("Not authorized,invalid token");
        }
    } else {
        res.status(401)
        throw new Error('Not authorized,no token')
    }
})


export { protect };