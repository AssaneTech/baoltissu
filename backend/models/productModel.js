import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: String,
        required: true,
        enum: [
            "fabrics",
            "ready-to-wear",
            "accessories",
            "shoes",
            "hats",
            "caps",
            "tailoring"
        ]
    },
    stock: { type: Number, default: 0 },
    images: [{ type: String }], // ex: URL Cloudinary
    colors: [{ type: String }], // ex: ["Bleu", "Rouge"]
    sizes: [{ type: String }], // ex: ["S", "M", "L"]
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;