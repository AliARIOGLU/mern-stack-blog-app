/* eslint-disable */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-c7d36.firebaseapp.com",
  projectId: "mern-blog-c7d36",
  storageBucket: "mern-blog-c7d36.appspot.com",
  messagingSenderId: "485492581577",
  appId: "1:485492581577:web:adde1cbf64484c012a9918",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
