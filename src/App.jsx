import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RaiseComplaint from "./pages/RaiseComplaint";
import MyComplaints from "./pages/MyComplaints";
import RoomSwap from "./pages/RoomSwap";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthContextProvider, useAuth } from "./context/AuthContext";

// Admin imports
import AdminLogin from "./admin/AdminLogin";
import AdminComplaints from "./admin/AdminComplaints";
import AdminNotices from "./admin/AdminNotices";
import AdminNavbar from "./admin/AdminNavbar";
import {
  AdminAuthContextProvider,
  useAdminAuth,
} from "./context/AdminAuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
}

function AdminProtectedRoute({ children }) {
  const { admin, loading } = useAdminAuth();
  if (loading) return null;
  return admin ? children : <Navigate to="/admin/login" />;
}

function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AdminNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          {/* User Portal */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                      path="/raise-complaint"
                      element={<RaiseComplaint />}
                    />
                    <Route path="/my-complaints" element={<MyComplaints />} />
                    <Route path="/room-swap" element={<RoomSwap />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Admin Portal */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <AdminAuthContextProvider>
                <AdminProtectedRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<AdminComplaints />} />
                      <Route path="notices" element={<AdminNotices />} />
                    </Routes>
                  </AdminLayout>
                </AdminProtectedRoute>
              </AdminAuthContextProvider>
            }
          />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
