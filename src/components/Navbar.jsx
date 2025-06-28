import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/raise-complaint", label: "Raise Complaint" },
  { to: "/my-complaints", label: "My Complaints" },
  { to: "/room-swap", label: "Room Swap" },
];

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Title */}
        <div
          className="text-2xl font-extrabold cursor-pointer tracking-tight text-secondary"
          onClick={() => navigate("/")}
        >
          Hostel Ease
        </div>

        {/* Links */}
        {user && (
          <div className="flex items-center space-x-2 md:space-x-6">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative px-3 py-2 rounded-md font-medium transition-all duration-200 outline-none ${
                    isActive
                      ? "bg-buttonhover text-secondary shadow"
                      : "text-background hover:text-accent"
                  }`
                }
              >
                {label}
                <span
                  className={`absolute left-0 bottom-0 w-full h-0.5 bg-accent transition-transform duration-200 scale-x-0 hover:scale-x-100 origin-left`}
                />
              </NavLink>
            ))}

            {/* Profile Icon */}
            <NavLink
              to="/profile"
              title="Profile"
              className={({ isActive }) =>
                `ml-2 flex items-center transition duration-200 ${
                  isActive ? "text-secondary" : "text-background"
                }`
              }
            >
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
