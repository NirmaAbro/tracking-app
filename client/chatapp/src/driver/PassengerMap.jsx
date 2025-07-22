import { useEffect, useState } from "react";
import socket from "../socket";

function PassengerMap() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    socket.on("newLocation", (data) => {
      setLocation(data);
    });

    return () => {
      socket.off("newLocation");
    };
  }, []);

  return (
    <div>
      <h2>Driver Location Updates</h2>
      {location ? (
        <p>
          Driver {location.driverId} is at: {location.lat}, {location.lng}
        </p>
      ) : (
        <p>Waiting for driver location...</p>
      )}
    </div>
  );
}

export default PassengerMap;
