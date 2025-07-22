import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import http from "http";

dotenv.config();
connectDB();
const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// WebSocket Server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🚗 New client connected: ", socket.id);

  // Save sender info
  socket.on("join", ({ name, role }) => {
    socket.data = { name, role };
    console.log(`👤 ${name} (${role}) joined the chat`);
  });

  // Chat message handler
  socket.on("chatMessage", (msg) => {
    const { text } = msg;
    const senderName = socket.data?.name || "Unknown";
    const role = socket.data?.role || "guest";

    const fullMsg = { text, senderName, role };
    io.emit("chatMessage", fullMsg); // broadcast to all users
  });

  // Driver location handler
  socket.on("driverLocation", (data) => {
    console.log("📍 Driver Location:", data);
    socket.broadcast.emit("newLocation", data);
  });
  console.log("🔌 User connected:", socket.id);

  socket.on("driverLocation", ({ id, coords }) => {
    console.log(`📍 Location from ${id}:`, coords);
    io.emit("driverLocationUpdate", { id, coords });
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
