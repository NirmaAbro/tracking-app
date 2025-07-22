// // client/src/App.jsx
// import { useEffect } from "react";
// import socket from "./socket";

// function App() {
//   useEffect(() => {
//     socket.on("cityArrival", ({ message }) => {
//       alert(message); // Or use toast instead of alert
//     });

//     return () => socket.off("cityArrival");
//   }, []);

//   return (
//     <div>
//       <h1>Driver Realtime Tracker</h1>
//     </div>
//   );
// }

// export default App;



import { useEffect, useState } from "react";
import socket from "./socket";

function App() {
  const [driverName, setDriverName] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [messageLog, setMessageLog] = useState([]);

  useEffect(() => {
    // Listen for arrival notification from server
    socket.on("cityArrival", ({ message }) => {
      alert(message);
      setMessageLog((prev) => [...prev, message]);
    });

    return () => socket.off("cityArrival");
  }, []);

  const handleSendLocation = () => {
    if (!driverName || !currentLocation) {
      return alert("Please enter both driver name and location.");
    }

    socket.emit("driverLocationUpdate", {
      driverName,
      location: currentLocation,
    });

    setMessageLog((prev) => [
      ...prev,
      `🚗 Sent location "${currentLocation}" for driver "${driverName}"`,
    ]);

    setCurrentLocation("");
  };

  return (
    <div style={styles.container}>
      <h2>🚦 Driver Realtime Tracker</h2>

      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Driver Name"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Current Location (e.g., Hyderabad)"
          value={currentLocation}
          onChange={(e) => setCurrentLocation(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSendLocation} style={styles.button}>
          📍 Send Location
        </button>
      </div>

      <div style={styles.logBox}>
        <h4>🧾 Message Log</h4>
        {messageLog.map((msg, idx) => (
          <div key={idx}>• {msg}</div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    fontFamily: "sans-serif",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  logBox: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "6px",
  },
};

export default App;
