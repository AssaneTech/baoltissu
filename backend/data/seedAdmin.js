import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

dotenv.config();
connectDB();

const seed = async() => {
    try {
        await User.deleteOne({ email: "admin@baoltissu.com" }); // optionnel
        const hashed = await bcrypt.hash("AdminPass123!", 10);
        const admin = await User.create({
            name: "Admin BAOLTISSU",
            email: "admin@baoltissu.com",
            password: hashed,
            isAdmin: true,
        });
        console.log("ADMIN créé:", admin.email);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();