import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

const STATUS_OPTIONS = ["pending", "in progress", "resolved"];

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "complaints"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComplaints(data);
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "complaints", id), { status });
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-primary">All Complaints</h2>
      <ul className="space-y-4">
        {complaints.map((c) => (
          <li key={c.id} className="bg-card p-4 rounded-lg shadow">
            <div className="font-semibold text-accent mb-1">
              {c.issueType} - Room/Pod: {c.roomOrPod}
            </div>
            <div className="text-textprimary mb-2">{c.description}</div>
            <div className="text-xs text-textAccent mb-2">
              By {c.name} ({c.email}) | Hostel: {c.hostel} |{" "}
              {c.timestamp?.toDate
                ? new Date(c.timestamp.toDate()).toLocaleString()
                : ""}
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Status:</span>
              <select
                className="border rounded px-2 py-1"
                value={c.status || "pending"}
                onChange={(e) => updateStatus(c.id, e.target.value)}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              <span
                className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                  c.status === "resolved"
                    ? "bg-success text-white"
                    : c.status === "in progress"
                    ? "bg-accent text-white"
                    : "bg-secondary text-textprimary"
                }`}
              >
                {c.status ? c.status.toUpperCase() : "PENDING"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminComplaints;
