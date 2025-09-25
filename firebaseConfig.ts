// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
 

const firebaseConfig = {
  apiKey: "AIzaSyD2l9G5tf1giT5r7J8esVZOt26nIWlTM34",
  authDomain: "digital-village-9e9f6.firebaseapp.com",
  projectId: "digital-village-9e9f6",
  storageBucket: "digital-village-9e9f6.firebasestorage.app",
  messagingSenderId: "399723010789",
  appId: "1:399723010789:web:ba60a0747a96bf2fe0920c",
  measurementId: "G-5X7CF4JKMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth,db };