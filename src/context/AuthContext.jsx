// src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider, db } from "../utils/firebase";
import { onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Create Context
const AuthContext = createContext();

// Provider Component
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hostel, setHostel] = useState(null);

  // Sign-in Function
  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (!email.endsWith("@iith.ac.in")) {
        alert("Only iith.ac.in emails are allowed.");
        await signOut(auth);
        return;
      }

      setUser(result.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => signOut(auth);

  // Listen to user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(docRef);
          if (userSnap.exists()) {
            setHostel(userSnap.data().hostel);
          }
        } catch (err) {
          console.error("Failed to fetch hostel:", err);
        }
      } else {
        setHostel(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, hostel, googleSignIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);
