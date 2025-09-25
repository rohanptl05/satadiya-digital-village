// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);