// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwTLRCzYUsbwB-8PFR6CVwtf_GW8L6JdQ",
  authDomain: "bonplan63-a7d72.firebaseapp.com",
  projectId: "bonplan63-a7d72",
  storageBucket: "bonplan63-a7d72.appspot.com",
  messagingSenderId: "450250716536",
  appId: "1:450250716536:web:42649a192e128c4b0fc48d",
  measurementId: "G-Y93XF73R5D",
  databaseURL: "https://bonplan63-a7d72.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Connect to emulators in development
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
}

export { analytics, app, auth, db, storage };
