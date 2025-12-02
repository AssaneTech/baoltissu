import mongoose from "mongoose";

const tailoringSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    phone: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
    },

    modelImage: {
        type: String, // Multer va stocker le nom du fichier
        required: false,
    },

    // MESURES
    chest: {
        type: Number,
        required: false,
    },

    waist: {
        type: Number,
        required: false,
    },

    hip: {
        type: Number,
        required: false,
    },

    length: {
        type: Number,
        required: false,
    },

    // CHOIX
    fabric: {
        type: String,
        required: false,
        trim: true,
    },

    color: {
        type: String,
        required: false,
        trim: true,
    },

    notes: {
        type: String,
        required: false,
        trim: true,
    },
}, { timestamps: true });

export default mongoose.model("TailoringRequest", tailoringSchema);