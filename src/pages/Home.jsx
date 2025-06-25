import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const Home = () => {
  const { user, hostel } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  // Fetch complaints for user's hostel
  useEffect(() => {
    if (!user || !hostel) return;
    const q = query(
      collection(db, "complaints"),
      where("hostel", "==", hostel),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComplaints(data);
    });
    return () => unsubscribe();
  }, [user, hostel]);

  // Fetch notices for user's hostel or all
  useEffect(() => {
    if (!hostel) return;
    const q = query(
      collection(db, "notices"),
      where("hostels", "array-contains-any", [hostel, "all"]),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotices(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [hostel]);

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <button
            onClick={() => navigate("/raise-complaint")}
            className="bg-accent hover:bg-buttonhover text-white py-6 text-xl rounded-lg w-full shadow-lg transition-all duration-200"
          >
            Raise Complaint
          </button>
          <button
            onClick={() => navigate("/my-complaints")}
            className="bg-accent hover:bg-buttonhover text-white py-6 text-xl rounded-lg w-full shadow-lg transition-all duration-200"
          >
            My Complaints
          </button>
          <button
            onClick={() => navigate("/room-swap")}
            className="bg-accent hover:bg-buttonhover text-white py-6 text-xl rounded-lg w-full shadow-lg transition-all duration-200"
          >
            Room Swap Request
          </button>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Recent Complaints
          </h2>
          {complaints.length === 0 ? (
            <p className="text-textsecondary">No complaints found.</p>
          ) : (
            <ul className="space-y-2">
              {complaints.map((complaint) => (
                <li
                  key={complaint.id}
                  className="bg-background p-4 rounded-md shadow hover:scale-[1.01] transition"
                >
                  <div className="font-semibold text-accent">
                    {complaint.issueType} - Room/Pod {complaint.roomOrPod}
                  </div>
                  <div className="text-textprimary">
                    {complaint.description}
                  </div>
                  <div className="text-xs text-textAccent mt-1">
                    By {complaint.name} on{" "}
                    {complaint.timestamp?.toDate
                      ? new Date(complaint.timestamp.toDate()).toLocaleString()
                      : ""}
                  </div>
                  <span
                    className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                      complaint.status === "resolved"
                        ? "bg-success text-white"
                        : complaint.status === "in progress"
                        ? "bg-accent text-white"
                        : "bg-secondary text-textprimary"
                    }`}
                  >
                    {complaint.status
                      ? complaint.status.toUpperCase()
                      : "PENDING"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Hostel Notices
          </h2>
          <ul className="space-y-2 text-textprimary">
            {notices.length === 0 ? (
              <li>No notices.</li>
            ) : (
              notices.map((n) => (
                <li key={n.id}>
                  <div className="font-semibold text-secondary">{n.title}</div>
                  <div>{n.content}</div>
                  <div className="text-xs text-textAccent mt-1">
                    {n.timestamp?.toDate
                      ? new Date(n.timestamp.toDate()).toLocaleString()
                      : ""}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
