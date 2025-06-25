import { useAdminAuth } from "../context/AdminAuthContext";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div
          className="text-2xl font-extrabold cursor-pointer tracking-tight text-secondary"
          onClick={() => navigate("/admin/dashboard")}
        >
          Hostel Admin
        </div>
        {admin && (
          <div className="flex items-center space-x-6">
            <button
              className="text-background font-bold hover:text-accent transition"
              onClick={() => navigate("/admin/dashboard")}
            >
              Complaints
            </button>
            <button
              className="text-background font-bold hover:text-accent transition"
              onClick={() => navigate("/admin/notices")}
            >
              Notices
            </button>
            <button
              className="ml-4 bg-error text-white font-bold px-4 py-2 rounded hover:bg-accent transition"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
