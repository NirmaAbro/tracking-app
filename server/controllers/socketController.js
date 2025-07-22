const socketController = (io, socket) => {
    console.log("🚗 New client connected:", socket.id);
  
    socket.on("join", ({ name, role }) => {
      socket.data = { name, role };
      console.log(`👤 ${name} (${role}) joined the chat`);
    });
  
    socket.on("chatMessage", (msg) => {
      const { text } = msg;
      const senderName = socket.data?.name || "Unknown";
      const role = socket.data?.role || "guest";
  
      const fullMsg = { text, senderName, role };
      io.emit("chatMessage", fullMsg);
    });
  
    socket.on("driverLocation", (data) => {
      console.log("📍 Driver Location:", data);
      socket.broadcast.emit("newLocation", data);
    });
  
    socket.on("driverLocation", ({ id, coords }) => {
      console.log(`📍 Location from ${id}:`, coords);
      io.emit("driverLocationUpdate", { id, coords });
    });
  
    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  };
  
  export default socketController;
  