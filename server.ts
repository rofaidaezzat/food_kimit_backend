import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth";
import orderRoutes from "./src/routes/order";
import productRoutes from "./src/routes/product";
import UserService from "./src/services/UserServices";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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
    .connect(MONGO_URI)
    .then(async () => {
        console.log(`✅ MongoDB connected to ${MONGO_URI.includes("localhost") ? "Localhost" : "Remote Cluster"}`);
        // Seed the admin user on every startup
        const userService = new UserService();
        await userService.seedAdmin();
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});