import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { getCityName } from "./utils/geocode.js"; // Reverse geocoding
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3001;
const driverLastCity = new Map(); // driverId => last city name
const activeDrivers = new Map(); // driverId => { socketId, lat, lng }

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("driverLocation", async ({ driverId, lat, lng }) => {
    activeDrivers.set(driverId, { socketId: socket.id, lat, lng });

    const currentCity = await getCityName(lat, lng);
    const lastCity = driverLastCity.get(driverId);

    if (currentCity && currentCity !== lastCity) {
      console.log(`🚦 Driver ${driverId} moved to new city: ${currentCity}`);
      driverLastCity.set(driverId, currentCity);

      // Notify the driver
      io.to(socket.id).emit("cityArrival", {
        message: `You have arrived in ${currentCity}`,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);

    for (let [driverId, data] of activeDrivers.entries()) {
      if (data.socketId === socket.id) {
        activeDrivers.delete(driverId);
        console.log(`🗑️ Removed Driver ${driverId} from active drivers`);
        break;
      }
    }
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
