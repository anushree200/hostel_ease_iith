import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetch = async () => {
        const docRef = await getDoc(doc(db, "users", user.uid));
        if (docRef.exists()) setDetails(docRef.data());
      };
      fetch();
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="p-8 max-w-xl mx-auto mt-12 bg-card rounded-xl shadow-lg transition-all duration-300">
      <h2 className="text-2xl font-bold text-primary mb-6">Profile</h2>
      {details && (
        <div className="space-y-3 text-textprimary">
          <p>
            <strong className="text-accent">Name:</strong> {details.name}
          </p>
          <p>
            <strong className="text-accent">Email:</strong> {details.email}
          </p>
          <p>
            <strong className="text-accent">Hostel:</strong> {details.hostel}
          </p>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="mt-6 bg-error hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
