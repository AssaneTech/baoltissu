import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    orderItems: [{
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        images: [String],
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: false,
        },
    }, ],

    totalPrice: { type: Number, required: true },

    isPaid: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);