import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import initializeSocket from "./socket/index.js";

dotenv.config();
connectDB();

const app = express();
const server = createServer(app);

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);

// Socket setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
initializeSocket(io); // Socket logic in a separate file

const PORT = process.env.PORT || 3001;
server.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
