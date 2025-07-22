import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-600 tracking-tight">
          DriverTracker
        </h1>
        <div className="space-x-4 text-sm md:text-base">
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:text-blue-800 transition"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:text-blue-800 transition"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl text-center max-w-xl w-full transform transition duration-500 hover:scale-[1.01]">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            🚦 Realtime Driver Tracker
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-8">
            Track and manage your drivers on the move. Know exactly where they
            are, and improve safety and delivery efficiency.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              🚀 Get Started
            </Link>
            <Link
              to="/login"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-300"
            >
              🔐 Login
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm py-4">
        © {new Date().getFullYear()} DriverTracker. All rights reserved.
      </footer>
    </div>
  );
}
