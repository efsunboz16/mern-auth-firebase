// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-8a3b5.firebaseapp.com",
    projectId: "mern-auth-8a3b5",
    storageBucket: "mern-auth-8a3b5.appspot.com",
    messagingSenderId: "951489376875",
    appId: "1:951489376875:web:ccc158e264dee86f82f72e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);