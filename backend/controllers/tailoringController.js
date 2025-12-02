import TailoringRequest from "../models/tailoringModel.js";

export const createTailoringRequest = async(req, res) => {
    try {
        const {
            name,
            phone,
            email,
            chest,
            waist,
            hip,
            length,
            fabric,
            color,
            notes,
        } = req.body;

        const modelImage = req.file ? req.file.filename : null;

        const tailoring = await TailoringRequest.create({
            name,
            phone,
            email,
            modelImage,
            chest,
            waist,
            hip,
            length,
            fabric,
            color,
            notes,
        });

        res.status(201).json({
            success: true,
            data: tailoring,
        });
    } catch (err) {
        console.error("TAILORING ERROR:", err);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

export const getTailoringRequests = async(req, res) => {
    try {
        const requests = await TailoringRequest.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: requests,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

export const deleteTailoringRequest = async(req, res) => {
    try {
        await TailoringRequest.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Tailoring request deleted",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};