// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async(req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        try {
            token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (err) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "Admin access only" });
    }
};