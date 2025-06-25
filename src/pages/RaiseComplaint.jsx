import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const RaiseComplaint = () => {
  const { user, hostel } = useAuth();
  const [issueType, setIssueType] = useState("");
  const [roomOrPod, setRoomOrPod] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roomOrPod || !description || !issueType) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const complaintData = {
        email: user.email,
        name: user.displayName,
        uid: user.uid,
        issueType,
        roomOrPod,
        description,
        hostel,
        timestamp: serverTimestamp(),
      };
      await addDoc(collection(db, "complaints"), complaintData);
      alert("Complaint submitted successfully!");
      navigate("/");
    } catch (err) {
      alert("Failed to submit complaint.");
    }
  };

  return (
    <div className=" bg-cover bg-center bg-no-repeat bg-[url('/images/bg.jpg')] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-card/90 rounded-xl shadow-lg p-8 transition-all duration-300">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Raise a Complaint
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={user.email}
            disabled
            className="w-full p-2 border bg-gray-100 rounded transition-all duration-200 text-textsecondary"
          />
          <input
            type="text"
            value={roomOrPod}
            onChange={(e) => setRoomOrPod(e.target.value)}
            placeholder="Room/Pod Number"
            className="w-full p-2 border rounded transition-all duration-200"
            required
          />
          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className="w-full p-2 border rounded transition-all duration-200"
            required
          >
            <option value="">Select Issue Type</option>
            <option value="Room Issue">Room Issue</option>
            <option value="Pod Issue">Pod Issue</option>
          </select>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue"
            rows={4}
            className="w-full p-2 border rounded transition-all duration-200"
            required
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-buttonhover transition-all duration-200"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default RaiseComplaint;
