// server/utils/geocode.js
import fetch from "node-fetch";

export async function getCityName(lat, lng) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "realtime-tracker-app"
      }
    });

    const data = await response.json();
    const city = data.address?.city || data.address?.town || data.address?.village || "Unknown";

    return city;
  } catch (error) {
    console.error("Error in reverse geocoding:", error);
    return "Unknown";
  }
}
