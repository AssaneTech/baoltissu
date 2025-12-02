import express from "express";
import {
    registerUser,
    loginUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    checkEmail,
    resetPassword,
    getCustomersNumber
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/check-email", checkEmail);
router.post("/reset-password", resetPassword);

// Admin routes
router.get("/", protect, admin, getUsers);
router.get("/customers-number", protect, admin, getCustomersNumber);
router.post("/", protect, admin, createUser); // <-- ADD USER
router.put("/:id", protect, admin, updateUser); // <-- UPDATE USER
router.delete("/:id", protect, admin, deleteUser); // <-- DELETE USER

export default router;