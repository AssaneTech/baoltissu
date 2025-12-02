import express from "express";
import multer from "multer";
import {
    createTailoringRequest,
    getTailoringRequests,
    deleteTailoringRequest,
} from "../controllers/tailoringController.js";

const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// API Endpoints
router.post("/", upload.single("modelImage"), createTailoringRequest);
router.get("/", getTailoringRequests);
router.delete("/:id", deleteTailoringRequest);

export default router;