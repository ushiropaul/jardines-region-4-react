// src/firebase/config.js


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDkwR6Jk7FWVwoLCHJL2MHD5mQqB82DAjQ",
    authDomain: "jardines-region-4.firebaseapp.com",
    projectId: "jardines-region-4",
    storageBucket: "jardines-region-4.firebasestorage.app",
    messagingSenderId: "602783756337",
    appId: "1:602783756337:web:0b6d056b507f7387666510",
    measurementId: "G-C3NF51VYE7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);