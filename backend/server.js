import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import itemRoutes from "./routes/itemRoutes.js";
import dns from "dns";

dotenv.config();

// Force DNS server (use Google DNS as fallback)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Item Manager API is running..." });
});

app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 5000;

console.log("Attempting MongoDB connection...");
console.log("MongoDB URI:", process.env.MONGO_URI ? "✓ Set" : "✗ Not set");

const mongoOptions = {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  maxPoolSize: 10,
  family: 4,
  directConnection: false,
  ssl: true,
  authSource: "admin",
};

mongoose
  .connect(process.env.MONGO_URI, mongoOptions)
  .then(() => {
    console.log("✓ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("✗ Database connection error:", error.message);
    console.error("Error code:", error.code);
    
    if (error.code === "ECONNREFUSED") {
      console.error("\n⚠️  ECONNREFUSED Error - This usually means:");
      console.error("   1. Your IP is not whitelisted in MongoDB Atlas Network Access");
      console.error("   2. DNS resolution is failing");
      console.error("   3. Your firewall is blocking the connection");
      console.error("\nTry these steps:");
      console.error("   1. Go to MongoDB Atlas > Network Access");
      console.error("   2. Add 0.0.0.0/0 (temporary - allows all IPs)");
      console.error("   3. Or add your current public IP: https://www.whatismyip.com");
    }
    
    process.exit(1);
  });