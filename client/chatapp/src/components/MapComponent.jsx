import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import socket from "../socket";

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const center = {
  lat: 24.8607, // Default: Karachi
  lng: 67.0011,
};

function MapComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  });

  const [drivers, setDrivers] = useState({});

  useEffect(() => {
    socket.on("driverLocationUpdate", ({ id, coords }) => {
      setDrivers((prev) => ({
        ...prev,
        [id]: coords,
      }));
    });

    return () => socket.off("driverLocationUpdate");
  }, []);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {Object.entries(drivers).map(([id, coords]) => (
        <Marker key={id} position={{ lat: coords.lat, lng: coords.lng }} />
      ))}
    </GoogleMap>
  );
}

export default MapComponent;
