import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X, MapPin, Users, Settings, LogOut, Home } from "lucide-react";

export default function DashboardLayout() {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => setOpen(!open);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          open ? "w-64" : "w-16"
        } bg-white shadow-md`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className={`text-xl font-bold ${!open && "hidden"}`}>
            Tracker
          </span>
          <button onClick={toggleSidebar} className="md:hidden">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className="p-4 space-y-4 text-sm">
          <NavItem
            to="/dashboard"
            icon={<Home size={20} />}
            text="Dashboard"
            open={open}
          />
          <NavItem
            to="/dashboard/map"
            icon={<MapPin size={20} />}
            text="Live Map"
            open={open}
          />
          <NavItem
            to="/dashboard/users"
            icon={<Users size={20} />}
            text="Users"
            open={open}
          />
          <NavItem
            to="/dashboard/settings"
            icon={<Settings size={20} />}
            text="Settings"
            open={open}
          />
          <NavItem
            to="/logout"
            icon={<LogOut size={20} />}
            text="Logout"
            open={open}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

function NavItem({ to, icon, text, open }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-all"
    >
      {icon}
      {open && <span>{text}</span>}
    </Link>
  );
}
