import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const HOSTELS = ["Block A", "Block B", "Block C"];

const AdminNotices = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hostels, setHostels] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "notices"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotices(data);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || hostels.length === 0) {
      alert("Fill all fields and select hostels.");
      return;
    }
    await addDoc(collection(db, "notices"), {
      title,
      content,
      hostels: hostels.includes("all") ? ["all"] : hostels,
      timestamp: serverTimestamp(),
    });
    setTitle("");
    setContent("");
    setHostels([]);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-primary">Manage Notices</h2>
      <form
        onSubmit={handleSubmit}
        className="mb-8 space-y-3 bg-card p-4 rounded shadow"
      >
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Notice title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Notice content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          <label>
            <input
              type="checkbox"
              checked={hostels.includes("all")}
              onChange={(e) =>
                setHostels(
                  e.target.checked
                    ? ["all"]
                    : hostels.filter((h) => h !== "all")
                )
              }
            />
            <span className="ml-1">All Hostels</span>
          </label>
          {HOSTELS.map((h) => (
            <label key={h}>
              <input
                type="checkbox"
                checked={hostels.includes(h)}
                disabled={hostels.includes("all")}
                onChange={(e) =>
                  setHostels((prev) =>
                    e.target.checked
                      ? [...prev, h]
                      : prev.filter((x) => x !== h)
                  )
                }
              />
              <span className="ml-1">{h}</span>
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-buttonhover transition"
        >
          Add Notice
        </button>
      </form>
      <h3 className="text-xl font-bold mb-4 text-primary">Recent Notices</h3>
      <ul className="space-y-3">
        {notices.map((n) => (
          <li key={n.id} className="bg-secondary p-3 rounded shadow">
            <div className="font-semibold text-primary">{n.title}</div>
            <div className="text-textprimary">{n.content}</div>
            <div className="text-xs text-textAccent mt-1">
              {n.hostels.includes("all")
                ? "All Hostels"
                : `Hostels: ${n.hostels.join(", ")}`}{" "}
              |{" "}
              {n.timestamp?.toDate
                ? new Date(n.timestamp.toDate()).toLocaleString()
                : ""}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminNotices;
