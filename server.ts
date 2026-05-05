import "dotenv/config";
import mongoose from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth";
import orderRoutes from "./src/routes/order";
import productRoutes from "./src/routes/product";
import UserService from "./src/services/UserServices";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ type: ['application/json', 'text/plain'] }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/products", productRoutes);

// Database Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/fayroz_db";

if (process.env.NODE_ENV === "production" && MONGO_URI.includes("localhost")) {
    console.warn("⚠️  WARNING: Running in production but connecting to localhost.");
}
console.log("Attempting to connect to MongoDB...");
mongoose
    .connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
        console.log(`✅ MongoDB connected to ${MONGO_URI.includes("localhost") ? "Localhost" : "Remote Cluster"}`);
        // Seed the admin user on every startup
        const userService = new UserService();
        await userService.seedAdmin();
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:");
        console.error(err.message);
        if (err.message.includes("IP that isn't whitelisted")) {
            console.error("=========================================");
            console.error("🛑 MONGODB ATLAS IP SECURITY BLOCK 🛑");
            console.error("Your computer's IP address is not allowed by MongoDB Atlas.");
            console.error("1. Go to https://cloud.mongodb.com/");
            console.error("2. Go to Security -> Network Access");
            console.error("3. Click '+ Add IP Address'");
            console.error("4. Choose 'Allow Access from Anywhere' (0.0.0.0/0)");
            console.error("5. Click Confirm and wait 2 minutes.");
            console.error("=========================================");
        }
    });

// Global Error Handler to catch multer/cloudinary errors as JSON
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Global Error Handler:", err);
    res.status(500).json({ 
        error: "Internal Server Error", 
        detail: err.message || String(err) 
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});