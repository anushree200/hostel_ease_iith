// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB--JYq0qqHeyctr8ay-CGHKo4Ewm3huE",
  authDomain: "hostelease-334f7.firebaseapp.com",
  projectId: "hostelease-334f7",
  storageBucket: "hostelease-334f7.firebasestorage.app",
  messagingSenderId: "897384989526",
  appId: "1:897384989526:web:17f98edc7b6105beef8cf7",
  measurementId: "G-RCLJ26BS5Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
