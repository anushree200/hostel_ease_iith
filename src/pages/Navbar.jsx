import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className="w-full bg-brown-800 text-white flex justify-between items-center px-6 py-4 shadow-md">
      <h1 className="text-xl font-bold">Hostel Ease</h1>
      <div className="space-x-4">
        {user && (
          <>
            <Link to="/raise-complaint">Raise Complaint</Link>
            <Link to="/my-complaints">My Complaints</Link>
            <Link to="/room-swap">Room Swap</Link>
            <Link to="/profile">
              <i className="fas fa-user-circle text-2xl"></i>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
