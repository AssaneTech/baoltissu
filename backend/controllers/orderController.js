import Order from "../models/orderModel.js";

// ================= CREATE ORDER (client) =================
export const createOrder = async(req, res) => {
    try {
        const { orderItems, totalPrice } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: "No items in order" });
        }

        const order = await Order.create({
            user: req.user._id,
            orderItems,
            totalPrice,
        });

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= GET ALL ORDERS (admin) =================
export const getOrders = async(req, res) => {
    try {
        const orders = await Order.find({})
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= GET MY ORDERS (client) =================
export const getMyOrders = async(req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= UPDATE ORDER STATUS (admin) =================
export const updateOrderStatus = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // On met à jour isPaid TRUE / FALSE
        if (typeof req.body.isPaid === "boolean") {
            order.isPaid = req.body.isPaid;
        }

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= DELETE ORDER (admin) =================
export const deleteOrder = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        await order.deleteOne();

        res.json({ message: "Order deleted successfully" });

    } catch (err) {
        console.error("DELETE ERROR:", err);
        res.status(500).json({ message: err.message });
    }
};

// ================= GET ORDERS NUMBER (admin) =================
export const getOrdersNumber = async(req, res) => {
    try {
        const ordersNumber = await Order.countDocuments();
        res.json({ ordersNumber });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}