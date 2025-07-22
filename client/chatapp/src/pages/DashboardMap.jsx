import React from "react";
import MapComponent from "../components/MapComponent";


export default function DashboardMap() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Live Driver Tracking</h1>
      <MapComponent />
    </div>
  );
}
