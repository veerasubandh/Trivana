// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXXlzDJHokjF0ivYNzjXInVCqvkMDaG3U",
  authDomain: "ai-trip-planner-bddee.firebaseapp.com",
  projectId: "ai-trip-planner-bddee",
  storageBucket: "ai-trip-planner-bddee.firebasestorage.app",
  messagingSenderId: "689337306756",
  appId: "1:689337306756:web:6f91b9c8490c5d22967cd1",
  measurementId: "G-H04XEMRXTP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
