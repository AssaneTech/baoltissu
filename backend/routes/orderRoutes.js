import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
    createOrder,
    getOrders,
    getMyOrders,
    updateOrderStatus,
    deleteOrder,
    getOrdersNumber
} from "../controllers/orderController.js";

const router = express.Router();

// Client
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);

// Admin
router.get("/", protect, admin, getOrders);
router.get("/orders-number", protect, admin, getOrdersNumber);
router.put("/:id/status", protect, admin, updateOrderStatus);
router.delete("/:id", protect, admin, deleteOrder);

export default router;