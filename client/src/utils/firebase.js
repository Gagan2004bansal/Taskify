// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "import.meta.env.VITE_FIREBASE_API_KEY",
  authDomain: "task-manager-22971.firebaseapp.com",
  projectId: "task-manager-22971",
  storageBucket: "task-manager-22971.firebasestorage.app",
  messagingSenderId: "593371616515",
  appId: "1:593371616515:web:8f713727aaf4d93db14536"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);