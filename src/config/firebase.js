// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBspGE48g98YFGykYNamDTnHKCR05u-gyI",
  authDomain: "spw-books.firebaseapp.com",
  projectId: "spw-books",
  storageBucket: "spw-books.appspot.com",
  messagingSenderId: "148720233801",
  appId: "1:148720233801:web:a79413eb13156f392a3e98",
  measurementId: "G-DE12LRZHLE",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
