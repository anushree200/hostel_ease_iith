import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuth } from "../context/AuthContext";

const MyComplaints = () => {
  const { user } = useAuth();
  const [myComplaints, setMyComplaints] = useState([]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "complaints"),
      where("uid", "==", user.uid),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMyComplaints(data);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div className="p-6 bg-hostel-bg min-h-screen transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-primary">My Complaints</h2>
      <ul className="space-y-4">
        {myComplaints.map((c) => (
          <li
            key={c.id}
            className="bg-card text-textprimary p-4 rounded-lg shadow hover:scale-[1.01] transition-all duration-200"
          >
            <div className="font-semibold text-accent mb-1">
              Room/Pod: {c.roomOrPod}
            </div>
            <div className="text-textprimary">{c.description}</div>
            <div className="text-xs text-textAccent mt-1 italic">
              Issue Type: {c.issueType}
            </div>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComplaints;
