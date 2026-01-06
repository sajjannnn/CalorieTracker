// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZFU70DIpMWn83-dTibZuyu6a7t7PyPqU",
  authDomain: "calorietracker-5596a.firebaseapp.com",
  projectId: "calorietracker-5596a",
  storageBucket: "calorietracker-5596a.firebasestorage.app",
  messagingSenderId: "118776004486",
  appId: "1:118776004486:web:d1cb049af3eade2839b607",
  measurementId: "G-MPSKKZYFFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();