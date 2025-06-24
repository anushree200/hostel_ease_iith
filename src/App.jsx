import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RaiseComplaint from "./pages/RaiseComplaint";
import MyComplaints from "./pages/MyComplaints";
import RoomSwap from "./pages/RoomSwap";
import Profile from "./pages/Profile";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/raise-complaint" element={<RaiseComplaint />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
          <Route path="/room-swap" element={<RoomSwap />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
