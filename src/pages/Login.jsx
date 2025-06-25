import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const HOSTELS = [
  "Anandi",
  "Aryabhatta",
  "Bhabha",
  "Bhaskara",
  "Brahmagupta",
  "Bhaskara",
  "Charaka",
  "Gargi",
  "Kautilya",
  "Raman",
  "Ramanuja",
  "Ramanujan",
  "Sarabhai",
  "Sarojini Naidu",
  "Susruta",
  "Varahamihira",
  "Visveswaraya",
  "Vivekananda",
  "Vyasa",
];

const Login = () => {
  const [hostel, setHostel] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    navigate("/");
    return null;
  }

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      if (!email.endsWith("@iith.ac.in")) {
        alert("Only IITH accounts are allowed.");
        await auth.signOut();
        setLoading(false);
        return;
      }
      if (!hostel) {
        alert("Please select your hostel.");
        await auth.signOut();
        setLoading(false);
        return;
      }
      await setDoc(doc(db, "users", result.user.uid), {
        name: result.user.displayName,
        email: result.user.email,
        hostel,
      });
      navigate("/");
    } catch (error) {
      alert("Login failed.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-hostel-bg p-6 transition-all duration-300">
      <h2 className="text-3xl font-bold mb-6 text-textprimary">
        Welcome to Hostel Ease
      </h2>
      <select
        onChange={(e) => setHostel(e.target.value)}
        className="p-2 border rounded mb-4 cursor-pointer transition-all duration-200"
        value={hostel}
        disabled={loading}
      >
        <option value="">Select Hostel</option>
        {HOSTELS.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      <button
        onClick={loginWithGoogle}
        className="bg-primary text-white px-6 py-2 rounded hover:bg-buttonhover transition-all duration-200"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login with Google"}
      </button>
    </div>
  );
};

export default Login;
