import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const [hostel, setHostel] = useState("");
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      if (!email.endsWith("@iith.ac.in")) {
        alert("Only IITH accounts are allowed.");
        return;
      }
      await setDoc(doc(db, "users", result.user.uid), {
        name: result.user.displayName,
        email: result.user.email,
        hostel: hostel,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Welcome to Hostel Ease</h2>
      <select
        onChange={(e) => setHostel(e.target.value)}
        className="p-2 border rounded mb-4 cursor-pointer"
      >
        <option value="">Select Hostel</option>
        <option value="Block A">Block A</option>
        <option value="Block B">Block B</option>
        <option value="Block C">Block C</option>
      </select>
      <button
        onClick={loginWithGoogle}
        className="bg-brown-700 text-black underline px-6 py-2 rounded hover:bg-brown-800"
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
