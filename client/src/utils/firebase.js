// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwctWj8vX-DKkQn0jrEh3B0hGAsN3npzU",
  authDomain: "taskify-1fb4f.firebaseapp.com",
  projectId: "taskify-1fb4f",
  storageBucket: "taskify-1fb4f.firebasestorage.app",
  messagingSenderId: "732983474466",
  appId: "1:732983474466:web:8ec7272f900a53f20e8d7b",
  measurementId: "G-98879XD83H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);