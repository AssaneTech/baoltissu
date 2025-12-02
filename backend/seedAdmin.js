import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";

dotenv.config();
connectDB();

async function run() {
    try {
        await User.deleteMany({ isAdmin: true });

        const admin = await User.create({
            name: "Assane Admin",
            email: "admin@baoltissu.com",
            password: "123456",
            isAdmin: true
        });

        console.log("✅ Admin créé :", admin.email);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

run();