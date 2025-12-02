// backend/controllers/userController.js
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// =============================
// FUNCTION : Generate Token
// =============================
const generateToken = (id) => {
    return jwt.sign({ id },
        process.env.JWT_SECRET || "secret", { expiresIn: "30d" }
    );
};

// =============================
// REGISTER USER (public)
// =============================
export const registerUser = async(req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password,
            isAdmin: !!isAdmin,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// =============================
// LOGIN USER (public)
// =============================
export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        const u = await User.findOne({ email });
        if (!u) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const match = await u.matchPassword(password);
        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            _id: u._id,
            name: u.name,
            email: u.email,
            isAdmin: u.isAdmin,
            token: generateToken(u._id),
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// =============================
// GET ALL USERS (admin only)
// =============================
export const getUsers = async(req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// =============================
// CREATE USER (admin only)
// =============================
export const createUser = async(req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password,
            isAdmin: isAdmin || false,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// =============================
// UPDATE USER (admin only)
// =============================
export const updateUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Mise à jour simple, sans syntaxe complexe
        if (req.body.name) {
            user.name = req.body.name;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (typeof req.body.isAdmin !== "undefined") {
            user.isAdmin = req.body.isAdmin;
        }

        const updated = await user.save();

        res.json({
            _id: updated._id,
            name: updated.name,
            email: updated.email,
            isAdmin: updated.isAdmin,
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// =============================
// DELETE USER (admin only)
// =============================
export const deleteUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.deleteOne();

        res.json({ message: "User removed" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// =============================
// CHECK EMAIL (public)
// =============================

export const checkEmail = async(req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        res.status(200).json({ userId: user._id });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// =============================
// RESET PASSWORD (public)
// =============================

export const resetPassword = async(req, res) => {
    try {
        console.log("BODY RECU :", req.body);

        const { userId, password } = req.body;

        if (!userId || !password) {
            return res.status(400).json({ message: "Missing userId or password" });
        }

        const user = await User.findById(userId);

        console.log("USER TROUVE :", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("NOUVEAU PASSWORD :", password);

        // On remplace le password
        user.password = password; // Le hash sera fait automatiquement dans le pre("save")

        await user.save();

        return res.status(200).json({ message: "Password reset successful" });

    } catch (err) {
        console.log("ERREUR RESET :", err);
        return res.status(500).json({ message: err.message });
    }
};
// =============================
// GET CUSTOMERS NUMBER (admin only)
// =============================
export const getCustomersNumber = async(req, res) => {
    try {
        const customersNumber = await User.countDocuments({ isAdmin: false });
        res.json({ customersNumber });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}