// backend/server.js
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";

// ROUTES
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import tailoringRoutes from "./routes/tailoringRoutes.js";

/* ----------------------------------------------------
   CONNECT TO DATABASE & LOAD ENV VARIABLES
---------------------------------------------------- */

dotenv.config();
connectDB();

const app = express();

// JSON middleware
app.use(express.json());

// Logger
app.use(morgan("dev"));

/* ----------------------------------------------------
   FIX FIREFOX DELETE / PATCH / PUT CORS PROBLEMS  
   (Express 5 requires manual CORS handling)
---------------------------------------------------- */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true"); // REQUIRED FOR FIREFOX
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    // Preflight request (Firefox needs this to return 200)
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

/* ----------------------------------------------------
   ROUTES
---------------------------------------------------- */
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/tailoring", tailoringRoutes);



/* ----------------------------------------------------
   SERVE UPLOADS FOLDER
---------------------------------------------------- */
app.use("/uploads", express.static("uploads"));


/* ----------------------------------------------------
   ROOT ENDPOINT
---------------------------------------------------- */
app.get("/", (req, res) => {
    res.send("BAOLTISSU API is running...");
});

/* ----------------------------------------------------
   START SERVER
---------------------------------------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
    console.log(`🚀 Server running on port ${PORT}`)
);