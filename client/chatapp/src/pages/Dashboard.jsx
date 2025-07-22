import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3001/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRole(res.data.role);
        setLoading(false);
      })
      .catch(() => {
        alert("Unauthorized");
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold text-gray-700 animate-pulse">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-700">
          Driver Tracker Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-gray-600 text-sm bg-gray-200 px-3 py-1 rounded-full">
            <User size={16} />
            {role.toUpperCase()}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 text-sm rounded-md flex items-center gap-1"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Example Card 1 */}
          <Link to="/dashboard/map">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
              <h2 className="text-lg font-semibold text-gray-700">Live Map</h2>
              <p className="text-sm text-gray-500 mt-2">
                Track drivers and passengers in real-time.
              </p>
            </div>
          </Link>

          {/* Example Card 2 */}
          <Link to="/dashboard/chat">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
              <h2 className="text-lg font-semibold text-gray-700">
                Chat System
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Access personal chat between users.
              </p>
            </div>
          </Link>

          {/* Example Card 3 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
            <h2 className="text-lg font-semibold text-gray-700">
              User Profile
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              View and update your account information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
