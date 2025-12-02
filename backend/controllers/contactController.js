import Contact from "../models/contactModel.js";

// SAVE MESSAGE (déjà fait)
export const sendMessage = async(req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields required" });
        }

        const newMessage = await Contact.create({ name, email, subject, message });

        return res.status(201).json({
            success: true,
            message: "Message saved",
            data: newMessage,
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

// GET ALL MESSAGES
export const getMessages = async(req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: messages,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

// DELETE A MESSAGE
export const deleteMessage = async(req, res) => {
    try {
        const id = req.params.id;

        const msg = await Contact.findByIdAndDelete(id);

        if (!msg) {
            return res.status(404).json({ success: false, message: "Message not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Message deleted",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};