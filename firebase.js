// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8ZXdrpdi4uYTWtlFg1-OTWwspFXkbjb0",
  authDomain: "insta-clone-f47d6.firebaseapp.com",
  projectId: "insta-clone-f47d6",
  storageBucket: "insta-clone-f47d6.appspot.com",
  messagingSenderId: "81191751422",
  appId: "1:81191751422:web:70cd8d5f3a178d4fe5dfaf",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
