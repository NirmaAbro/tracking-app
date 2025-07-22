import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./pages/DashboardLayout";
import LiveMap from "./components/MapComponent";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import ChatBox from "./ChatBox";
import MapComponent from "./components/Map";
import DashboardMap from "./pages/DashboardMap";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="map" element={<LiveMap />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route
          path="chat"
          element={<ChatBox name="Ali (Passenger)" role="passenger" />}
        />
        <Route path="map" element={<DashboardMap />} />
      </Route>
    </Routes>
  );
}

export default App;
