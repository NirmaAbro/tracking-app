import { useEffect } from "react";
import socket from "../socket";

function DriverMap() {
  useEffect(() => {
    const interval = setInterval(() => {
      const location = {
        driverId: "driver123",
        lat: Math.random() * 90,
        lng: Math.random() * 90,
      };

      socket.emit("driverLocation", location);
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return <h2>Driver sending location every 5 seconds...</h2>;
}

export default DriverMap;
