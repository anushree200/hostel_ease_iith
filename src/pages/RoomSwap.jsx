import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  getDoc
} from "firebase/firestore";
import emailjs from 'emailjs-com';
import MyApplications from "./MyApplications";

const RoomSwap = () => {
  const { user, hostel } = useAuth();
  const navigate = useNavigate();

  const [currentRoom, setCurrentRoom] = useState("");
  const [reason, setReason] = useState("");
  const [swapList, setSwapList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentRoom || !reason) {
      alert("Please fill in all fields.");
      return;
    }

    const swapApplication = {
      email: user.email,
      name: user.displayName,
      hostel: hostel,
      currentRoom,
      reason,
      joinedUsers: [],
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "roomSwapApplications"), swapApplication);
      alert("Room swap application submitted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error submitting swap:", err);
      alert("Error submitting your request.");
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "roomSwapApplications"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSwapList(data);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleJoinRequest = async (docId) => {
  try {
    const ref = doc(db, "roomSwapApplications", docId);
    const docSnap = await getDoc(ref);
    const ownerEmail = docSnap.data().email;
    const ownerName = docSnap.data().name;

    await updateDoc(ref, {
      joinedUsers: arrayUnion({
        email: user.email,
        name: user.displayName,
      }),
    });

    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICEID,
      import.meta.env.VITE_EMAILJS_TEMPLATEID,
      {
        email: ownerEmail,
        to_name: ownerName,
        from_name: user.displayName,
        from_email: user.email,
      },
      import.meta.env.VITE_EMAILJS_USERID
    );

    alert("Join request sent and email notification dispatched.");
  } catch (err) {
    console.error("Join error:", err);
    alert("Failed to send join reqeust.");
  }
};


  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-hostel-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white/90 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-textsecondary mb-6">
          Room Swap Application
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-textprimary">
              Email
            </label>
            <input
              type="text"
              value={user.email}
              disabled
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textprimary">
              Hostel
            </label>
            <input
              type="text"
              value={hostel || "Not selected"}
              disabled
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textprimary">
              Current Room Number
            </label>
            <input
              type="text"
              value={currentRoom}
              onChange={(e) => setCurrentRoom(e.target.value)}
              placeholder="Enter your current room number"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textprimary">
              Reason for Swap
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why do you want to swap?"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows={3}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-buttonhover transition"
            >
              Submit Application
            </button>
          </div>
        </form>

        <div className="mt-10">
          <h3 className="text-xl font-semibold text-brown-800 mb-4">
            Available Room Swap Requests
          </h3>
          {swapList.length === 0 ? (
            <p>No requests yet.</p>
          ) : (
            <ul className="space-y-3">
              {swapList.map((swap) => (
                <li
                  key={swap.id}
                  className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm"
                >
                  <p>
                    <strong>{swap.name}</strong> from{" "}
                    <strong>Room {swap.currentRoom}</strong>
                  </p>
                  <p className="text-sm text-gray-600">Reason: {swap.reason}</p>
                  <button
                    onClick={() => handleJoinRequest(swap.id)}
                    className="bg-primary text-white px-6 py-2 rounded-md hover:bg-buttonhover transition"
                  >
                    Join Request
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <MyApplications />

      </div>
    </div>
  );
};

export default RoomSwap;
