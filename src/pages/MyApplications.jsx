import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const MyApplications = () => {
  const { user } = useAuth();
  const [myApplications, setMyApplications] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "roomSwapApplications"),
      (snapshot) => {
        const userApps = snapshot.docs
          .filter((doc) => doc.data().email === user.email)
          .map((doc) => ({ id: doc.id, ...doc.data() }));
        setMyApplications(userApps);
      }
    );

    return () => unsubscribe();
  }, [user.email]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this application?");
    if (!confirm) return;
    try {
      await deleteDoc(doc(db, "roomSwapApplications", id));
      alert("Application deleted successfully.");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete application.");
    }
  };

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold text-brown-800 mb-4">My Submitted Applications</h3>
      {myApplications.length === 0 ? (
        <p>You have not submitted any room swap applications yet.</p>
      ) : (
        <ul className="space-y-3">
          {myApplications.map((app) => (
            <li
              key={app.id}
              className="bg-red-50 p-4 rounded-lg border border-red-200 shadow-sm"
            >
              <p>
                <strong>Room:</strong> {app.currentRoom}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Reason:</strong> {app.reason}
              </p>
              <button
                onClick={() => handleDelete(app.id)}
                className="mt-2 bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyApplications;
