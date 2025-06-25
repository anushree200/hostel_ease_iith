# Hostel Ease – Smooth Functioning of Hostels

A web app designed to manage hostel complaints, notices, and room swap requests for students.

## Firebase Setup

To connect and use Firebase with this project, follow these steps:

### Create a Firebase Project
- Go to the [Firebase Console](https://console.firebase.google.com/)
- Click **“Add Project”** and follow the on-screen setup instructions

### Register Your Web App
- In the Firebase dashboard, click the **Web (`</>`)** icon to register your app
- Provide a name like `hostel-ease-web`
- Firebase will give you a configuration object (`apiKey`, `projectId`, etc.)

### Install Firebase SDK
In your terminal at the root of your project, run:

```bash
npm install firebase
```

### Initialize Firebase
Create a file: src/utils/firebase.js

Paste your config inside this file:
```
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### Enable Firestore and Authentication
Go to Build > Firestore Database, click on Create Database
Then go to Build > Authentication, and enable Google Sign-in or Email/Password based on your needs

### Use Firebase in Components
Use db for Firestore and auth for Authentication throughout your React app:
```
import { db, auth } from "../utils/firebase";
```
