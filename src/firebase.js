// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDhW8_S0h2lJho1L7DVbEJyyBm1c_fgiQ",
  authDomain: "eventify-5650f.firebaseapp.com",
  projectId: "eventify-5650f",
  storageBucket: "eventify-5650f.firebasestorage.app",
  messagingSenderId: "894013777160",
  appId: "1:894013777160:web:7e3a8282a588dbfb41f8bd",
  measurementId: "G-PVQQXF5L6F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
