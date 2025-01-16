import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectToDB from "./db/connectToDB.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Configure environment variables
dotenv.config();
connectToDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Define `__dirname` in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "/client-side/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client-side", "dist", "index.html")
    );
  });
}

mongoose.connection.once("open", () => {
  console.log("Access to DB Success");
  app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});
