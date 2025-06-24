import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const RaiseComplaint = () => {
  const { user, hostel } = useAuth();

  const [issueType, setIssueType] = useState("");
  const [roomOrPod, setRoomOrPod] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomOrPod || !description || !issueType) {
      alert("Please fill in all fields.");
      return;
    }

    const complaintData = {
      email: user.email,
      name: user.displayName,
      hostel: hostel,
      issueType,
      roomOrPod,
      description,
      timestamp: new Date().toISOString(),
    };

    console.log("Complaint submitted:", complaintData);

    // Here, you would typically send this to your backend or Firebase
    alert("Complaint submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/bg.jpg')] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white/90 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-brown-800 mb-6">
          Raise a Complaint
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Display */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              value={user.email}
              disabled
              className="mt-1 block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Hostel Display */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hostel
            </label>
            <input
              type="text"
              value={hostel || "Not selected"}
              disabled
              className="mt-1 block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Issue Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Issue Type
            </label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select issue type</option>
              <option value="Room Issue">Room Issue</option>
              <option value="Pod Issue">Pod Issue</option>
            </select>
          </div>

          {/* Room or Pod Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room/Pod Number
            </label>
            <input
              type="text"
              value={roomOrPod}
              onChange={(e) => setRoomOrPod(e.target.value)}
              placeholder="Enter room or pod number"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows={4}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-brown-700 text-white px-6 py-2 rounded-md hover:bg-brown-800 transition"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaiseComplaint;
