# 🏠 Hostel Ease – Smooth Functioning of Hostels
A modern web app designed for students and hostel office staff to manage complaints, room swap requests, and hostel-wide notices. Built using React and Firebase, it ensures real-time updates, secure login, and seamless user experience.

## ✨ Features
## 👩‍🎓 Student Portal

Raise and track complaints

Request room swaps

View hostel notices

## 🏢 Admin Portal

View and manage all complaints

Update complaint statuses

Post notices (to a specific hostel or all hostels)

## 🔒 Secure Authentication

Only @iith.ac.in accounts allowed

Role-based access (user or admin)

## ⚡ Real-Time Firestore Updates

Complaints and notices update live for all users

## 🚀 Getting Started
1. Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/hostel-ease.git
cd hostel-ease
2. Install Dependencies
bash
Copy code
npm install
🔧 Firebase Setup
a. Create a Firebase Project
Go to Firebase Console

Click “Add project” and follow the instructions

b. Register Your Web App
Click the Web (</>) icon in Firebase Console

Register your app and copy the Firebase config object

c. Enable Authentication
Go to Authentication > Sign-in method

Enable Google sign-in

d. Enable Firestore
Go to Firestore Database

Click Create database

Choose Test Mode for development

e. Add Your Firebase Config
Create src/utils/firebase.js:

js
Copy code
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, provider, db };
f. Firestore Collections Structure
Collection	Required Fields
users	email, role (user or admin)
complaints	hostel, description, status, timestamp, issueType, roomOrPod, uid, name, email
notices	title, content, hostels (array, e.g., ["Block A"] or ["all"]), timestamp
roomSwapApplications	email, name, hostel, currentRoom, reason, joinedUsers, timestamp

g. Set Admin Users
In Firestore users collection, manually set:

json
Copy code
{
  "role": "admin"
}
For example, assign to hosteloffice@iith.ac.in.

h. Create Firestore Indexes
You'll be prompted to create indexes when needed. Common ones:

complaints: hostel + timestamp (descending)

notices: hostels (array-contains-any) + timestamp (descending)

my complaints: uid + timestamp (descending)

Just click the provided link in the console error to auto-create.

i. Security Rules (Recommended for Production)
Go to Firestore > Rules and replace with:

text
Copy code
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null
                         && request.auth.token.email.matches('^.+@iith\\.ac\\.in$');
    }

    match /complaints/{complaintId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }

    match /notices/{noticeId} {
      allow read: if request.auth != null;
      allow create, update, delete: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }

    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
  }
}
## 💻 Run the App
bash
Copy code
npm run dev
## 🔑 Portal Access
Student Portal: http://localhost:5173/login

Admin Portal: http://localhost:5173/admin/login
(Login with an email having role: "admin")

## 📁 Project Structure
bash
Copy code
src/
├── pages/           # User-side pages
├── admin/           # Admin-specific pages
├── components/      # Reusable UI components (Navbar, Footer, etc.)
├── context/         # Context providers for Auth/Admin
└── utils/           # Firebase config and helpers
## 📦 Packages Used
React – Frontend framework

React Router DOM – Routing

Firebase – Auth + Firestore

Tailwind CSS – UI Styling

Font Awesome – Icons

## 🖌️ Custom Styling Palette
Tailwind CSS extended colors used:

js
Copy code
colors: {
  primary: "#7C3A7E",
  secondary: "#FFD6E0",
  accent: "#FFB454",
  background: "#FFF7ED",
  card: "#FFFFFF",
  buttonhover: "#5C2552",
  textprimary: "#3D2C29",
  textsecondary: "#7C3A7E",
  textAccent: "#FFB454",
  success: "#B7A16A",
  error: "#E4576E",
}
