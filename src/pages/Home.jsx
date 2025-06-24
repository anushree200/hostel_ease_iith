import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Home = () => {
  const { user, hostel } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If not logged in or not iith account, redirect to login
    if (!user || !user.email.endsWith("@iith.ac.in")) {
      alert("Please login with your iith.ac.in account.");
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Navbar */}
      <nav className="bg-brown-700 p-4 text-white flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Hostel Ease</h1>
        <button onClick={() => navigate("/profile")}>
          <img
            src="/profile-icon.svg"
            alt="Profile"
            className="w-8 h-8 rounded-full hover:scale-105 transition"
          />
        </button>
      </nav>

      {/* Content */}
      <div className="p-6 md:p-12 text-white">
        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <button
            onClick={() => navigate("/raise-complaint")}
            className="bg-brown-600 hover:bg-brown-800 py-6 text-xl rounded-lg w-full shadow-lg"
          >
            Raise Complaint
          </button>
          <button
            onClick={() => navigate("/my-complaints")}
            className="bg-brown-600 hover:bg-brown-800 py-6 text-xl rounded-lg w-full shadow-lg"
          >
            My Complaints
          </button>
          <button
            onClick={() => navigate("/room-swap")}
            className="bg-brown-600 hover:bg-brown-800 py-6 text-xl rounded-lg w-full shadow-lg"
          >
            Room Swap Request
          </button>
        </div>

        {/* Recent Complaints */}
        <div className="bg-brown-700 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Recent Complaints</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <select className="bg-brown-600 text-white p-2 rounded w-full md:w-1/3">
              <option>Filter by Hostel</option>
              <option>Hostel A</option>
              <option>Hostel B</option>
              <option>Hostel C</option>
            </select>
            <input
              type="text"
              placeholder="Search by keyword"
              className="bg-brown-600 text-white placeholder-white p-2 rounded w-full md:w-1/3"
            />
          </div>
          <ul className="space-y-2">
            <li>Room 101: Leaky faucet</li>
            <li>Room 205: Broken light</li>
            {/* You can dynamically render list items here */}
          </ul>
        </div>

        {/* Notices */}
        <div className="bg-brown-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Hostel Notices</h2>
          <ul className="space-y-2">
            <li>Notice: Water maintenance on 20th June</li>
            <li>Notice: Wi-Fi upgrade scheduled</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
