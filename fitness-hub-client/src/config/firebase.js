// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc_a5pVAhLhPByYSAW0YXDYvNhE3OOcGQ",
  authDomain: "fitness-hub-af48a.firebaseapp.com",
  projectId: "fitness-hub-af48a",
  storageBucket: "fitness-hub-af48a.firebasestorage.app",
  messagingSenderId: "1028187323942",
  appId: "1:1028187323942:web:637f120ea1ba3a0a1270e7",
  measurementId: "G-2V5435W60F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider };
