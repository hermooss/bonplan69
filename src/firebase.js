// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDL4JOozFzRbo25xD7_FAJfbBESHQZL9G4",
    authDomain: "bonplan69-57945.firebaseapp.com",
    projectId: "bonplan69-57945",
    storageBucket: "bonplan69-57945.firebasestorage.app",
    messagingSenderId: "963513213869",
    appId: "1:963513213869:web:21885c86adef4d63213724",
    measurementId: "G-JQVZFQVYDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);