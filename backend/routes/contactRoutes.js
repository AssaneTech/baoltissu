// backend/routes/contactRoutes.js
import express from "express";
import { sendMessage, getMessages, deleteMessage } from "../controllers/contactController.js";

const router = express.Router();

// Send a message
router.post("/", sendMessage);

// Get all messages
router.get("/", getMessages);

// Delete one message
router.delete("/:id", deleteMessage);

export default router;