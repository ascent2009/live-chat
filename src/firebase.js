// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

// import firebase from 'firebase'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const apiKey = import.meta.env.VITE_API_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkjlyTBmcTdKGGJrpru6Zgrw93O9ZFV0E",
    // apiKey: apiKey,
    authDomain: "live-chat-3d7fb.firebaseapp.com",
    projectId: "live-chat-3d7fb",
    storageBucket: "live-chat-3d7fb.firebasestorage.app",
    messagingSenderId: "3511490023",
    appId: "1:3511490023:web:f29fc759979bb38d125942",
    databaseURL: "https://live-chat-3d7fb-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
