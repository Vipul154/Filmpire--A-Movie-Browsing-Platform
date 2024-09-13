import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import { envVars } from '../config/envVars.js'

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-filmpire"]

        if (!token) return res.status(401).json({success : false, message : "Unauthorised, No token provided."})

        const decoded = jwt.verify(token, envVars.JWT_SECRET)

        if (!decoded) return res.status(401).json({success : false, message : "Unauthorised, Invalid Token"})
        
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) return res.status(400).json({succes : false, message : "User not found."})

        // We are adding user to req object, so that we can fetch it later.
        req.user = user;
        
        next();
    } catch (error) {
        console.log(`Error in Protect Route middleware : ${error.message}`)
        return res.status(500).json({success : false, message : "Internal Server Error Code 1"})
    }
}

/**
 * To protect this route, the user has the jwt token in the cookies and just need to verify this token.
 * 
 */
