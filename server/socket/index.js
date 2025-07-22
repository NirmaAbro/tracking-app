import socketController from "../controllers/socketController.js";

const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    socketController(io, socket); // All socket logic here
  });
};

export default initializeSocket;
