import { useEffect } from "react";
import socket from "../socket";

function Driver() {
  useEffect(() => {
    const id = localStorage.getItem("driver_id") || socket.id;

    const emitLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          socket.emit("driverLocation", {
            id,
            coords: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        (err) => console.log("GPS error:", err),
        { enableHighAccuracy: true }
      );
    };

    const interval = setInterval(emitLocation, 5000); // send every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Driver Live Mode</h2>
      <p>Sending location every 5 seconds...</p>
    </div>
  );
}

export default Driver;
