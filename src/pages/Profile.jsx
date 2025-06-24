import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const { user } = useAuth();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (user) {
      const fetch = async () => {
        const docRef = await getDoc(doc(db, "users", user.uid));
        if (docRef.exists()) setDetails(docRef.data());
      };
      fetch();
    }
  }, [user]);

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded shadow-md mt-12">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {details && (
        <>
          <p>
            <strong>Name:</strong> {details.name}
          </p>
          <p>
            <strong>Email:</strong> {details.email}
          </p>
          <p>
            <strong>Hostel:</strong> {details.hostel}
          </p>
        </>
      )}
      <button
        onClick={() => signOut(auth)}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
