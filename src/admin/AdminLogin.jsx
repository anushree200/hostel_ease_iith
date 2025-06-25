import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";

const ADMIN_EMAILS = [
  "hosteloffice@iith.ac.in",
  "warden@iith.ac.in",
  "manager@iith.ac.in",
  "ep23btech11018@iith.ac.in",
];

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      if (!ADMIN_EMAILS.includes(email)) {
        alert("Only authorized hostel office emails can login.");
        await auth.signOut();
        setLoading(false);
        return;
      }
      // Optionally, set role in Firestore if not already set
      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists() || userSnap.data().role !== "admin") {
        alert("You are not authorized as admin.");
        await auth.signOut();
        setLoading(false);
        return;
      }
      navigate("/admin/dashboard");
    } catch (error) {
      alert("Login failed.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        Hostel Office Admin Login
      </h2>
      <button
        onClick={loginWithGoogle}
        className="bg-primary text-white px-6 py-2 rounded hover:bg-buttonhover transition"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login with Google"}
      </button>
    </div>
  );
};

export default AdminLogin;
